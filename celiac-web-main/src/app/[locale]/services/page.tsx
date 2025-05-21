import { useTranslations } from "next-intl";
import AllServices from "./_components/allServices";
import Breadcrumb from "@/components/Breadcrumb";
export default function Services() {
  const t = useTranslations("Index");
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "الخدمات", link: "/services" },
  ];
  return (
    <div className="container pb-[50px]">
      <Breadcrumb items={breadcrumbData} />
      <AllServices />
    </div>
  );
}
