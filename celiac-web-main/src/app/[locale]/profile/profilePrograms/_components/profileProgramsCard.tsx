import { Divider } from "@mantine/core";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
// import { LuUserSquare2 } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";
import memberSCard from '../../../../../../public/swiperImage.png'
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiMoneyWavyLight } from "react-icons/pi";
interface IMCard {
    title: string | null
    renew: boolean
}
const ProfileProgramsCard = ({ title, renew }: IMCard) => {
    return (
        <div className="mb-[10px]">
            {title && <p className="text-[#001F15]  mb-[20px] text-[24px] font-[600]">{title}</p>}
            <div className="border-solid border-[#CCCCCC] border-[1px] col-span-4 p-[20px] rounded-[8px] grid grid-cols-3 w-full ">
                <div className="col-span-2 flex items-start gap-3">
                    <Image src={memberSCard} className='w-[68px] h-[68px] rounded-[50%] object-cover' alt='' />
                    <div className="">
                        <p className="text-[#001F15] text-[16px] font-[600] w-[60%]">البرنامج التدريبي على فنون الطهي ومناقشة احدث طرق الطهي واحدث الاساليب</p>
                        <div className="flex items-center flex-wrap gap-3">
                            <div className=" flex items-center gap-2">
                                <CiCalendar color='#019867' size={20} />
                                <p className="text-[16px] text-[#001F15] font-[400]">تبدأ فى: <span className="text-[16px] text-[#45534E] font-[400]">22 مايو, 2023 - 8:30 م الى 10:00 م</span></p>
                            </div>
                            <div className=" flex items-center gap-2">
                                <CiLocationOn color='#019867' size={20} />
                                <p className="text-[16px] text-[#001F15] font-[400]">أونلاين <span className="text-[16px] text-[#45534E] font-[400]"></span></p>
                            </div>
                            <div className=" flex items-center gap-2">
                                <PiMoneyWavyLight color='#019867' size={20} />
                                <p className="text-[16px] text-[#001F15] font-[400]">الرسوم المدفوعة:  <span className="text-[16px] text-[#45534E] font-[400]">100 ر.س</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <div className="text-[16px] text-[#9A9A3A] bg-[#9A9A3A1A] rounded-[34px] py-[10px] px-[12px] font-[400]">حجز جديد</div>
                    <button className='text-[#FFF] hover:bg-[#019868d1] transition text-[16px] font-[600] bg-[#019867] rounded-[50px] py-2 px-6'>الغاء الحجز</button>
                </div>
                {/* <Image src={celiacCard} className='w-full max-h-[300px] object-contain' alt='' /> */}
            </div>
        </div>
    );
}

export default ProfileProgramsCard;