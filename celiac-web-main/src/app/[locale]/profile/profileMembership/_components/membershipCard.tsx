import { Divider } from "@mantine/core";
import Image from "next/image";
import { FiUser } from "react-icons/fi";

import { MdOutlineFileDownload } from "react-icons/md";
import memberSCard from '../../../../../../public/membersCard.png'
import { LuUser } from "react-icons/lu";
interface IMCard {
    title: string | null
    renew: boolean
}
const MembershipCard = ({ title, renew }: IMCard) => {
    return (
        <div className="mb-[10px]">
            {title && <p className="text-[#001F15]  mb-[20px] text-[24px] font-[600]">{title}</p>}
            <div className="border-solid border-[#CCCCCC] border-[1px] col-span-4   rounded-[8px] flex flex-col w-full ">
                <div className="flex justify-between md:items-center items-start w-full p-[24px]">
                    <div className="flex flex-wrap items-center gap-1">
                        <p className="text-[16px] text-[#869791] font-[400]">رقم العضوية:  <span className='text-[16px] text-[#001F15] font-[400]'>254855</span></p>
                        <p className="text-[16px] text-[#869791] font-[400]">رقم العضوية:  <span className='text-[16px] text-[#001F15] font-[400]'>254855</span></p>
                        <p className="text-[16px] text-[#869791] font-[400]">رقم العضوية:  <span className='text-[16px] text-[#001F15] font-[400]'>254855</span></p>
                    </div>
                    <div className="text-[16px] text-[#9A9A3A] bg-[#9A9A3A1A] whitespace-nowrap rounded-[34px] py-[10px] px-[12px] font-[400]">عضوية ذهبية</div>
                </div>
                <Divider color='#C1D2CC' className='w-full' />
                <div className="p-[20px] flex flex-col md:flex-row justify-between md:items-center items-start gap-4 w-full">
                    <div className="flex flex-col w-full md:w-max gap-2">
                        <p className="text-[18px] font-[600] text-[#001F15]">العضوية الذهبية</p>
                        <div className=" flex items-center gap-2">
                            <FiUser color='#019867' size={20} />
                            <p className="text-[16px] text-[#001F15] font-[400]">حامل العضوية: <span className="text-[16px] text-[#45534E] font-[400]">أحمد عبدالرحمن محمد</span></p>
                        </div>
                        <div className=" flex items-center gap-2">
                            <LuUser color='#019867' size={20} />
                            <p className="text-[16px] text-[#001F15] font-[400]">رقم الهوية: <span className="text-[16px] text-[#45534E] font-[400]">021548452215545</span></p>
                        </div>
                        <div className=" flex items-center justify-center w-full gap-2">
                            <button className='text-[#FFF] hover:bg-[#019868d1] flex-1 transition text-[16px] font-[600] bg-[#019867] rounded-[50px] py-2 px-6'>تجديد الاشتراك</button>
                            {renew && <button className='hover:text-[#FFF] text-[#019867] hover:bg-[#019868d1] transition text-[16px] font-[600] border-[1px] border-solid border-[#019867] rounded-[50px] py-2 px-6'>الغاء الاشتراك</button>}
                        </div>
                    </div>
                    <div className=" rounded-[14px] relative border-[#C1D2CC]  border-solid border-[1px] md:w-[213px] md:h-[197px] w-full h-[300px]">
                        <MdOutlineFileDownload className='absolute top-[20px] left-[20px]' size={18} color='#001F15' />
                        <Image src={memberSCard} alt='' className='w-full h-full object-cover rounded-[14px]' />
                    </div>
                </div>

                {/* <Image src={celiacCard} className='w-full max-h-[300px] object-contain' alt='' /> */}
            </div>
        </div>
    );
}

export default MembershipCard;