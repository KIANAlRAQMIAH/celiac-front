import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import PsychotherapyDetailsCard from './_components/PsychotherapyDetailsCard';

function Psychotherapy() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/en/services" },
        { title: "الأنشطة", link: "/en/services/activities" },
        { title: "العلاج النفسي", link: "/en/services/activities/Psychotherapy" }
    ];
    return (

        <div className="bg-[#FFF] pb-8">
            <div className='container'>
                <Breadcrumb items={breadcrumbData} />
                <div className="">
                    <PsychotherapyDetailsCard free={true} />
                </div>
            </div>
        </div>
    )
}

export default Psychotherapy;
