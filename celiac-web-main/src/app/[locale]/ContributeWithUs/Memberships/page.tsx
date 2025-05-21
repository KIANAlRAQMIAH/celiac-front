import Breadcrumb from "@/components/Breadcrumb";
import { BiLayer } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import PackageCard from "./_components/packageCard";
import Link from "next/link";

function MediaCenter() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "ساهم معنا", link: "/ar/ContributeWithUs" },
        { title: "العضويات", link: "/ar/ContributeWithUs/Memberships" },
    ];
    return (
        <div className="bg-[#F9F7F7]" >
            <div className="container pb-[70px]">
                <Breadcrumb items={breadcrumbData} />
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 justify-between items-center  py-[35px]">
                    <div className="">
                        <h2 className="text-[#001F15] text-[24px] font-[600]">
                            مساهمتك تصنع الفرق لرفع مستوى توعية المجتمع بالمرض ويساهم بصنع الفارق في حياة المصابين
                        </h2>
                    </div>
                    <ul className="col-span-2 flex flex-col gap-2">
                        <li className="flex items-center gap-2"><FaCheck color="#019867" size={15} />نشر ثقافة التوعية</li>
                        <li className="flex items-center gap-2"><FaCheck color="#019867" size={15} />تحسين نوعية الحياة لمرض السلياك</li>
                        <li className="flex items-center gap-2"><FaCheck color="#019867" size={15} />نشر مستوى الوعي الصحي لدى المجتمع</li>
                        <li className="flex items-center gap-2"><FaCheck color="#019867" size={15} />تعزيز موارد دخل الجمعية بقيمة المساهمة السنوية من خلال العضوية</li>
                    </ul>
                </div>
            </div>
            <div className="bg-[#FFF]">
                <div className="container  gap-[24px]  translate-y-[-70px]">
                    <PackageCard withLink={true} />
                </div>

            </div>
        </div>
    );
}

export default MediaCenter;
