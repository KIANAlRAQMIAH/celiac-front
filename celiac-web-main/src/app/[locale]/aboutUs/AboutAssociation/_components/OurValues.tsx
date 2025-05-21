"use client"
import { useGetAboutUsQuery } from "@/api/AboutUsApiSlice";
import SingleValueCards from "./AboutSingleValueCards";
export default function OurValues({ data }: any) {


  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:p-[80px] p-[15px] py-[40px] gap-[20px] justify-center items-center">
      <div className="md:w-[80%] w-[100%] flex flex-col gap-[8px]">
        <h3 className="text-[#001F15] font-bold  lg:text-[24px]  md:text-[20px] text-[16px] ">
          {data?.association_about_title}
        </h3>
        <p className="text-[#45534E] font-[400] break-all">
          {data?.association_about_description}
        </p>
      </div>
      <SingleValueCards />
    </div>
  );
}
