"use client"
import { useGetTranslatedBooksQuery } from '@/api/Clinic/ClinicApiSlice'
import PdfComponent from '@/app/[locale]/aboutUs/boardMembers/_components/pdfComponent'
import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'

function TranslatedBooks() {
  const { data, isLoading, isError } = useGetTranslatedBooksQuery()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error loading data</div>
  }
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/clinic" },
    { title: "المكتبة الصحية", link: "/clinic/healthLibrary" },
    { title: "الكتب المترجمة", link: "/clinic/healthLibrary/translatedBooks" },
  ];
  return (
    <>
      <div className='container mb-24'>

        <Breadcrumb items={breadcrumbData} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-10">
          {data?.data?.map((writer: any, index: number) => (
            <PdfComponent
              key={index}
              title={writer?.title}
              disc={writer?.description}
              writerName={writer?.author_name}
              publicationDate={writer?.publication_date}
              url={writer?.image?.url}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TranslatedBooks;
