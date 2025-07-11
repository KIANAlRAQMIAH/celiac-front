import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";
import celiacCard from '../../../../../public/celiac-card.png'
import hajjImg from '../../../../../public/hajj.png'
import CeliacCardForm from "../_components/celiacCardForm";
import CeliacForm from "@/components/celiacCard/CeliacCardForm";
import HajjForm from "./_components/hajjtForm";
export default function Hajj() {
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/ar/services" },
        { title: "الحج", link: "/ar/services/hajj" }
    ];
    return (
        <div className="">
            <div className="bg-[#FAFAEF]">
                <div className=" container mx-0">
                    <Breadcrumb items={breadcrumbData} />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 justify-between items-center mb-[10px]">
                        <div className="">
                            <h2 className="text-[#001F15] text-[24px] font-[600]">
                            هل تشعر بالقلق من أداء مناسك الحج أو العمرة بسبب صعوبة توفر الطعام المناسب لك كمصاب بالسلياك؟
                            </h2>
                            <div className="text-[#45534E] text-[16px] font-[500]">جمعية السلياك تفهم تمامًا احتياجاتك، وتسعى من خلال خدمة مخصصة للحجاج الداخل والخارج المصابين بمرض السلياك إلى دعمكم خلال فترة أداء الشعائر.
حيث نعمل على توفير وجبات غذائية خالية من الجلوتين مجانًا طيلة فترة الحج، ونتكفل بتأمين كافة الاحتياجات الغذائية لضمان راحتكم وسلامتكم الصحية.
نحن معكم في رحلتكم الإيمانية… لتكون خالية من المشكلات، وآمنة غذائيًا.</div>
                        </div>
                        <div className="flex justify-center items-center">
                            {/* <div className="bg-[#019867] w-[379px] h-[379px] rounded-[50%] pt-[30px] overflow-hidden"> */}
                            <Image className="w-full h-full object-contain max-h-[400px]" src={hajjImg} alt=".." />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container flex flex-col w-full my-[50px] justify-center items-center">
                <h2 className="text-[#001F15] text-[24px] font-[600] ">املأ النموذج أدناه للحصول على الخدمات المقدمة لمرضى السلياك خلال موسم الحج</h2>
                <HajjForm />
            </div>

        </div>
    );
}
