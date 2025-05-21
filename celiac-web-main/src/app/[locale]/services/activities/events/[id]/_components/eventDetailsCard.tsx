'use client'
import Image from 'next/image';
import ac1 from '../../../../../../../../public/PsychotherapyDetailsImg.png'
import ic6 from '../../../../../../../../public/ic6.png'
import Link from 'next/link';
import { LuAlarmClock } from 'react-icons/lu';
import { PiMoneyWavy } from "react-icons/pi";
import AppointmentMap from '@/app/[locale]/clinic/[BookAnAppointment]/_components/appointmentMap';
import { useParams } from 'next/navigation';
import { useGetEventQuery } from '@/api/CommitteeApiSlice';
import { SvgSpinners6DotsRotate } from './icons';

interface IPsychotherapyDetails {
    free: boolean
}
const EventDetailsCard = ({ free }: IPsychotherapyDetails) => {
    const { id } = useParams();
    const { data, isLoading, error } = useGetEventQuery(id);
    data && console.log(data?.data)
    if (isLoading) return <div className='w-full flex justify-center items-center h-[50vh]'><SvgSpinners6DotsRotate className='w-[70px] h-[70px] '/></div>
    return (
        <div className="rounded-b-[14px] flex flex-col gap-2" >
            <div className="w-full h-[350px] relative  overflow-hidden " >
                <Image className='w-full h-full object-cover ' src={ac1} alt='1' />
            </div>
            <div className="flex justify-between items-center mt-4">

                <div className="flex justify-center items-center gap-3">
                    {<p className='bg-[#0198671A] rounded-[31px] py-2 px-4 text-[#019867]   font-[500] text-[12px]'>{data?.data?.event_type_text}</p>}
                    {<p className='bg-[#FD2854] rounded-[31px] py-2 px-4 text-[#FFF]   font-[500] text-[12px]'>مجاني</p>}
                </div>
                <p className="text-[#001F15] text-[24px] font-[600]">120 ر.س</p>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                <div className="col-span-2 flex flex-col gap-4 ">
                    <p className="text-[24px] text-[#001F15] font-[600]">
                        { data?.data?.name}
                    </p>
                    <div className=" flex flex-wrap justify-start items-center gap-4">
                        <div className="flex justify-center items-center gap-1">
                            <Image alt='icon' src={ic6} />
                            <p>{data?.data?.created_at} </p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <Image alt='icon' src={ic6} />
                            <p>{data?.data?.starts_at}</p>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <Image alt='icon' src={ic6} />
                            <p>حضور عن بعد</p>
                        </div>
                    </div>
                    <p className="text-[18px] text-[#001F15] font-[600]">
                        نبذة عن الفعالية
                    </p>
                    <p className="text-[16px] text-[#45534E] font-[400] ">
                        {data?.data?.desc}
                    </p>
                    <p className="text-[18px] text-[#001F15] font-[600]">
                        تفاصيل الشهادة
                    </p>
                    <div className="flex justify-start items-center gap-1">
                        <PiMoneyWavy color='#019867' size={25} />
                        <p className='text-[#001F15] text-[14px] '><span className="text-[#869791]">:رسوم الشهادة</span> 100 ر.س</p>
                    </div>
                    <div className="flex justify-start items-center gap-1">
                        <LuAlarmClock color='#019867' size={25} />
                        <p className='text-[14px] text-[#001F15]'><span className="text-[#869791]">:مدة الدورة</span>: 2 شهر</p>
                    </div>
                    <Link href='/en/services/activities/events/eventForm' className='w-max'><button className='bg-[#019867] text-[#FFF] mt-[16px] w-max rounded-[50px] py-2 px-[16px] text-[16px] font-[600]'>تأكيد الاشتراك</button></Link>
                </div>
                <div className="flex flex-col  justify-between mr-auto gap-[12px] lg:w-[90%] w-[100%]">
                    <div className=" flex-grow min-h-[200px]"><AppointmentMap /></div>
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[#001F15] text-[16px] font-[600]">عيادة الجهاز الهضمي للبالغين</p>
                        <p className="text-[#869791] text-[16px] font-[400]">حي الغدير, الرياض, شارع السيدة عائشة رضي الله عنها , عمارات الاتحاد , الدور الاول والثاني</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EventDetailsCard;