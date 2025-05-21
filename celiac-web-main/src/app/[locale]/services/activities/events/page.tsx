import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import EventCard from './_components/eventCard';

function Page() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/ar/services" },
        { title: "الأنشطة", link: "/ar/services/activities" },
        { title: "الفاعليات", link: "/ar/services/activities/events" }
    ];
    return (

        <div className="bg-[#F7F8FA] py-8">
            <div className='container'>
                <Breadcrumb items={breadcrumbData} />
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 lg:grid-cols-3 lg:gap-8 ">
                    <EventCard />
                </div>
            </div>
        </div>
    )
}

export default Page;
