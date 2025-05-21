import Image from "next/image";
import globalInformationImg from "../../../../../../public/GlobalInformationImg.png";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchAboutDiseaseServerAction } from "@/utils/actions";
async function Globalinformation() {
  const fetchAboutDisease = await fetchAboutDiseaseServerAction()
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/ar/clinic" },
    { title: "المكتبة الصحية", link: "/ar/clinic/healthLibrary" },
    { title: "معلومات عامة عن المرض", link: "/ar/clinic/healthLibrary/globaLInformation" },
  ];
  return (
    <div className="container my-10">
      <Breadcrumb items={breadcrumbData} />
      <div className="w-[100%] text-start">
        <h1 className="font-extrabold text-[#019867] my-4 lg:text-[24px]  sm:text-[16px]  md:text-[20px]">السليــــــــاك</h1>
        <Image src={fetchAboutDisease?.data?.image?.url} height={100} width={100} alt="globalInformationImg" className="w-[100%] rounded h-[350px] object-cover" />
        <div dangerouslySetInnerHTML={{ __html: fetchAboutDisease?.data?.text }} className="flex flex-col gap-2 my-3" />
      </div>
    </div>
  )
}

export default Globalinformation
