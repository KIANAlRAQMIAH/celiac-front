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

        <HealthLibraryCard title={"الأبحــــاث العلمية"} description={"تحتوي على دراسات وأبحاث علمية محكّمة تتعلق بمرض السلياك، تشمل آخر ما توصل إليه الطب من نتائج وابتكارات في التشخيص والعلاج والتعامل الغذائي."} cardLink={"/ar/clinic/healthLibrary/scientificResearch"} />
        <HealthLibraryCard title={"العــــلاج"} description={"هنا تجد العلاجات المتوفرة لمرض السلياك وتم اتخاذ هذة المعلومات من المعمل الصحي بالمملكة الخاص بمرضي السلياك عن طريق افضل الاطباء"} cardLink={"/ar/clinic/healthLibrary/treatment"} />
        <HealthLibraryCard title={"معلومات عامة عن المرض"} description={'تقدم شرحًا مبسطًا وشاملًا حول مرض السلياك، يشمل التعريف بالمرض، أسبابه، أعراضه، طرق التشخيص، والمضاعفات المحتملة'} cardLink={"/ar/clinic/healthLibrary/globaLInformation"} />
        <HealthLibraryCard title={"الدليل الاسترشادي"} description={'يُساعد مرضى السلياك على فهم خطوات وآلية التقديم للاستفادة من برامج الدعم المتاحة'} cardLink={'/ar/clinic/healthLibrary/guideline'} />
        <HealthLibraryCard title={"قسم توعية المرضي"} description={'هنا تجد العلاجات المتوفرة لمرض السلياك وتم اتخاذ هذة المعلومات من المعمل الصحي بالمملكة الخاص بمرضي السلياك عن طريق افضل الاطباء'} cardLink={'/ar/clinic/healthLibrary/patientAwareness'} />
        <HealthLibraryCard title={'الكتب المترجمة'} description={'توفر نسخًا مترجمة إلى اللغة العربية من كتب ومراجع علمية موثوقة تتناول الجوانب المختلفة لمرض السلياك، مما يسهم في تعزيز المعرفة الطبية لدى القارئ العربي'} cardLink={'/ar/clinic/healthLibrary/translatedBooks'} />
        <HealthLibraryCard title={'الأسئلة الشائعة'} description={'تتضمن مجموعة من الأسئلة المتكررة التي يطرحها المرضى وأسرهم، مع إجابات موثوقة ومبسطة تساعد على إزالة اللبس وتقديم المعلومات بشكل مباشر'} cardLink={'/ar/clinic/healthLibrary/commonQuestions'} />

      </div>
    </div>
  )
}

export default HealthLibrary
