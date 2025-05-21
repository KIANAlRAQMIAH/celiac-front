import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { HiOutlinePhone } from 'react-icons/hi';
import { MdPermIdentity } from 'react-icons/md';
import userPhoto from "../../../public/assets/images/client1.jpg";
function ModalUsers({ modalData, modal2, setModal2 }: any) {
    return (
        <div>
            <Transition appear show={modal2} as={Fragment}  >
                <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex  items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-1 rounded-lg overflow-hidden  lg:w-[50%] lg:h-[60%] w-[95%]  my-8 text-black dark:text-white-dark">
                                    <div className="w-[100%] flex flex-col-reverse  md:flex-row lg:flex-row   ">
                                        <div className=" w-[100%] lg:w-[50%] md:w-[50%]  bg-gray-50  shadow-xl rounded-lg flex flex-col justify-center items-center ">
                                            <img src={userPhoto} alt="cover" className=" w-[85%] h-[50%] rounded-lg  m-2 mb-5  object-cover" />
                                            <h1 className="font-bold pr-2 ">{modalData && (modalData as { name: string }).name}</h1>
                                            <div className="flex justify-start items-start mt-3 pr-2 gap-2">
                                                <p className="text-gray-500">{modalData && (modalData as { age: number }).age}  سنه,   </p>
                                                <p className="text-gray-500"> {modalData && (modalData as { user_resident_type: string }).user_resident_type}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-[100%] lg:w-[100%]  md:w-[50%]  ">
                                            <div className=" flex justify-between items-start border-b py-1  ">
                                                <div className="font-extrabold pl-4 pr-4">تفاصيل المسـتخدم</div>
                                                <button type="button" className="text-white-dark border-none   hover:text-dark" onClick={() => setModal2(false)}>
                                                    <IoCloseSharp />
                                                </button>
                                            </div>
                                            <div className="mt-5 pr-2  flex flex-col m-5   ">
                                                <div className=' flex flex-col lg:justify-between md:justify-between  justify-between  lg:flex-row   md:flex-col  items-start  lg:items-center '>
                                                <div className="flex flex-col gap-2  ">
                                                    <div className="flex items-center gap-2">
                                                        <MdOutlineEmail size={25} />
                                                        <span className="font-bold">البريد الإلكتروني</span>
                                                    </div>
                                                     {modalData && (modalData as { email: string }).email}
                                                </div>

                                                <div className="flex flex-col gap-2 mt-5">
                                                    <div className="flex  gap-2">
                                                        <HiOutlinePhone size={23} />
                                                        <span className="font-bold">رقم التليفون</span>
                                                    </div>
                                                    {modalData && (modalData as { phone: string }).phone}
                                                </div>

                                                </div>
                                                {modalData && (
                                                    <div className="flex  mt-5    ">
                                                        {(modalData as { user_resident_type: string }).user_resident_type === 'مقيم' && (
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex items-start justify-start gap-2">
                                                                    <MdPermIdentity size={25} />
                                                                    <span className="font-bold">رقم الاقامه</span>
                                                                </div>

                                                                <span>{modalData && (modalData as { residency_number: string }).residency_number}</span>
                                                            </div>
                                                        )}

                                                        {(modalData as { user_resident_type: string }).user_resident_type === 'سعودي' && (
                                                            <div className="flex flex-col gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <MdPermIdentity size={25} />
                                                                    <span className="font-bold">رقم الهويه</span>
                                                                </div>
                                                                <span>{modalData && (modalData as { civil_id: string }).civil_id}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default ModalUsers;
