import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useGetHajjSingleUserQuery } from "../../../api/serveces";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import jsPDF from "jspdf";
import { FaUser } from "react-icons/fa";

type Props = {
    modal2: boolean;
    setModal2: (open: boolean) => void;
    id: string;
};

const HajjModal = ({ modal2, setModal2, id }: Props) => {
    const { data, isLoading } = useGetHajjSingleUserQuery(id);

    if (isLoading) {
        return <div>تحميل...</div>;
    }

    const isVisitor = data?.data.is_visitor;
    const isSaudi = data?.data.is_saudi;

    const handleExportUserData = () => {
        const doc = new jsPDF();
        doc.text("User Details", 10, 10);
        doc.text(`Name: ${data?.data.full_name}`, 10, 20);
        doc.text(`Email: ${data?.data.email}`, 10, 30);
        doc.text(`Phone: ${data?.data.phone}`, 10, 40);
        doc.text(`Date of Birth: ${data?.data.dob}`, 10, 50);
        doc.text(`Gender: ${data?.data.gender === 1 ? 'Male' : 'Female'}`, 10, 60);
        if (isVisitor) {
            doc.text(`Passport Number: ${data?.data.passport_number}`, 10, 70);
            doc.text(`Campaign Name: ${data?.data.campaign_name}`, 10, 80);
            doc.text(`Campaign Number: ${data?.data.campaign_number}`, 10, 90);
            doc.text(`Date of Travel: ${data?.data.transaction_date}`, 10, 100);
        } else if (isSaudi) {
            doc.text(`National ID: ${data?.data.national_id}`, 10, 70);
        } else {
            doc.text(`Residency Number: ${data?.data.residency_number}`, 10, 70);
        }
        doc.save("user-details.pdf");
    };

    const handleDownloadMedicalReport = () => {
        const link = document.createElement("a");
        link.href = data?.data.medical_report.url;
        link.download = "medical-report.pdf";
        link.click();
    };
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
                                        {data?.data.medical_report?.url ? (
                                            <button onClick={handleDownloadMedicalReport} className="rounded-lg border p-4 my-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <MdOutlineFileDownload size={30} />
                                                    <p className="">تحميل التقرير الطبي</p>
                                                </div>
                                            </button>
                                        ) : (
                                            <FaUser size={130} className="w-full mb-4" />
                                        )}
                                        <p className="text-[#001F15] text-[20px] font-bold">{data?.data.full_name}</p>
                                        <p className="text-[#45534E] text-[16px] font-400">{data?.data.dob}</p>
                                        <p className="text-[#45534E] text-[16px] font-400"><span className="font-bold">تاريخ الانضمام: </span>{data?.data.created_at}</p>
                                    </div>
                                    <div className="col-span-2 pt-0 rounded">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[##0E1726] text-[20px] font-bold">تفاصيل المستخدم</p>
                                            <IoClose size={25} className="cursor-pointer" onClick={() => setModal2(false)} />
                                        </div>
                                        <hr className="my-2" />
                                        <div className="grid grid-cols-2 gap-[5px]">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">البريد الإلكتروني</p></div>
                                                <p className="">{data?.data.email}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">رقم الهاتف</p></div>
                                                <p className="">{data?.data.phone}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">تاريخ الميلاد</p></div>
                                                <p className="">{data?.data.dob}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2"><p className="font-bold">الجنس</p></div>
                                                <p className="">{data?.data.gender === 1 ? 'ذكر' : 'أنثى'}</p>
                                            </div>
                                            {isVisitor && (
                                                <>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2"><p className="font-bold">رقم الجواز</p></div>
                                                        <p className="">{data?.data.passport_number}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2"><p className="font-bold">اسم الحملة</p></div>
                                                        <p className="">{data?.data.campaign_name}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2"><p className="font-bold">رقم الحملة</p></div>
                                                        <p className="">{data?.data.campaign_number}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2"><p className="font-bold">تاريخ السفر</p></div>
                                                        <p className="">{data?.data.transaction_date}</p>
                                                    </div>
                                                </>
                                            )}
                                            {isSaudi && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2"><p className="font-bold">رقم الهوية</p></div>
                                                    <p className="">{data?.data.national_id}</p>
                                                </div>
                                            )}
                                            {!isSaudi && !isVisitor && (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2"><p className="font-bold">رقم الإقامة</p></div>
                                                    <p className="">{data?.data.residency_number}</p>
                                                </div>
                                            )}
                                        </div>
                                        {data?.data.medical_report?.url && (
                                            <div className="flex justify-between items-center mt-4">
                                                <button onClick={handleDownloadMedicalReport} className="rounded-lg border p-4 flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <MdOutlineFileDownload size={30} />
                                                        <p className="">تحميل التقرير الطبي</p>
                                                    </div>
                                                </button>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center mt-4">
                                            <button onClick={handleExportUserData} className="rounded-lg border p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <MdOutlineFileDownload size={30} />
                                                    <p className="">تصدير بيانات المستخدم كملف PDF</p>
                                                </div>
                                            </button>
                                        </div>
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

export default HajjModal;
