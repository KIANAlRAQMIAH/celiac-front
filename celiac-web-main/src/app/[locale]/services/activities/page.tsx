import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import HealthLibraryCard from '../../clinic/healthLibrary/_components/healthLibraryCard';

function Activities() {
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "الخدمات", link: "/ar/services" },
    { title: "الأنشطة", link: "/ar/services/activities" }
  ];
  return (

    <div className='container'>
      <Breadcrumb items={breadcrumbData} />
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 lg:grid-cols-3 lg:gap-8  mt-8 mb-20">

        <HealthLibraryCard title={"العلاج النفسي"} description={"  تقدم الجمعية ورش عمل وجلسات علاج جمعي خاصة بالعلاج النفسي مجانا ويشرف عليها اخصائي نفسي"} cardLink={"/ar/services/activities/Psychotherapy"} />
        <HealthLibraryCard title={"الفعاليـــــات"} description={"  تقدم الجمعية العديد من الفعاليات للبالغين والأطفال تتكون من بطاقات تمثل الفعاليات"} cardLink={"/ar/services/activities/events"} />
        <HealthLibraryCard title={"البرامج التدريبية"} description={' تقدم الجمعية برامج تدريبية )التدريب د الطهي / التدريب والتأهيل( وتتكون الصفحة من سكاشن '} cardLink={"/ar/services/activities/TrainingPrograms"} />
      </div>
    </div>
  )
}

export default Activities;
