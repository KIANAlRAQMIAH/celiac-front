import Breadcrumb from "@/components/Breadcrumb";
import AboutUsHeader from "./_components/AboutUsHeader";
import OurValues from "./_components/OurValues";
import { fetchAboutServerAction, fetchHomeServerAction } from "@/utils/actions";

export default async function AboutUs() {
  const AboutData = await fetchAboutServerAction()
  console.log(AboutData)
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "عن الجمعية", link: "/products" },
   ];
  return (

    <div className="  w-[100%]">

      <div className="bg-[#EEFEF9]  w-[100%]">
        <div className="container">
        <Breadcrumb items={breadcrumbData} />
        </div>
        <AboutUsHeader data={AboutData?.data} />
      </div>
      <div className="">
        <OurValues data={AboutData?.data} />
      </div>
    </div>
  );
}
