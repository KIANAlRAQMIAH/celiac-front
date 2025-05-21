"use client"
import LocationIcon from "../../public/location.svg";
import PhoneIcon from "../../public/phone.svg";
import EmailIcon from "../../public/email.svg";
import Image from "next/image";
import footerLogo from "../../public/logoFooter.png";
import { SiTiktok } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { SiYoutubemusic } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import "./MiddleHome.css"
import { Divider } from "@mantine/core";
import { useGetHomePageQuery } from "@/api/HomeApiSlice";
function Footer() {
  const {data ,isLoading}=useGetHomePageQuery()
  
  return (
     <>
     
     <div className="bg-[#F2F5F4]">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[12px] p-[15px]  lg:p-[35px] container ">
              <div className="flex flex-col gap-[18px]">
                  <Image className='w-[300px]' src={footerLogo} alt=""/>
                  <p className='text-[#45534E] text-[16px] font-[500] lg:w-[70%] w-[100%]'>جمعية السلياك هي الجمعية الاولى في المملكة
                      العربية السعودية لمرضى السلياك وتهدف لتوعية وارشاد المرضى وتقديم الدعم الكامل لهم .
                  </p>
              </div>
              <div className="flex flex-col gap-[12px] text-[#45534E]">
                  <h2 className='text-[18px] font-semibold'>الوصول السريع</h2>
                  <ul className='footer-menu max-h-[166px] flex flex-col flex-wrap gap-[8px] my-[8px]'>
                      <li className='w-max'><Link href=''>عن الجمعية</Link></li>
                      <li className='w-max'><Link href=''>العيادة</Link></li>
                      <li className='w-max'><Link href=''>الخدمات</Link></li>
                      <li className='w-max'><Link href=''>المركز الاعلامي</Link></li>
                      <li className='w-max'><Link href=''>ساهم معنا</Link></li>
                      <li className='w-max'><Link href=''>تواصل معنا</Link></li>
                      <li className='w-max'><Link href=''>سياسات الموقع</Link></li>
                      <li className='w-max'><Link href=''>الشروط والاحكام</Link></li>
                      <li className='w-max'><Link className='w-max' href=''>تسجيل الدخول</Link></li>
                  </ul>
              </div>
              <div className="flex flex-col gap-[8px] text-[#45534E]">
                  <h2 className='text-[18px] font-semibold'>طرق التواصل</h2>
                  <ul className='max-h-[166px] flex flex-col flex-wrap gap-[12px] my-[8px]'>
                      <li className='w-max flex gap-[12px] items-center'>
                          <div className='w-[40px] h-[40px] rounded-[50%] bg-[#019867] flex justify-center items-center'>
                          <Image src={PhoneIcon} alt="PhoneIcon"/>
                          </div>
                        {data?.contact_settings.phone} / {data?.contact_settings.phone1}</li>
                      <li className='w-max flex gap-[12px] items-center'>
                            <div className='w-[40px] h-[40px] rounded-[50%] bg-[#019867] flex justify-center items-center'>
                                <Image src={EmailIcon} alt="EmailIcon"/>
                            </div>
                            {data?.contact_settings.email}</li>
                      <li className='w-[100%] flex flex-wrap gap-[12px] items-center'>
                              <div className='w-[40px] h-[40px] rounded-[50%] bg-[#019867] flex justify-center items-center'>
                              <Image src={LocationIcon} alt="LocationIcon"/>
                              </div>
                              <p className='w-[80%]'>{data?.contact_settings.address}</p></li>
                  </ul>
              </div>



              
 </div>
  
 
 <div className="grid grid-cols-1 gap-[12px] p-[15px] lg:p-[35px] container">
  <Divider my={"md"} size={3} />
  <div className="flex flex-col lg:flex-row justify-between items-center">
    <h4>© كل الحقوق محفوظة لجمعية السلياك 2024</h4>
    
    <div className="flex gap-4 justify-center items-center lg:flex">
      
      <a target="_blank" className="flex items-center justify-center w-9 h-9 text-xs font-medium text-white bg-black rounded-full" href={data?.contact_settings.tiktok}>
        <SiTiktok className="text-[24px]" />
      </a>
      <a target="_blank" className="flex items-center justify-center w-9 h-9 text-xs font-medium text-white bg-black rounded-full" href={data?.contact_settings.twitter}>
        <FaXTwitter className="text-[24px]" />
      </a>
      <a target="_blank" href={data?.contact_settings.youtube} >
        <SiYoutubemusic className="text-red-600 text-[37px] cursor-pointer" />
      </a>
      <a target="_blank"  className="flex items-center justify-center w-9 h-9 text-xs font-medium text-white bg-[#29A71A] rounded-full" href={data?.contact_settings.whatsapp}>
        <FaWhatsapp className="text-[25px]" />
      </a>
    </div>
  </div>
</div>

 </div>
     </>
  );
}

export default Footer;
