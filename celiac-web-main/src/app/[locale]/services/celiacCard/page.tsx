import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";
import celiacCard from '../../../../../public/celiac-card.png'
import tickedImg from '../../../../../public/ticketimg.png'
import CeliacCardForm from "../_components/celiacCardForm";
import CeliacForm from "@/components/celiacCard/CeliacCardForm";
export default function CeliacCard() {
  const t = useTranslations("Index");
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "الخدمات", link: "/en/services" },
    { title: "بطاقة سلياكي", link: "/en/services/celiacCard" }
  ];
  return (
    <div className="">
      <div className="bg-[#F4F9F7] md:pb-0 pb-[15px]">
        <div className=" container mx-auto">
          <Breadcrumb items={breadcrumbData} />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 justify-between items-center mb-[10px]">
            <div className="">
              <h2 className="text-[#019867] text-[24px] font-[600]">
                بطاقــة السليــــــــاكي
              </h2>
              <div className="text-[#45534E] text-[16px] font-[500]">هي بطاقة نشرف على انشائها حيث يمكن لمريض السلياك من خلالها الحصول على الخصومات الكبيرة على المتاجر التى تنتج المنتجات الخالية من الجلوتين للمساهمه فى العيش عيشة حرية وخالية من المشكلات ..... تقدم بطلب للحصول على بطاقة السلياكي الآن حتي تحصل على الخصومات الكبيرة فى اقرب فترة ممكنة وتناول الاطعمة الصحية والغير مضرة .</div>
            </div>
            <div className="flex d:justify-end justify-center items-center">
              <div className="bg-[#019867] md:w-[379px] w-[320px] md:h-[379px] h-[320px] rounded-[50%] pt-[30px] overflow-hidden">
                <Image className="w-full h-full object-contain" src={celiacCard} alt=".." />
              </div>
            </div>
          </div>
          <div className="bg-[#FFF] md:w-[80%] w-[100%] mx-auto shadow-lg rounded-[10px] p-[24px] grid md:grid-cols-2 grid-cols-1 gap-4 justify-between  md:translate-y-[50%] translate-y-[0] items-center">
            <div className="flex flex-col gap-2">
              <p className="text-[20px] font-[500] text-[#000000] ">
                حرصا منا على سلامتك قمنا بتوفير قائمة بالمتاجر والمختبرات و العيادات التي تدعم بطاقة سلياكي
              </p>
              <button className="w-max bg-[#019867] text-[#FFF] rounded-[50px] py-[14px] px-[24px]">اعرض الآن</button>
            </div>
            <Image src={tickedImg} className="w-full h-[168px] mx-auto object-contain" alt=".." />
          </div>
        </div>
      </div>
      <div className="md:pt-[150px] pt-[25px] container flex flex-col w-full mb-[50px] justify-center items-center">
        <h2 className="text-[#001F15] text-[24px] font-[600] ">أملئ الفورم الموجودة بالاسفل لطلب الحصول على بطاقة سلياكي</h2>
        <CeliacCardForm />
      </div>

    </div>
  );
}
