import Breadcrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";
import CeliacForm from "@/components/celiacCard/CeliacCardForm";
import FoodBasketsForm from "./_components/foodBasketForm";
export default function FoodBaskets() {
    const t = useTranslations("Index");
    const breadcrumbData = [
        { title: "الرئيسية", link: "/en" },
        { title: "الخدمات", link: "/en/services" },
        { title: "السلال الغذائية", link: "/en/services/foodBaskets" }
    ];
    return (
        <div className="">
            <div className="bg-[#F4F9F7]">
                <div className=" container mx-auto pb-[50px]">
                    <Breadcrumb items={breadcrumbData} />


                    <div className=" container flex flex-col w-full  justify-center items-center">
                       
                        <FoodBasketsForm />
                    </div>
                </div>
            </div>

        </div>
    );
}
