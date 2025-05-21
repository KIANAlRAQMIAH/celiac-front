import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import CeliacForm from "@/components/celiacCard/CeliacCardForm";
import MembershipForm from "../_components/membershipForm";
export default function JoinMembership() {
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "ساهم معنا", link: "/ar/ContributeWithUs" },
        { title: "العضويات", link: "/ar/ContributeWithUs/Memberships" },
        { title: "الانضمام الى العضوية", link: "/ar/ContributeWithUs/Memberships/joinMembership" },
    ];
    return (
        <div className="">
            <div className="bg-[#F4F9F7]">
                <div className=" container mx-0 pb-[50px]">
                    <Breadcrumb items={breadcrumbData} />


                    <div className=" container flex flex-col w-full  justify-center items-center">
                        {/* <h2 className="text-[#001F15] text-[20px] font-[600] ">خدمة التــــــوظيف</h2> */}
                        <h2 className="text-[#001F15] text-[16px] font-[600] mb-5 ">ادخل البيانات التالية لتأكيد انضمامك فى العضوية الفخرية</h2>
                        <MembershipForm />
                    </div>
                </div>
            </div>

        </div>
    );
}
