import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";
import hajjImg from '../../../../../public/sha.png'
import PackageCard from "../Memberships/_components/packageCard";
import Link from "next/link";
import { BiLayer } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { useGetStrategicPartnershipsQuery } from "@/api/CommitteeApiSlice";
import Cards from "./cards";
export default function StrategicPartnerships() {//@ts-ignore
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "ساهم معنا", link: "/ar/ContributeWithUs" },
        { title: "الشراكات الاستراتيجية", link: "/ar/ContributeWithUs/StrategicPartnerships" },
    ];
    return (
        <div className="">
            <div className="bg-[#FAFAEF]  pb-[120px]">
                <div className=" container mx-0">
                    <Breadcrumb items={breadcrumbData} />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 justify-between items-center">
                        <div className="">
                            <h2 className="text-[#001F15] text-[24px] font-[600]">
                                عملنا على توفير خدمة الشراكات الاستراتيجية لعموم النفع والفائدة على الجميع                            </h2>
                            <div className="text-[#45534E] text-[16px] font-[500]">جمعية السلياك تسعي لتوفير خدمة خدمة الشراكات الاستراتيجية لحصول جميع الاطراف على المنافع المشتركة ونحن نعمل سويا من اجل راحة مصابي السلياك لنمضي فى طريق الحفاظ على صحتنا .  </div>
                        </div>
                        <div className="flex justify-center items-center">
                            {/* <div className="bg-[#019867] w-[379px] h-[379px] rounded-[50%] pt-[30px] overflow-hidden"> */}
                            <Image className="w-full h-full object-contain max-h-[250px]" src={hajjImg} alt=".." />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#FFF] container">
                <Cards />
            </div>
        </div>
    );
}
