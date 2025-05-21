import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineEmail, MdPermIdentity } from 'react-icons/md';
import { HiOutlinePhone } from 'react-icons/hi';
import { LuCalendar } from "react-icons/lu";

function ModalNewDetailsModel({ modalData, modalOpen1, setModalOpen1 }: any) {
    if (!modalData) {

        return <div>Loading...</div>;
    }
    return (
        <div>
            <Transition appear show={modalOpen1} as={Fragment}>
                <Dialog as="div" open={modalOpen1} onClose={() => setModalOpen1(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-[50vw] h-[100vh] my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalOpen1(false)}>
                                            <IoCloseSharp />
                                        </button>
                                    </div>
                                    <div className="p-5 h-full">
                                        <img src={modalData?.image?.url} className="w-full h-2/4" />
                                        <div>
                                            <div className="mt-10 pr-5 text-green-600 flex">
                                                <LuCalendar size={20} />
                                                <div className="mr-2">{modalData?.publish_date}</div>
                                            </div>
                                            <div className="mt-4 text-[24px]  flex">

                                                <div className="mr-5 font-extrabold">{modalData?.name}</div>
                                            </div>
                                            <div className="mt-4 pl-10 flex">
                                                <div className="mr-5 text-gray-500">{modalData?.description}</div>
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

export default ModalNewDetailsModel;
