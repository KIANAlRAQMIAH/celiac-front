
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import ProfileMenu from './_components/profileMenu';
import { CiEdit } from 'react-icons/ci';
import Image from 'next/image';
import profileImg from '../../../../public/profile.png'
import { MdOutlineFileDownload } from "react-icons/md";
import pdfImg from '../../../../public/pdfIcon.png'
import { IoIosCloseCircleOutline } from 'react-icons/io';
function Profile() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الملف الشخصي", link: "/en/profile" },
    ];

    return (
        <div className='mx-auto px-4 sm:px-6 lg:px-8 py-[0] pb-[70px]'>
            <Breadcrumb items={breadcrumbData} />
            <div className="grid md:grid-cols-5 grid-cols-1 gap-8">
                <ProfileMenu />
                <div className="md:col-span-4 grid grid-cols-1  gap-5">
                    <p className="text-[#001F15] text-[24px] font-[600]">اعدادات الحساب</p>
                    <div className="border-solid border-[#CCCCCC] p-[24px] border-[1px] rounded-[8px] flex flex-col w-full gap-3">
                        <div className="flex justify-between items-center">
                            <p className="text-[16px] text-[#869791] font-[600]">البيانات الشخصية</p>
                            <button className='flex justify-center items-center gap-2 text-[14px] text-[#019867] font-[500]'><CiEdit />تعديل</button>
                        </div>
                        <div className="flex flex-col md:flex-wrap md:items-center items-start gap-3">
                            <Image className='w-[80px] h-[80px] rounded-[50%] object-contain' src={profileImg} alt='' />
                            <div className="flex flex-col justify-start">
                                <p className="text-[#001F15] text-[16px] font-[600] flex items-center gap-1">أحمد عادل عبد الرحمن<span className="text-[11px] w-max text-[#019867] font-[400] px-3 rounded-[25px] py-1  bg-[#0198671A]">سعودي</span></p>
                                <p className="text-[12px] text-[#869791] font-[400]">ذكر , 35 سنة</p>
                                <p className="text-[14px] text-[#45534E] font-[400]">someone@gmail.com</p>
                                <p className="text-[14px] text-[#45534E] font-[400] flex items-center gap-2">رقم الهوية: <span className="text-[#001F15]">21546584521258s</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 md:w-[40%] w-[100%] ">
                            <p className="text-[16px] text-[#869791] font-[600]">التقرير الطبي</p>
                            <div className="flex justify-between items-center">
                                <div className="flex justify-between items-center gap-4">
                                    <Image src={pdfImg} className='w-[40px] h-[40px] object-contain' alt='' />
                                    <p className="text-[#001F15] text-[14px] font-[600]">الملف الطبي .pdf</p>
                                </div>
                                <div className="flex justify-center items-center gap-1">
                                    <MdOutlineFileDownload size={18} color='#001F15' />
                                    <IoIosCloseCircleOutline size={18} color='#001F15' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-solid border-[#CCCCCC] p-[24px] border-[1px] rounded-[8px] flex justify-between items-center w-full gap-3">
                        <div className="flex flex-col gap-2 justify-between items-start">
                            <p className="text-[16px] text-[#869791] font-[600]">البيانات الشخصية</p>
                            <p className="text-[16px] text-[#001F15] font-[600]">أحمد ابراهيم 225</p>
                        </div>
                        <button className='flex justify-center items-center gap-2 text-[14px] text-[#019867] font-[500]'><CiEdit />تغيير اسم الحساب</button>
                    </div>
                    <div className="border-solid border-[#CCCCCC] p-[24px] border-[1px] rounded-[8px] flex justify-between items-center w-full gap-3">
                        <div className="flex flex-col gap-2 justify-between items-start">
                            <p className="text-[16px] text-[#869791] font-[600]">رقم الجوال</p>
                            <p className="text-[16px] text-[#001F15] font-[600]">05625485452</p>
                        </div>
                        <button className='flex justify-center items-center gap-2 text-[14px] text-[#019867] font-[500]'><CiEdit />تغيير رقم الجوال</button>
                    </div>
                    <div className="border-solid border-[#CCCCCC] p-[24px] border-[1px] rounded-[8px] flex justify-between items-center w-full gap-3">
                        <div className="flex flex-col gap-2 justify-between items-start">
                            <p className="text-[16px] text-[#869791] font-[600]">كلمة المرور الحالية</p>
                            <p className="text-[16px] text-[#001F15] font-[600]">************</p>
                        </div>
                        <button className='flex justify-center items-center gap-2 text-[14px] text-[#019867] font-[500]'><CiEdit />تغيير كلمة المرور</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;