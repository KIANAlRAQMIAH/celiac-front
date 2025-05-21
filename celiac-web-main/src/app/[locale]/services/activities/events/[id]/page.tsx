import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import EventDetailsCard from './_components/eventDetailsCard';
import { useParams } from 'next/navigation';

function Page() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/en/services" },
        { title: "الأنشطة", link: "/en/services/activities" },
        { title: "الفاعليات", link: "/en/services/activities/events" }
    ];
    return (

        <div className="bg-[#FFF] py-8">
            <div className='container'>
                <Breadcrumb items={breadcrumbData} />
                <div className="">
                    <EventDetailsCard free={true}  />
                </div>
            </div>
        </div>
    )
}

export default Page;
