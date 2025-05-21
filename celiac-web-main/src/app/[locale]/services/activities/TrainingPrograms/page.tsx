"use client"
import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";
import prog2 from '../../../../../../public/prog2.png'
import TrainningProgCard from "./_components/TrainningProgCard";
import { useGetAllCoursesQuery } from "@/api/serveces";

export default function TrainingPrograms() {
    const {data} = useGetAllCoursesQuery()
    // const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/en/services" },
        { title: "الأنشطة", link: "/en/services/activities" },
        { title: "البرامج التدريبية", link: "/en/services/activities/TrainingPrograms" },
        { title: "تفاصيل البرنامج", link: "/en/services/activities/TrainingPrograms/TrainingProgramDetails" }
    ];
    console.log("data", data)
    return (
        <div className="">
            <div className="bg-[#FAFAEF]">
                <div className=" container mx-0">
                    <Breadcrumb items={breadcrumbData} />
                    <div className="grid grid-cols-2 gap-4 justify-between items-center ">
                        <div className="">
                            <h2 className="text-[#001F15] text-[24px] font-[600]">
                                خدمة البرامج التدريبية
                            </h2>
                            <div className="text-[#45534E] text-[16px] font-[500]">جمعية السلياك تسعي لتقديم خدمات تدريبية لتعليم الطهى والتأهيل لعمل جميع المأكولات الصحية المناسبة لمرضي السلياك بحيث يصبح المويض قادر على الاعتناء بصحته وتناول الوجبات الخالية من الجولتين فى اي وقت يريده . ... جمعية السلياك تسعي لتقديم خدمات تدريبية لتعليم الطهى والتأهيل لعمل جميع المأكولات الصحية المناسبة لمرضي السلياك بحيث يصبح المويض قادر على الاعتناء بصحته وتناول الوجبات الخالية من الجولتين فى اي وقت يريده .</div>
                        </div>
                        <div className="flex justify-center items-center">
                            {/* <div className="bg-[#019867] w-[379px] h-[379px] rounded-[50%] pt-[30px] overflow-hidden"> */}
                            <Image className="w-full h-full object-contain ms-auto max-h-[400px]" src={prog2} alt=".." />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container py-[50px] bg-[#F7F8FA]">
                <div className="">
                    <h2 className="text-[#001F15] text-[24px] font-[600]">
                        المحاضرات المقبلة
                    </h2>
                    <div className="text-[#45534E] text-[16px] font-[500] max-w-[400px]">نعرض عليكم المحاضرات المقبلة من ورش العمل التى تم العمل على وجودها لتعليم فنون الطهي لمصابي السلياك وعوائلهم .</div>
                </div>
                <div className="grid grid-cols-1 mt-[30px] md:grid-cols-2  gap-4 lg:grid-cols-3 lg:gap-8 ">
                   {data?.data?.map((course:any) =>{
                        return (
                            <TrainningProgCard key={course.id} formURL='/en/services/activities/TrainingPrograms/0' progType={course.type_label === "Training Course" ? "التدريب والتأهيل":"التدريب علي الطهي"} free={Math.round(course?.price) === 0 ?true:false} course={course} />
                        )
                   })}
                   
                  
                </div>
            </div>
        </div>
    );
}
