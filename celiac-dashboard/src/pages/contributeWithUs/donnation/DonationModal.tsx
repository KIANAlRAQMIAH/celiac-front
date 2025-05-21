import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useGetDonationByIdQuery, useAddDonateMutation, useUpdateDonateMutation } from '../../../api/HomeSlice/DonationSlice';
import { toast } from 'react-toastify';
import { Loader } from '@mantine/core';

interface DonationsModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    donationId: number | null;
    setDonationId: (id: number | null) => void;
    isLoadingGet: boolean;
    isLoadingEdit: boolean;
}

export default function DonationsModal({
    modalOpen,
    setModalOpen,
    donationId,
    setDonationId,
    isLoadingGet,
    isLoadingEdit
}: DonationsModalProps) {//@ts-ignore
    const { data: donationData, isLoading: isLoadingDonation } = useGetDonationByIdQuery(donationId);
    const [addDonate] = useAddDonateMutation();
    const [updateDonate] = useUpdateDonateMutation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [destination, setDestination] = useState('');
    const [image, setImage] = useState<any>(null);

    useEffect(() => {
        if (donationId && donationData) {
            setName(donationData?.data?.name);
            setDescription(donationData?.data?.description);
            setDestination(donationData?.data?.destination_name);
            setImage(donationData?.data?.image);
        } else {
            setName('');
            setDescription('');
            setDestination('');
            setImage(null);
        }
    }, [donationData, donationId]);

    useEffect(() => {
        if (!modalOpen) {
            setName('');
            setDescription('');
            setDestination('');
            setImage(null);
            setDonationId(null);
        }
    }, [modalOpen]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);
        } else {
            setImage(null);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('destination_name', destination);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (donationId) {
                await updateDonate({ Id: donationId, formData }).unwrap();
                toast.success('تم التعديل بنجاح');
            } else {
                await addDonate(formData).unwrap();
                toast.success('تمت الإضافة بنجاح');
            }
            setModalOpen(false);
        } catch (error) {//@ts-ignore
            const firstErrorKey = Object.keys(error?.data?.errors || [])[0];//@ts-ignore
            const firstErrorMessage = error?.data?.errors[firstErrorKey]?.[0];
            if (firstErrorKey && firstErrorMessage) {
                toast.error(firstErrorMessage);
            } else {
                toast.error('حدث خطأ ما');
            }
        }
    };

    return (
        <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                <h5 className="font-bold text-lg text-primary/90 my-[8px]">{donationId ? 'التعديل' : 'إضافة'}</h5>
                                <div className="p-5">
                                    {isLoadingGet || isLoadingEdit ? (
                                        <Loader />
                                    ) : (
                                        <form className="space-y-5" onSubmit={handleSubmit}>
                                            <div className='mb-3'>
                                                <label className='font-bold my-4 text-[20px]' htmlFor="name">العنوان</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="اكتب العنوان"
                                                    className="form-input"
                                                    required
                                                />
                                            </div>
                                            <h1 className="font-bold my-4 text-[20px]">الوصف</h1>
                                            <textarea
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="border rounded-lg p-4 w-[100%]"
                                            />
                                            <div className='mb-3'>
                                                <label className='font-bold my-4 text-[20px]' htmlFor="destination">جهة التبرع</label>
                                                <input
                                                    id="destination"
                                                    type="text"
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                    placeholder="اكتب جهة التبرع"
                                                    className="form-input"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="image">تحميل الصوره(.png فقط)</label>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="form-input file:py-5 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                />
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalOpen(false)}>
                                                    الغاء
                                                </button>
                                                <button type="submit" disabled={isLoadingGet || isLoadingEdit} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    تأكيد
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
