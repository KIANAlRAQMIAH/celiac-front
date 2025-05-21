"use client"
import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image';
import PsychotherapyDetails from './_components/eventCard';
import { useGetAllSessionsQuery } from '@/api/serveces';

function Psychotherapy() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/en/services" },
        { title: "الأنشطة", link: "/en/services/activities" },
        { title: "العلاج النفسي", link: "/en/services/activities/Psychotherapy" }
    ];

    const {data} = useGetAllSessionsQuery()
    console.log(data?.data, 'seeeeee')
    return (

        <div className="bg-[#F7F8FA] pb-8">
            <div className='container'>
                <Breadcrumb items={breadcrumbData} />
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 lg:grid-cols-3 lg:gap-8 ">
                    {data?.data?.map((session:any) =>{
 return (<>
 <PsychotherapyDetails session={session} /></>)
                    
                    })}
                    {/* <PsychotherapyDetails free={true} />
                    <PsychotherapyDetails free={true} />
                    <PsychotherapyDetails free={false} />
                    <PsychotherapyDetails free={false} />
                    <PsychotherapyDetails free={false} /> */}
                </div>
            </div>
        </div>
    )
}

export default Psychotherapy;
