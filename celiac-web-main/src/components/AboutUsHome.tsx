import Image from 'next/image'
import React from 'react'
import homeAboutShape from "../../public/homeAboutShape.png";
import Link from 'next/link';
import CustomButtonIcon from './customButtonIcon';
function AboutHome({ data }: any) {

  return (
    <div className='py-20 relative overflow-hidden'>
      <Image
        className="lg:w-[250px] w-[150px] absolute top-[-50px] right-[-60px]"
        src={homeAboutShape}
        alt="homeAboutImage"
      />
      <div className="grid grid-cols-1 container gap-4 lg:grid-cols-2 lg:gap-8 justify-center items-center" >
        <div className=" ">
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start sm:justify-start sm:items-start  gap-4">
            <CustomButtonIcon title='من نحن' />
            <h1 className="text-center text-[24px] font-[600] md:text-right lg:text-right  Font-bold text-2xl">
              {data?.about_settings.association_about_title}
            </h1>
            <p className="text-center  md:ptext-right lg:text-right text-gray-500">
              {data?.about_settings.association_about_description}
            </p>
            <Link
              className="font-bold  flex justify-center items-center mb-5 rounded-3xl  border border-[#019867]  bg-[#019867]    px-12 py-3 text-sm  text-[#ffffff] hover:bg-[#ffffff] hover:text-[#019867] h-12 focus:outline-none focus:ring active:bg-[#019867]"
              href="/ar/aboutUs/AboutAssociation"
            >
              اعرف المزيد
            </Link>
          </div>
        </div>
        <div className="rounded-lg flex justify-center items-center">
          <Image
            className="w-[80%] first-letter: rounded-[16px]"
            src={data?.about_settings.about_image}
            width={100}
            height={100}
            alt="homeAboutImage"
          />
        </div>
      </div>
    </div>
  )
}
export default AboutHome;