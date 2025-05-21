'use client'
import LatestHomeCard from '@/components/LatestNewsHome/LatestHomeCard';
import { Tabs } from '@mantine/core';
import { useState } from 'react';
import { FiFileText } from "react-icons/fi";
import { FiPlayCircle } from "react-icons/fi";
import PDFIcon from "../../../../../../../public/PDFIcon.svg"
import VideoCard from './VideoCard';
import Image from 'next/image';
import PdfComponent from '@/app/[locale]/aboutUs/boardMembers/_components/pdfComponent';
import { usePatientAwarenessQuery } from '@/api/Clinic/SocialGroupApiSlice';
import ArticlesCard from './articelsCard';
import Pdfs from './pdfs';
function TabsPatientAwareness() {
  const [activeTab, setActiveTab] = useState("gallery");
  const [contentType, setContentType] = useState('');
  //@ts-ignore
  const { data, isLoading, isError, isSuccess } = usePatientAwarenessQuery(contentType);
  const handleTabClick = (value: string) => {
    setActiveTab(value);
    if (value == "gallery") {
      setContentType('')
    } else if (value == "messages") {
      setContentType('2')
    } else {
      setContentType('1')
    }
  };
  return (
    <Tabs radius="xs" defaultValue="gallery" variant="pills" color="transparent">
      <Tabs.List className='patientAwareness flex flex-wrap gap-7'>
        <Tabs.Tab
          value="gallery"
          className={
            activeTab === "gallery"
              ? "text-black  text-center text-sm md:text-base lg:text-lg xl:text-xl  font-extrabold border-[#17A174] border-b-2 border-solid  transition-all ease duration-500  "
              : "text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl"
          }
          onClick={() => handleTabClick("gallery")}
        >
          <p >   التوعيه الخاصة بكل المرضي من البالغين والاطفال</p>
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          className={
            activeTab === "messages"
              ? "text-black text-center text-sm md:text-base lg:text-lg xl:text-xl  font-extrabold  border-[#17A174] border-b-2 border-solid transition-all ease duration-500"
              : "text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl "
          }
          onClick={() => handleTabClick("messages")}
        >
          التوعية الخاصة بالمرضي الاطفال
        </Tabs.Tab>
        <Tabs.Tab
          value="settings"
          className={
            activeTab === "settings"
              ? "text-black text-center text-sm md:text-base lg:text-lg xl:text-xl font-extrabold  border-[#17A174] border-b-2 border-solid transition-all ease duration-500 "
              : "text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl"
          }
          onClick={() => handleTabClick("settings")}
        >
          التوعية الخاصة بالمرضي البالغين
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="gallery">

        <div className='flex flex-col gap-4 w-full  justify-start items-start text-[#9A9A3A] mt-10 mb-5'>
          <div className="flex justify-start items-start gap-1 w-full">
            <FiFileText size={30} />
            <h1 className='text-[24px] font-semibold'>المقالات التوعوية</h1>
          </div>

          <ArticlesCard data={isSuccess && data?.data} />
        </div>
        <div className='flex gap-4 justify-start items-center text-[#9A9A3A] mt-10 mb-5'>
          <FiPlayCircle size={30} />
          <h1 className='text-[24px] font-semibold'>الفيديوهات التوعوية</h1>
        </div>
        <VideoCard data={isSuccess && data?.data} />
        <div className='flex gap-4 justify-start items-center text-[#9A9A3A] mt-10 mb-5'>
          <Image src={PDFIcon} alt='PDFIcon' width={25} height={25} />
          <h1 className='text-[24px] font-semibold'>ملفات pdf</h1>
        </div>
        <Pdfs data={isSuccess && data?.data} title='حمـلة توعـوية بالتعاون مع مستشفي الامام عبد الرحمن الفيصل' size='12 MB' />
      </Tabs.Panel>
      <Tabs.Panel value="messages">
        <div className='flex flex-col gap-4 w-full  justify-start items-start text-[#9A9A3A] mt-10 mb-5'>
          <div className="flex justify-start items-start gap-1 w-full">
            <FiFileText size={30} />
            <h1 className='text-[24px] font-semibold'>المقالات التوعوية</h1>
          </div>

          <ArticlesCard data={isSuccess && data?.data} />
        </div>
        <div className='flex gap-4 justify-start items-center text-[#9A9A3A] mt-10 mb-5'>
          <FiPlayCircle size={30} />
          <h1 className='text-[24px] font-semibold'>الفيديوهات التوعوية</h1>
        </div>
        <VideoCard data={isSuccess && data?.data} />
        <div className='flex gap-4 justify-start items-center text-[#9A9A3A] mt-10 mb-5'>
          <Image src={PDFIcon} alt='PDFIcon' width={25} height={25} />
          <h1 className='text-[24px] font-semibold'>ملفات pdf</h1>
        </div>
        <Pdfs data={isSuccess && data?.data} title='حمـلة توعـوية بالتعاون مع مستشفي الامام عبد الرحمن الفيصل' size='12 MB' />
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <div className='flex flex-col gap-4 w-full  justify-start items-start text-[#9A9A3A] mt-10 mb-5'>
          <div className="flex justify-start items-start gap-1 w-full">
            <FiFileText size={30} />
            <h1 className='text-[24px] font-semibold'>المقالات التوعوية</h1>
          </div>

          <ArticlesCard data={isSuccess && data?.data} />
        </div>
        <div className='flex gap-4 justify-start items-center text-[#9A9A3A] mt-10 mb-5'>
          <FiPlayCircle size={30} />
          <h1 className='text-[24px] font-semibold'>الفيديوهات التوعوية</h1>
        </div>
        <VideoCard data={isSuccess && data?.data} />
        <div className='flex gap-4 justify-start items-center text-[#9A9A3A] mt-10 mb-5'>
          <Image src={PDFIcon} alt='PDFIcon' width={25} height={25} />
          <h1 className='text-[24px] font-semibold'>ملفات pdf</h1>
        </div>
        <Pdfs data={isSuccess && data?.data} title='حمـلة توعـوية بالتعاون مع مستشفي الامام عبد الرحمن الفيصل' size='12 MB' />
      </Tabs.Panel>
    </Tabs>
  );
}
export default TabsPatientAwareness