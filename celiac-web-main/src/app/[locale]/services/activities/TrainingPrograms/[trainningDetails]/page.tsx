"use client";
import Image from "next/image";
import ic6 from "../../../../../../../public/ic6.png";
import Link from "next/link";
import { LuAlarmClock } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import AppointmentMap from "@/app/[locale]/clinic/[BookAnAppointment]/_components/appointmentMap";
import { useGetSingleCourseQuery } from "@/api/serveces";

export default function Trainningdetails({ free, params }: any) {
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "الخدمات", link: "/ar/services" },
    { title: "الأنشطة", link: "/ar/services/activities" },
    {
      title: "البرامج التدريبية",
      link: "/ar/services/activities/TrainingPrograms",
    },
    {
      title: "تفاصيل البرنامج",
      link: "/ar/services/activities/TrainingPrograms/trainningDetails",
    },
  ];

  const { data } = useGetSingleCourseQuery({ id: params.trainningDetails });
  const course = data?.data;

  return (
    <div className="rounded-b-[14px] flex flex-col gap-2 container my-[50px]">
      <Breadcrumb items={breadcrumbData} />
      <div className="w-full h-[350px] relative overflow-hidden">
        {course?.photo?.url && (
          <Image
            className="w-full h-full rounded-[12px] object-cover"
            src={course.photo.url}
            alt={course.name}
            fill
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex justify-center items-center gap-3">
          {free && (
            <p className="bg-[#0198671A] rounded-[31px] py-2 px-4 text-[#019867] font-[500] text-[12px]">
              محتوي الاطفال
            </p>
          )}
          {free && (
            <p className="bg-[#FD2854] rounded-[31px] py-2 px-4 text-[#FFF] font-[500] text-[12px]">
              مجاني
            </p>
          )}
        </div>
        {course?.price && (
          <p className="text-[#001F15] text-[24px] font-[600]">
            {parseFloat(course.price).toFixed(2)} ر.س
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 flex flex-col gap-4">
          <p className="text-[24px] text-[#001F15] font-[600]">{course?.name}</p>

          <div className="flex justify-start items-center gap-4">
            <div className="flex justify-center items-center gap-1">
              <Image alt="icon" src={ic6} />
              <p>{course?.course_date}</p>
            </div>
            <div className="flex justify-center items-center gap-1">
              <Image alt="icon" src={ic6} />
              <p>
                {course?.starts_at} - {course?.ends_at}
              </p>
            </div>
            <div className="flex justify-center items-center gap-1">
              <Image alt="icon" src={ic6} />
              <p>{course?.address}</p>
            </div>
          </div>

          <p className="text-[18px] text-[#001F15] font-[600]">نبذة عن الفعالية</p>
          <p className="text-[16px] text-[#45534E] font-[400]">{course?.desc}</p>

          <p className="text-[18px] text-[#001F15] font-[600]">تفاصيل الدورة</p>
          <p className="text-[16px] text-[#45534E] font-[400]">{course?.details}</p>

          <p className="text-[18px] text-[#001F15] font-[600]">تفاصيل الشهادة</p>
          <div className="flex justify-start items-center gap-1">
            <PiMoneyWavy color="#019867" size={25} />
            <p className="text-[#001F15] text-[14px]">
              <span className="text-[#869791]">:رسوم الشهادة</span>{" "}
              {course?.certificate_fees} ر.س
            </p>
          </div>

          <div className="flex justify-start items-center gap-1">
            <LuAlarmClock color="#019867" size={25} />
            <p className="text-[14px] text-[#001F15]">
              <span className="text-[#869791]">:مدة الدورة</span>:{" "}
              {course?.training_period} شهور
            </p>
          </div>

          <Link
            href={`/ar/services/activities/TrainingPrograms/${
              params.trainningDetails == "0"
                ? "trainningAndPreparingFrom"
                : "trainningForm"
            }`}
            className="w-max"
          >
            <button className="bg-[#019867] text-[#FFF] mt-[16px] w-max rounded-[50px] py-2 px-[16px] text-[16px] font-[600]">
              تأكيد الاشتراك
            </button>
          </Link>
        </div>

        {/* <div className="flex flex-col justify-between mr-auto gap-[12px] w-[90%]">
          <div className="flex-grow">
            <AppointmentMap />
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-[#001F15] text-[16px] font-[600]">
              عيادة الجهاز الهضمي للبالغين
            </p>
            <p className="text-[#869791] text-[16px] font-[400]">
              حي الغدير, الرياض, شارع السيدة عائشة رضي الله عنها , عمارات الاتحاد , الدور الاول والثاني
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
