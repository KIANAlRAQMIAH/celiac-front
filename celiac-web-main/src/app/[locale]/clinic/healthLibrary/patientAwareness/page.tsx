"use client"
import Breadcrumb from "@/components/Breadcrumb"
import TabsPatientAwareness from "./_components/TabsPatientAwareness"


function patientAwareness() {
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/ar/clinic" },
    { title: "المكتبة الصحية", link: "/ar/clinic/healthLibrary" },
    { title: "توعية المرضي", link: "/ar/clinic/healthLibrary/patientAwareness" },
  ];
  return (
    <div className="container">
      <Breadcrumb items={breadcrumbData} />
      <h1 className="mt-[30px]   text-[24px] font-bold">توعية المرضي المصابين بالسلياك</h1>
      <p className="text-[16px] mt-[15px] text-gray-500 lg:w-[50%] md:w-[70%]">هنا نقوم بعرض جميع المعلومات التوعوية للمرضي من البالغين والاطفال بجميع الاشكال فيديوهات, مقالات, ملفات pdf  فنحن نسعي لتوصيل المعلومات بشكل سليم وصحيح لجميع افراد المجتمع من المصابين وعوائلهم .</p>
      <TabsPatientAwareness />
    </div>
  )
}

export default patientAwareness
