import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import DonationCard from "./_components/donationCard";
export default function Donation() {
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "ساهم معنا", link: "/ar/ContributeWithUs" },
        { title: "التبرع", link: "/ar/ContributeWithUs/donation" },
    ];
    return (
        <div className="mt-[64px]">
            <div className="bg-[#FAFAEF]  pb-[120px]">
                <div className=" container mx-auto">
                    <Breadcrumb items={breadcrumbData} />
                    <DonationCard />
                </div>
            </div>
        </div>
    );
}
