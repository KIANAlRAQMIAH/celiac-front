import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import VolunteershipForm from "./_components/VolunteerForm";
export default function Volunteer() {
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "ساهم معنا", link: "/ar/ContributeWithUs" },
        { title: "التطوع", link: "/ar/ContributeWithUs/Volunteer" },
    ];
    return (
        <div className="">
            <div className="bg-[#F4F9F7]">
                <div className=" container mx-auto pb-[50px]">
                    <Breadcrumb items={breadcrumbData} />
                    <div className=" container flex flex-col w-full  justify-center items-center">
                        {/* <h2 className="text-[#001F15] text-[20px] font-[600] ">خدمة التــــــوظيف</h2> */}
                        <h2 className="text-[#001F15] text-[16px] font-[600] mb-5 ">ادخل البيانات التالية لتأكيد انضمامك فى العضوية الفخرية</h2>
                        <VolunteershipForm />
                    </div>
                </div>
            </div>

        </div>
    );
}
