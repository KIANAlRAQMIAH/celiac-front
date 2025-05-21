import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useGetFoodbasketRequestQuery } from "../../../api/serveces";
import { FaUser } from "react-icons/fa";

type Props = {
    modal2: boolean;
    setModal2: (open: boolean) => void;
    user: any;
    id: string;
};

const FoodBasketModal = ({ modal2, setModal2, user, id }: Props) => {
    const { data, isLoading, isSuccess } = useGetFoodbasketRequestQuery(id);
    console.log(user);
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
                                        {user?.avatar ? (
                                            <img src={user?.avatar} className="rounded w-full h-[150px] object-cover" alt="" />
                                        ) : (
                                            <FaUser size={130} className="w-full mb-4" />
                                        )}
                                        <p className="text-[#001F15] text-[20px] font-bold">{user.name}</p>
                                        <p className="text-[#45534E] text-[16px] font-400">{user.birthdate}</p>
                                        <p className="text-[#45534E] text-[16px] font-400">
                                            <span className="font-bold">تاريخ الانضمام: </span>{user.created_at}
                                        </p>
                                    </div>
                                    <div className="col-span-2 pt-0 rounded">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[##0E1726] text-[20px] font-bold">تفاصيل المستخدم</p>
                                            <IoClose size={25} className="cursor-pointer" onClick={() => setModal2(false)} />
                                        </div>
                                        <hr className="my-2" />
                                        <div className="grid grid-cols-2 gap-[15px]">
                                            {user.address && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">العنوان</p>
                                                    </div>
                                                    <p className="">{user.address}</p>
                                                </div>
                                            )}
                                            {user.created_at && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">تاريخ الانشاء</p>
                                                    </div>
                                                    <p className="">{user.created_at}</p>
                                                </div>
                                            )}
                                            {user.dob && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">تاريخ الميلاد</p>
                                                    </div>
                                                    <p className="">{user.dob}</p>
                                                </div>
                                            )}
                                            {user.email && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">البريد الالكتروني</p>
                                                    </div>
                                                    <p className="">{user.email}</p>
                                                </div>
                                            )}
                                            {user.full_name && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">الاسم</p>
                                                    </div>
                                                    <p className="">{user.full_name}</p>
                                                </div>
                                            )}
                                            {user.identity_number && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">رقم الهوية</p>
                                                    </div>
                                                    <p className="">{user.identity_number}</p>
                                                </div>
                                            )}
                                            {user.full_national_address && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">العنوان الوطني الكامل</p>
                                                    </div>
                                                    <p className="">{user.full_national_address}</p>
                                                </div>
                                            )}
                                            {user.phone && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">رقم الهاتف</p>
                                                    </div>
                                                    <p className="">{user.phone}</p>
                                                </div>
                                            )}
                                            {user.updated_at && (
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold">تاريخ التعديل</p>
                                                    </div>
                                                    <p className="">{user.updated_at}</p>
                                                </div>
                                            )}
                                        </div>
                                        {user.medical_report && (
                                            <NavLink to={user.medical_report.url} className="rounded-lg border p-4 my-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <img src="../../../../public/assets/images/pdfLofo.svg" alt="" />
                                                    <p className="">تقرير طبي.pdf</p>
                                                </div>
                                                <MdOutlineFileDownload size={30} />
                                            </NavLink>
                                        )}
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

export default FoodBasketModal;
