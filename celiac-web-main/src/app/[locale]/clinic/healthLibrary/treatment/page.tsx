import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import { fetchAboutTreatmentServerAction } from "@/utils/actions";
async function Treatment() {
  const fetchAboutDisease = await fetchAboutTreatmentServerAction()
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/en/clinic" },
    { title: "المكتبة الصحية", link: "/en/clinic/healthLibrary" },
    { title: "العلاج", link: "/en/clinic/healthLibrary/treatment" },
  ];
  return (
    <div className="container my-10">
      <Breadcrumb items={breadcrumbData} />
      <div className="w-[100%] text-start">
        <h1 className="font-extrabold text-[#019867] my-4 lg:text-[24px]  sm:text-[16px]  md:text-[20px]">كيفية علاج مرض السليــــــــاك</h1>
        <Image width={100} height={100} src={fetchAboutDisease?.data?.image?.url} alt="globalInformationImg" className="w-[100%] rounded h-[350px] object-contain" />

        <div dangerouslySetInnerHTML={{ __html: fetchAboutDisease?.data?.text }} className="flex flex-col gap-2 my-3" />


      </div>
    </div>
  )
}

export default Treatment
