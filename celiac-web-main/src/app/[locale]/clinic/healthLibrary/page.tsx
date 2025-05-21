import React from 'react'
import HealthLibraryCard from './_components/healthLibraryCard'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'

function HealthLibrary() {
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/ar/clinic" },
    { title: "المكتبة الصحية", link: "/ar/clinic/healthLibrary" },
  ];
  return (

    <div className='container'>
      <Breadcrumb items={breadcrumbData} />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 lg:grid-cols-3 lg:gap-8  mt-8 mb-20">

        <HealthLibraryCard title={"الأبحــــاث العلمية"} description={"نعرض عليكم جميع الابحاث العلمية التى تم اجراؤها لمرض السلياك وطرق الوقاية منه , وكيفية التعامل مع مصابي السلياك من الاطفال والبالغين"} cardLink={"/ar/clinic/healthLibrary/scientificResearch"} />
        <HealthLibraryCard title={"العــــلاج"} description={"هنا تجد العلاجات المتوفرة لمرض السلياك وتم اتخاذ هذة المعلومات من المعمل الصحي بالمملكة الخاص بمرضي السلياك عن طريق افضل الاطباء"} cardLink={"/ar/clinic/healthLibrary/treatment"} />
        <HealthLibraryCard title={"معلومات عامة عن المرض"} description={'نعرض عليكم معلومات عامة عن مرض السلياكوطرق الوقاية منه وطرق التعامل مع مصابي السليك وتجنب دخولهم فى اي من المشاكل الممكنة'} cardLink={"/ar/clinic/healthLibrary/globaLInformation"} />
        <HealthLibraryCard title={"الدليل الاسترشادي"} description={'هنا تجد العلاجات المتوفرة لمرض السلياك وتم اتخاذ هذة المعلومات من المعمل الصحي بالمملكة الخاص بمرضي السلياك عن طريق افضل الاطباء'} cardLink={'/ar/clinic/healthLibrary/guideline'} />
        <HealthLibraryCard title={"قسم توعية المرضي"} description={'هنا تجد العلاجات المتوفرة لمرض السلياك وتم اتخاذ هذة المعلومات من المعمل الصحي بالمملكة الخاص بمرضي السلياك عن طريق افضل الاطباء'} cardLink={'/ar/clinic/healthLibrary/patientAwareness'} />
        <HealthLibraryCard title={'الكتب المترجمة'} description={'هنا مجموعة من الكتب الخاصة بمرض السلياك وطرق الوقاية منه .... تجدون عدد من الكتب بأكثر من لغة لتوصيل استفادة شاملة قدر المستطاع'} cardLink={'/ar/clinic/healthLibrary/translatedBooks'} />
        <HealthLibraryCard title={'الأسئلة الشائعة'} description={'وفرنا لك عدد من الاسالة التى يمكن لك ان تحتاجها فيما يخص كل الاجابات الخاصة بمرض السلياك يمكنك الاطلاع عليها والحصول على كل الاجابابت الازمة'} cardLink={'/ar/clinic/healthLibrary/commonQuestions'} />

      </div>
    </div>
  )
}

export default HealthLibrary
