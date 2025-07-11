import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import CeliacForm from "@/components/celiacCard/CeliacCardForm";
import FoodBasketsForm from "./_components/foodBasketForm";
export default function FoodBaskets() {
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/en" },
        { title: "الخدمات", link: "/ar/services" },
        { title: "السلال الغذائية", link: "/ar/services/foodBaskets" }
    ];
    return (
        <div className="">
            <div className="bg-[#F4F9F7]">
                <div className=" container mx-auto pb-[50px]">
                    <Breadcrumb items={breadcrumbData} />


                    <div className=" container flex flex-col w-full  justify-center items-center">
                    <h2 className="text-[#001F15] text-[20px] font-[600] ">السلة الغذائية</h2>
                    <h2 className="text-[#444444] text-[16px] font-[300] mb-5 ">املا النموذج ادناه للتقديم على السلة الغذائية الخالية من الجلوتين</h2>
                        <FoodBasketsForm />
                    </div>
                </div>
            </div>

        </div>
    );
}
