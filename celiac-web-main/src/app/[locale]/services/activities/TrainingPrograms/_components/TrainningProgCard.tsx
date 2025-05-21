import Image from 'next/image';
import Link from 'next/link';
import { GiSandsOfTime } from "react-icons/gi";
import { LuAlarmClock } from "react-icons/lu";

interface IPsychotherapyDetails {
  free: boolean
  progType: string
  formURL: string,
  
  course: {
    name: string
    id:string;
    desc: string
    price: string
    training_period: number
    starts_at: string
    ends_at: string
    course_date: string // e.g. "2025-04-18"
    photo?: {
      url: string
    }
  }
}

const TrainningProgCard = ({ free, progType, formURL, course }: IPsychotherapyDetails) => {
  const courseDate = new Date(course.course_date);
  const month = courseDate.toLocaleString('ar-EG', { month: 'long' });
  const day = courseDate.getDate();

  return (
    <Link href={`/en/services/activities/TrainingPrograms/${course.id}`} className="bg-[white] rounded-t-[14px] rounded-b-[14px]">
      <div className="w-full h-[200px] relative rounded-t-[14px] object-cover overflow-hidden">
        <Image
          fill
          className='w-full h-full object-contain'
          src={course?.photo?.url || "/fallback.png"}
          alt={course.name}
        />
        <p className='bg-[white] rounded-[31px] p-2 text-[#001F15] absolute top-[10px] left-[10px] font-[500] text-[12px]'>{progType}</p>
        {free && <p className='bg-[#FD2854] rounded-[31px] p-2 text-[#FFF] absolute top-[10px] right-[10px] font-[500] text-[12px]'>مجاني</p>}
      </div>

      <div className="grid grid-cols-6 my-4 p-3">
        <div className="col-span-1 flex flex-col justify-start items-center">
          <p className='text-[12px] text-[#019867] font-[500]'>{month}</p>
          <p className='text-[24px] text-[#001F15] font-[600]'>{day}</p>
        </div>

        <div className="col-span-5 flex flex-col gap-1">
          <p className="text-[16px] text-[#001F15] font-[600]">
            {course.name}
          </p>
          <p className="text-[12px] text-[#45534E] font-[400]">
            {course.desc}
          </p>

          <div className="flex justify-start items-center gap-3">
            <div className="flex justify-start items-center gap-1">
              <GiSandsOfTime color='#019867' size={15} />
              <p className='text-[12px]'>مدة الدورة: {course.training_period} {course.training_period > 1 ? 'أشهر' : 'شهر'}</p>
            </div>
            <div className="flex justify-start items-center gap-1">
              <LuAlarmClock color='#019867' size={15} />
              <p className='text-[12px]'>الوقت: {course.starts_at?.slice(0,5)} - {course.ends_at?.slice(0,5)}</p>
            </div>
          </div>

          <p className='text-[16px] text-[#019867] font-[600] mt-2'>
            {free ? 'مجاني' : `${parseFloat(course.price).toLocaleString()} ر.س`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TrainningProgCard;
