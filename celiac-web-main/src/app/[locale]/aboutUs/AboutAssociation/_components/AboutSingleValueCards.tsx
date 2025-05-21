"use client"
import Image from "next/image";
import valueImage from '../../../../../../public/valueabout.svg'
import ourValues from "../../../../../../public/OurValues.svg"
import OurMessage from "../../../../../../public/OurMessage.svg"
import OurGoals from "../../../../../../public/OurGoals.svg"
import { useGetAboutUsQuery } from "@/api/AboutUsApiSlice";
export default function SingleValueCards() {

    const { data, error, isLoading }: any = useGetAboutUsQuery();
    return (
        <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
                <div className="flex flex-col gap-[8px] about-card p-[30px] rounded-[13px]">
                    <div className="flex flex-col justify-center items-center bg-[#EEFEF9] p-[10px] w-[50px] h-[50px] rounded-[50%]">
                        <Image className='w-[40px]' src={valueImage} alt='' />
                    </div>
                    <h3 className='text-[#001F15] font-[700] text-[16px]'>رؤيتنــــــــا</h3>
                    <p className='text-[#869791] font-[500] text-[14px] break-all'>{data?.association_visions}</p>
                </div>

                <div className="flex flex-col gap-[8px] about-card p-[30px] rounded-[13px]">
                    <div className="flex flex-col justify-center items-center bg-[#EEFEF9] p-[10px] w-[50px] h-[50px] rounded-[50%]">
                        <Image className='w-[40px]' src={OurMessage} alt='' />
                    </div>
                    <h3 className='text-[#001F15] font-[700] text-[16px]'>رسالتنــــا</h3>
                    <p className='text-[#869791] font-[500] text-[14px] break-all'>{data?.association_message}</p>
                </div>


                <div className="flex flex-col gap-[8px] about-card p-[30px] rounded-[13px]">
                    <div className="flex flex-col justify-center items-center bg-[#EEFEF9] p-[10px] w-[50px] h-[50px] rounded-[50%]">
                        <Image className='w-[40px]' src={OurGoals} alt='' />
                    </div>
                    <h3 className='text-[#001F15] font-[700] text-[16px]'>أهدافنــــا</h3>
                    <p className='text-[#869791] font-[500] text-[14px] break-all'>{data?.association_objectives}</p>
                </div>
                <div className="flex flex-col gap-[8px] about-card p-[30px] rounded-[13px]">
                    <div className="flex flex-col justify-center items-center bg-[#EEFEF9] p-[10px] w-[50px] h-[50px] rounded-[50%]">
                        <Image className='w-[40px]' src={ourValues} alt='' />
                    </div>
                    <h3 className='text-[#001F15] font-[700] text-[16px]'>قيمتنـــــا</h3>
                    <p className='text-[#869791] font-[500] text-[14px] break-all'>{data?.association_values}</p>
                </div>
            </div>
        </>

    );
}