'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProfileMenu = () => {
    const pathname = usePathname()

    return (
        <ul className='flex md:flex-col w-full gap-1 justify-start items-center max-md:overflow-scroll'>
            <li className='w-[100%]'><Link href='/en/profile' className={`${pathname === '/en/profile' ? 'bg-[#019867] text-[#FFF] py-3 px-[20px] w-full flex justify-center items-center text-center  whitespace-nowrap ' : ' whitespace-nowrap bg-[#FAFAFA] text-[#45534E] py-3 px-[20px] w-full flex justify-center items-center text-center w-full'}`}>اعدادات الحساب</Link></li>
            <li className='w-[100%]'><Link href='/en/profile/profileCeliacCard' className={`${pathname === '/en/profile/profileCeliacCard' ? 'bg-[#019867] text-[#FFF] py-3 px-[20px] w-full flex justify-center items-center text-center whitespace-nowrap' : 'whitespace-nowrap bg-[#FAFAFA] text-[#45534E] py-3 px-[20px] w-full flex justify-center items-center text-center w-full'}`}>بطاقة السلياكي</Link></li>
            <li className='w-[100%]'><Link href='/en/profile/profileMembership' className={`${pathname === '/en/profile/profileMembership' ? 'bg-[#019867] text-[#FFF] py-3 px-[20px] w-full flex justify-center items-center text- whitespace-nowrap' : 'whitespace-nowrap bg-[#FAFAFA] text-[#45534E] py-3 px-[20px] w-full flex justify-center items-center text-center w-full'}`}>العضوية</Link></li>
            <li className='w-[100%]'><Link href='/en/profile/myReservations' className={`${pathname === '/en/profile/myReservations' ? 'bg-[#019867] text-[#FFF] py-3 px-[20px] w-full flex justify-center items-center text-center whitespace-nowrap' : 'whitespace-nowrap bg-[#FAFAFA] text-[#45534E] py-3 px-[20px] w-full flex justify-center items-center text-center w-full'}`}>حجوزاتي</Link></li>
            <li className='w-[100%]'><Link href='/en/profile/profilePrograms' className={`${pathname === '/en/profile/profilePrograms' ? 'bg-[#019867] text-[#FFF] py-3 px-[20px] w-full flex justify-center items-center text-center whitespace-nowrap' : 'whitespace-nowrap bg-[#FAFAFA] text-[#45534E] py-3 px-[20px] w-full flex justify-center items-center text-center w-full'}`}>الانشطة والبرامج</Link></li>
            <li className='w-[100%]'><Link href='#' className={`${pathname === '#' ? 'bg-[#019867] text-[#FFF] py-3 px-[20px] w-full flex justify-center items-center text-center whitespace-nowrap' : 'whitespace-nowrap bg-[#FAFAFA] text-[#45534E] py-3 px-[20px] w-full flex justify-center items-center text-center w-full'}`}>تسجيل الخروج</Link></li>
            <li className='w-[100%]'><Link href='#' className={`${pathname === '/en/profile7' ? 'bg-[#019867] text-[#FF0000] py-3 px-[20px] w-full flex justify-center items-center text-center whitespace-nowrap' : 'whitespace-nowrap bg-[#FAFAFA] text-[#FF0000] py-3 px-[20px] w-full flex justify-center items-center text-center'}`}>حذف الحساب</Link></li>
        </ul>
    );
}

export default ProfileMenu;