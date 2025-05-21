import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useGetCeliacCardOwnerQuery } from "../../../api/serveces";
import { MdOutlineFileDownload } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

type Props = {
    modal2: boolean;
    setModal2: (open: boolean) => void;
    id: string;
};

const CardOwnerModal = ({ modal2, setModal2, id }: Props) => {
    const { data, isLoading } = useGetCeliacCardOwnerQuery(id);
    return (
        <Transition appear show={modal2} as={Fragment}>
            <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
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
                            <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden w-max my-8 text-black dark:text-white-dark">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-1 bg-[#F5FBFC] p-4 rounded">
                                        <FaUser size={130} className="w-full mb-4" />
                                        <p className="text-[#001F15] text-[20px] font-bold">{data?.data.full_name}</p>
                                        <p className="text-[#45534E] text-[16px] font-400">{data?.data.dob}</p>
                                        <p className="text-[#45534E] text-[16px] font-400"><span className="font-bold">تاريخ الانضمام: </span>{data?.data.created_at}</p>
                                    </div>
                                    <div className="col-span-2 pt-0 rounded">
                                        <div className="flex justify-between items-center"><p className="text-[##0E1726] text-[20px] font-bold">تفاصيل المستخدم</p><IoClose size={25} className="cursor-pointer" onClick={() => setModal2(false)} /></div>
                                        <hr className="my-2" />
                                        <div className="grid grid-cols-2 gap-[35px]">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">البريد الإلكتروني</p></div>
                                                <p className="">{data?.data.email}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">رقم الهاتف</p></div>
                                                <p className="">{data?.data.phone}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">الرقم الوطني</p></div>
                                                <p className="">{data?.data.national_id}</p>
                                            </div>
                                            {data?.data.user.civil_id && <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">الهوية المدنية</p></div>
                                                <p className="">{data?.data.user.civil_id}</p>
                                            </div>}
                                            {data?.data.user.residency_number && <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">رقم الإقامة</p></div>
                                                <p className="">{data?.data.user.residency_number}</p>
                                            </div>}
                                        </div>
                                        <NavLink to={data?.data.medical_report.url} className="rounded-lg border p-4 my-4 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <img src="../../../../public/assets/images/pdfLofo.svg" alt="" />
                                                <p className="">بطاقة سيلياك.pdf</p>
                                            </div>
                                            <MdOutlineFileDownload size={30} />
                                        </NavLink>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CardOwnerModal;
