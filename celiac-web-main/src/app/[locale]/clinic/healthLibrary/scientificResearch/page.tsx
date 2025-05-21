"use client"
import { useGetScientificResearchesQuery } from '@/api/Clinic/ClinicApiSlice'
import PdfComponent from '@/app/[locale]/aboutUs/boardMembers/_components/pdfComponent'
import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'

function ScientificResearch() {
  const { data, isLoading, isError } = useGetScientificResearchesQuery()
  if (isLoading) {
    return <div>Loading...</div>
  }
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/ar/clinic" },
    { title: "المكتبة الصحية", link: "/ar/clinic/healthLibrary" },
    { title: "الابحاث العلمية", link: "/ar/clinic/healthLibrary/scientificResearch" },
  ];
  if (isError) {
    return <div>Error loading data</div>
  }

  return (
    <>
      <div className='container mb-24'>

        <Breadcrumb items={breadcrumbData} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-10">
          {data?.data?.map((research: any, index: number) => (
            <PdfComponent
              key={index}
              title={research?.title}
              disc={research?.description}
              researcherName={research?.author_name}
              publicationDate={research?.publication_date}
              url={research?.file?.url}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ScientificResearch
