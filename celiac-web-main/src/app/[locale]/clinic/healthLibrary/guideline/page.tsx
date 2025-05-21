"use client"
import { useGetGuidanceManualQuery } from "@/api/Clinic/ClinicApiSlice"
import PdfComponent from "@/app/[locale]/aboutUs/boardMembers/_components/pdfComponent"
import Breadcrumb from "@/components/Breadcrumb"

function Guideline() {
  const { data, isLoading, isError } = useGetGuidanceManualQuery()
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data...</p>
  const fileType1 = data?.data?.filter((item: any) => item?.file_type === 1)
  const fileType2 = data?.data?.filter((item: any) => item?.file_type === 2)
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/en/clinic" },
    { title: "المكتبة الصحية", link: "/en/clinic/healthLibrary" },
    { title: "الدليل الاسترشادي", link: "/en/clinic/healthLibrary/guideline" },
  ];
  return (
    <>
      {/* <Breadcrumb titles={["الرئيسية","المكتبة الصحية","الدليل الاسترشادي"]} /> */}
      <div className="container">
        <Breadcrumb items={breadcrumbData} />
        {/* <h1 className="text-[24px] font-extrabold my-10 mt-20">الدليل الاسترشادي</h1> */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          {fileType1.map((item: any, index: number) => (
            <PdfComponent key={index} title={item?.title} size={item?.file?.size} />
          ))}
        </div>

        <h1 className="text-[24px] font-extrabold my-10">حساسية الجلوتين</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mb-36">
          {fileType2.map((item: any, index: number) => (
            <PdfComponent key={index} title={item.title} size={item?.file?.size} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Guideline
