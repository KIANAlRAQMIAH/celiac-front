"use client"
import { Tabs } from "@mantine/core";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import CustomButtonIcon from "../customButtonIcon";
import "../MiddleHome.css";
import { useGetHomePageQuery } from "@/api/HomeApiSlice";
import { Carousel } from "@mantine/carousel";
import Autoplay from 'embla-carousel-autoplay';

function PartenersHome() {
 const autoplay = useRef(Autoplay({ delay: 2000 }));
 const [activeTab, setActiveTab] = useState("tab-1"); 
 const { data, isLoading }: any = useGetHomePageQuery();

 const handleTabClick = (value: string) => {
    setActiveTab(value);
 };

 useEffect(() => {
    setActiveTab("tab-1");
 }, []);

 if (isLoading || !data) {
  return <div>Loading...</div>; 
 }
 

 return (
    <div className="container gap-[12px] w-[100%] justify-center items-center my-20 border-none ">
      <div className="mx-auto w-max mb-[20px]">
        <CustomButtonIcon title='الشركاء الاستراتيجين' />
      </div>
      <Tabs radius="lg" variant="transparent" value={activeTab}>
        <Tabs.List className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 w-[100%]">
          {data?.partner_groups.map((group: any, index: number) => (
            <Tabs.Tab
              key={index}
              value={`tab-${index}`}
              style={{ fontSize: "20px" }}
              className={
                activeTab === `tab-${index}`
                 ? "text-black text-center scale-90 font-extrabold border-[#17A174] border-b-2 border-solid transition-all ease duration-500"
                 : "text-gray-400"
              }
              onClick={() => handleTabClick(`tab-${index}`)}
            >
              {group.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <div className="w-[100%] mt-10">
          {data?.partner_groups.map((group: any, index: number) => (
            <Tabs.Panel key={index} value={`tab-${index}`}>
              {activeTab === `tab-${index}` && (
                <Carousel
                 plugins={[autoplay.current]}
                 slideSize={{ base: '50%', md: '20%' }}
                 slideGap="md"
                 loop
                 slidesToScroll={1}
                 withControls={false}
                 initialSlide={0}
                 className="mt-14"
                >
                 {group.partners.map((partner: any, partnerIndex: number) => (
                    <Carousel.Slide key={partnerIndex}>
                      <Image
                        src={partner.image.url}
                        alt={group.name}
                        width={1200}
                        height={1000}
                        className="w-full object-contain"
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              )}
            </Tabs.Panel>
          ))}
        </div>
      </Tabs>
    </div>
 );
}

export default PartenersHome;
