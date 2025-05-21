'use client'
import Image from 'next/image';
import { FiEdit } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';
import { Divider, Loader, NumberInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGetCartQuery, useUpdateCartMutation, useRemoveFromCartMutation, useHandlePaymentMutation } from '@/api/CommitteeApiSlice';
import cardImg from '../../.././../../public/GlobalInformationImg.png';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CartProduct = () => {
    const router = useRouter();
    const { data: cartData, isLoading, isError } = useGetCartQuery();
    const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});
    const [donationValues, setDonationValues] = useState<{ [key: number]: number }>({});
    const [updateCart, { isLoading: addCartIsLoading }] = useUpdateCartMutation();
    const [handlePaymentMutation, { isLoading: paymentIsLoading, data: paymentData, error: paymentError, isSuccess }] = useHandlePaymentMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [toastData, setToastData] = useState<any>({});

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            toast.success("تم تحديث السلة بنجاح", {
                autoClose: 9000,
            });
            setToastData({});
        }
        if (toastData?.error?.data?.status === 409) {
            toast.error(toastData?.error?.data?.errors.message[0], {
                autoClose: 9000,
            });
            setToastData({});
        }
        if (toastData?.error?.status === 422) {
            toast.error(toastData?.error?.data?.message, {
                autoClose: 5000,
            });
            setToastData({});
        }
        if (isLoading || addCartIsLoading || paymentIsLoading) {
            toast.loading("جار التحميل...", {
                toastId: "loadingToast",
                autoClose: false,
            });
        } else {
            toast.dismiss("loadingToast");
        }
    }, [toastData, addCartIsLoading,paymentIsLoading, isLoading]);

    const handleEditClick = (id: number, amount: number) => {
        setEditStates((prev) => ({ ...prev, [id]: !prev[id] }));
        setDonationValues((prev) => ({ ...prev, [id]: amount }));
    };

    const handleDonationChange = (id: number, value: number) => {
        setDonationValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleUpdateCart = async (id: number) => {
        try {
            const data = await updateCart({ donation_id: id, amount: donationValues[id] }).unwrap();
            setToastData(data);
            setEditStates((prev) => ({ ...prev, [id]: false }));
        } catch (error) {
            console.error('فشل في تحديث السلة:', error);
        }
    };

    const handleRemoveFromCart = async (id: number) => {
        try {
            await removeFromCart({ donation_id: id }).unwrap();
            toast.success("تم إزالة العنصر من السلة", {
                autoClose: 9000,
            });
        } catch (error) {
            console.error('فشل في إزالة العنصر من السلة:', error);
        }
    };

    const handlePayment = () => {
        handlePaymentMutation();
    };

    useEffect(() => {
        if (isSuccess) {//@ts-ignore
            router.push(paymentData?.data?.payment_url);//@ts-ignore
            console.log(paymentData?.data?.payment_url);
        }
    }, [isSuccess]);

    return (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
            <div className="md:col-span-3 h-max grid grid-cols-4 border-[#B8BDBE] border rounded-[9px] overflow-hidden">
                <div className="col-span-3 bg-[#E6F5F0] p-[16px] rounded-tr-[8px]">
                    <p>مشروع التبرع</p>
                </div>
                <div className="col-span-1 bg-[#E6F5F0] p-[16px] rounded-tl-[8px]">
                    <p>المبلغ</p>
                </div>
              
              
                {isLoading && <div className="p-3 col-span-4  flex justify-center items-center"><Loader size={40} /></div>}
                {cartData?.data?.donations.length >0 ?cartData?.data?.donations?.map((item: any) => (
                    <div key={item.id} className="col-span-4 min-h-10 grid md:grid-cols-4 grid-cols-1 gap-2">
                        <div className="md:col-span-3 p-[16px]">
                            <div className="flex gap-2">
                                <Image src={cardImg} alt='' className='w-[100px] h-[76px] object-cover rounded-[5px]' />
                                <div className="flex flex-col justify-start">
                                    <p className="text-[#001F15] text-[14px] font-[600] max-w-[90%]">{item?.name}</p>
                                    <p className="text-[#869791] text-[12px] font-[400]">{item?.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 p-[16px] rounded-tl-[8px]">
                            <div className="w-full flex justify-between items-center gap-1">
                                {!editStates[item.id] && <p>{donationValues[item.id] || item.amount} ر.س</p>}
                                {editStates[item.id] && (
                                    <NumberInput
                                        className='w-[140px]'
                                        radius="xl"
                                        defaultValue={item.amount}
                                        value={donationValues[item.id] || item.amount}
                                        onChange={(value) => handleDonationChange(item.id, +value || 0)}
                                        placeholder="336"
                                    />
                                )}
                                <div className="flex justify-center items-center gap-2">
                                    {editStates[item.id] ? (
                                        <button onClick={() => handleUpdateCart(item.id)} className='cursor-pointer text-[#019867]'>
                                            حفظ
                                        </button>
                                    ) : (
                                        <FiEdit onClick={() => handleEditClick(item.id, item.amount)} className='cursor-pointer' color='#019867' size={25} />
                                    )}
                                    <TiDeleteOutline onClick={() => handleRemoveFromCart(item.id)} className='cursor-pointer' color='#CE0E2D' size={25} />
                                </div>
                            </div>
                        </div>
                    </div>
                )):(<>
                
                <div className="flex justify-center items-center min-h-[100px] w-full">لا يوجد تبرعات</div>
                </>)}



            </div>
            <div className="border-[#B8BDBE] w-full h-max border rounded-[9px] overflow-hidden">
                <div className="bg-[#E6F5F0] p-[16px]">
                    <p>الملخص</p>
                </div>
                <div className="px-[16px] pb-[16px] flex flex-col w-full justify-center items-center">
                    <div className="flex w-full justify-between items-center py-[16px]">
                        <p>اجمالى المشاريع</p>
                        <p>{cartData?.data?.donations_count}</p>
                    </div>
                    <Divider color='#869791' className='w-full' />
                    <div className="flex w-full justify-between items-center py-[16px]">
                        <p>اجمالى المبلغ</p>
                        <p>{cartData?.data?.amount}</p>
                    </div>
                   
                     <button disabled={cartData?.data?.donations_count == 0 } onClick={() => handlePayment()} className={`bg-[#019867] py-[8px] px-[14px] rounded-[50px] w-full text-[#FFF] ${cartData?.data?.donations_count == 0&& "cursor-not-allowed" } `}>اتمام الدفع</button>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;