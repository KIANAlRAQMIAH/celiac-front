'use client'
import Image from 'next/image';
import ac1 from '../../../../../../../public/activity1.png'
import Link from 'next/link';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useGetEventsQuery } from '@/api/CommitteeApiSlice';
import { SvgSpinners6DotsRotate } from '../[id]/_components/icons';

const EventCard = () => {
    const { data, isLoading, error } = useGetEventsQuery();
        if (isLoading) return <div className='col-span-1 md:col-span-2  gap-4 lg:col-span-3 w-full flex justify-center items-center h-[50vh]'><SvgSpinners6DotsRotate className='w-[70px] h-[70px] '/></div>
    
    return (
        <>
        {data?.data?.map((event: any) => (
        <Link key={event?.id} href={`/ar/services/activities/events/${event?.id}`} className="bg-[white] rounded-t-[14px] rounded-b-[14px]" >
            <div className="w-full h-[200px] relative rounded-t-[14px] overflow-hidden " >
                <Image className='w-full h-full object-cover ' src={ac1} alt='1' />
                <p className='bg-[white] rounded-[31px] p-2 text-[#001F15] absolute top-[10px] left-[10px] font-[500] text-[12px]'>{event?.event_type_text}</p>
                { <p className='bg-[#FD2854] rounded-[31px] p-2 text-[#FFF] absolute top-[10px] right-[10px] font-[500] text-[12px]'>مجاني</p>}
            </div>
            <div className="grid grid-cols-6 my-4 p-3">
                <div className="col-span-1 flex flex-col justify-start items-center">
                    <p className='text-[12px] text-[#019867] font-[500]'>{event?.updated_at.slice(0,7)}</p>
                    <p className='text-[24px] text-[#001F15] font-[600]'>{event?.updated_at.slice(8,10)}</p>
                </div>
                <div className="col-span-5 flex flex-col gap-1">
                    <p className="text-[16px] text-[#001F15] font-[600]">
                        {event?.name}
                    </p>
                    <p className="text-[12px] text-[#45534E] font-[400]">
                        {event?.desc}
                    </p>
                    <div className="flex justify-start items-center gap-1">
                        <HiOutlineLocationMarker color='#019867' size={25} />
                        <p>{event?.address}</p>
                    </div>
                    <p className='text-[16px] text-[#019867] font-[600] mt-2'>120 ر.س</p>
                </div>
            </div>
        </Link >
        ))}
        </>
    );
}

export default EventCard;