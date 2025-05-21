import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import RecrutementForm from "./_components/recrutementForm";
export default function Recrutement() {
  const t = useTranslations("Index");
  const breadcrumbData = [
    { title: "الرئيسية", link: "/en" },
    { title: "الخدمات", link: "/en/services" },
    { title: "بطاقة سلياكي", link: "/en/services/recrutment" }
  ];
  return (
    <div className="">
      <div className="bg-[#F4F9F7]">
        <div className=" container mx-auto pb-[50px]">
          <Breadcrumb items={breadcrumbData} />


          <div className=" container flex flex-col w-full  justify-center items-center">
            <h2 className="text-[#001F15] text-[20px] font-[600] ">خدمة التــــــوظيف</h2>
            <h2 className="text-[#001F15] text-[16px] font-[600] mb-5 ">أملئ الفورم الموجودة بالاسفل لطلب الحصول على بطاقة سلياكي</h2>
            <RecrutementForm />
          </div>
        </div>
      </div>

    </div>
  );
}
