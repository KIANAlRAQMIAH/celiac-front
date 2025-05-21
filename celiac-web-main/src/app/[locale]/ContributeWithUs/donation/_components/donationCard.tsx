'use client';
import Image from 'next/image';
import cardImg from '../../../../../../public/newsDetails.png'
import { Button, TextInput } from '@mantine/core';
import { IoCartOutline } from 'react-icons/io5';
import { useAddToCartMutation, useGetDonnationsQuery } from '@/api/CommitteeApiSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { cartPrice } from '@/utils/helpers';
const DonationCard = () => {
    const { data, isLoading, error } = useGetDonnationsQuery();

    const [price, setPrice] = useState('')

    const [curentIndex, setCurrentIndex] = useState('')

    const [errorMessages, setErrorMessages] = useState<string>('')
    const [addToCart, {isLoading: addCartIsLoading}] = useAddToCartMutation()
 

    const [toastData, setToastData] = useState<any>({});
    useEffect(() => {
      if (toastData?.data?.status === 200) {
        toast.success("   تمت الاضافه الي السله    ", {
          autoClose: 9000, 
        });
        setToastData({});
        setPrice('')
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
      if (isLoading || addCartIsLoading) {
        toast.loading("Loading...", {
          toastId: "loadingToast",
          autoClose: false,
        });
      } else {
        
        toast.dismiss("loadingToast");
      }
    }, [toastData, addCartIsLoading,isLoading]);
    // };

    const submitHandler = async (id:string) => {
        setCurrentIndex(id)
        let resResult ;
          resResult = cartPrice.safeParse(price);
          if ( !resResult.success) {
            // @ts-ignore
        setErrorMessages(resResult.error.errors[0].message)
            return;
          }
          setErrorMessages('')
       const data =  await addToCart({donation_id: id, amount: price})
       setToastData(data)
    }
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, id:string) => {
        setCurrentIndex(id)
        setPrice(e.target.value)
    }
    return (
        <div className="grid grid-cols-3 gap-4">
            {data?.data?.map((item: any) => (
                <div key={item?.id} className="rounded-b-[12px] shadow-sm transition hover:shadow-lg  rounded-t-[12px] flex flex-col gap-1 w-full bg-[#FFF]">
                    <Image width={100} className="w-full object-contain h-[300px] rounded-t-[12px]" height={200} src={item?.image?.url} alt="" />
                    <div className="flex flex-col w-full gap-2 px-[12px] py-[24px]">
                        {item?.destination_name && <p className="bg-[#0198671A] text-[#019867] w-max rounded-[20px] px-[12px] py-[4px]">{item?.destination_name}</p>}
                        <p className="text-[#001F15] text-[16px] font-[600]">{item?.name} </p>
                        <p className="text-[#869791] text-[12px] font-[400]">{item?.description} </p>
                        <TextInput className=" " value={curentIndex === item.id? price: ""} required onChange={(e) => handleQuantityChange(e, item.id)} radius={20} p={4} placeholder="مبلغ التبرع (ر.س)" />

                        {errorMessages !== '' && curentIndex === item.id && (
                        <p className="text-[red] font-normal">
                          {errorMessages}
                        </p>
                      )}
                        <div className=" flex items-center gap-2">
                            <Button onClick={()=> submitHandler(item.id)} color="#9A9A3A" radius={50} leftSection={<IoCartOutline size={25} />}>اضف لسلة التبرعات</Button>
                            {/* <Button color="#019867" radius={50} >تبرع الآن</Button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DonationCard;