"use client"
import { useEffect, useState } from 'react';
import { Divider } from '@mantine/core';
import GovAndTransCard from './_components/GovAndTransCard';
import Breadcrumb from '@/components/Breadcrumb';
import PdfComponent from '../boardMembers/_components/pdfComponent';
import { useGetGovAndTransQuery } from '@/api/AboutUsApiSlice';

interface File {
  id: number;
  name: string;
  files_count: string;
  files: Pdf[];
}

interface Pdf {
  id: number;
  name: string;
  size: string;
  url: string;
}

function GovAndTrans() {
  const { data, isLoading, isError } = useGetGovAndTransQuery();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string | null>(null);

  const handleCardClick = (id: number, name: string) => {
    setSelectedCardId(id);
    setSelectedCardName(name);
  };

  useEffect(() => {
    if (data?.data?.length > 0) {
      const defaultCard = data.data.find((card: File) => card.name === "القوائم المالية");
      const defaultId = defaultCard ? defaultCard.id : data.data[0].id;
      const defaultName = defaultCard ? defaultCard.name : data.data[0].name;
      setSelectedCardId(defaultId);
      setSelectedCardName(defaultName);
    }
  }, [data]);

  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "الحوكمة والشفافية", link: "#" },
  ];

  return (
    <>
      <div className='container flex flex-col'>
        <Breadcrumb items={breadcrumbData} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 my-5">
          {isLoading ? (
            <div>
              ...Loading
            </div>
          ) : isError ? (
            <div>
              Error fetching data
            </div>
          ) : (
            data?.data?.map((file: File) => (
              <div
                key={file.id}
                onClick={() => handleCardClick(file.id, file.name)}
              >
                <GovAndTransCard
                  title={file.name}
                  filesNumber={file.files_count}
                  id={file.id}
                />
              </div>
            ))
          )}
        </div>
        {selectedCardId && (
          <>
            <Divider my="xs" label={selectedCardName} labelPosition="left" />

            
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-5 mb-32">
              {data?.data
                .filter((file: File) => file.id === selectedCardId)
                .map((file: File) => (
                  file.files.map((pdf: Pdf) => (
                    <PdfComponent
                      key={pdf.id}
                      title={pdf?.name}
                      size={pdf?.size}
                      url={pdf?.url}
                    />
                  ))
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GovAndTrans;
