
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import Image from 'next/image';
import celiacCard from '../../../../../public/celiaccard1.png'
import noCard from '../../../../../public/noCard.png'
import ProfileMenu from '../_components/profileMenu';
import { MdOutlineFileDownload } from 'react-icons/md';
function Profile() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الملف الشخصي", link: "/en/profile" },
        { title: "بطاقة السلياكي", link: "/en/profile/profileCeliacCard" },
    ];

    return (
        <div className='mx-auto px-4 sm:px-6 lg:px-8  py-[0] pb-[70px]'>
            <Breadcrumb items={breadcrumbData} />
            <div className="grid md:grid-cols-5 grid-cols-1 gap-8">
                <ProfileMenu />
                {true && <div className="md:col-span-4 grid grid-cols-1  gap-5">
                    <p className="text-[#001F15] text-[24px] font-[600]">بطاقة السلياكي</p>
                    <div className=" p-[24px] rounded-[8px] flex flex-col justify-center items-center w-full gap-3">
                        <Image alt='' src={noCard} />
                        <p className="text-[20px] font-[500] text-[#001F15]">ليس لديك بطاقة سلياك بعد !</p>
                        <button className='text-[#FFF] hover:bg-[#019868d1] transition text-[16px] font-[600] bg-[#019867] rounded-[50px] py-3 px-6'>تسجيل بطاقة سلياكي</button>
                    </div>
                </div>}

                {false &&
                    <div className="md:col-span-4 flex flex-col w-full gap-3">
                        <p className="text-[#001F15] text-[24px] font-[600]">بطاقة السلياكي</p>
                        <div className="border-solid border-[#CCCCCC] border-[1px] col-span-4  p-[24px] rounded-[8px] flex flex-col w-full gap-3">

                            <div className="flex justify-end w-full">
                                <MdOutlineFileDownload size={18} color='#001F15' />
                            </div>
                            <Image src={celiacCard} className='w-full max-h-[300px] object-contain' alt='' />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;