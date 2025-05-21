import React from 'react'
import ClinicCard from './_components/ClinicCards'
import Breadcrumb from '@/components/Breadcrumb'
import familyClinic from "../../../../public/familyClinic.png"
import Image from 'next/image'
import Link from 'next/link'
import { BiLogoTelegram } from "react-icons/bi";
import ContactButton from './_components/ContactButton'
import { FaWhatsapp } from 'react-icons/fa6'
import ClinicCards from './_components/ClinicCards'
import { useGetSocialContactQuery } from '@/api/Clinic/SocialGroupApiSlice'
import { fetchBmiServerAction } from '@/utils/actions'

async function Clinic() {
  // const { data, isLoading, isError } = useGetSocialContactQuery();
  const fetchBmi = await fetchBmiServerAction()
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "العيادة", link: "/en/clinic" },
  ];

  return (
    <div className='container'>
      <Breadcrumb items={breadcrumbData} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
        <ClinicCards fetchBmi={fetchBmi} />
      </div>

      <div className='mt-14 mb-32 '>
        <div className='flex flex-col-reverse md:flex-row lg:flex-row lg:justify-between justify-center items-center rounded-2xl bg-[#019867] p-8'>
          <div className='flex flex-col gap-4 text-center lg:text-start md:text-start'>
            <h3 className='font-extrabold text-white text-[20px]'>انضـــــــم لجروب الجمعية لمرضي السلياك</h3>
            <p className='text-white w-[100%] lg:w-[70%] md:w-[50%] text-center lg:text-start md:text-start'>
              انضم معنا الآن وتابع كل النصائح المقدمة لمرضي السلياك سواء كنت من المصابين او لديك مصاب بالعائلة تعرف على كيفية الحفاظ على صحتهم
            </p>

            <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-start lg:items-start md:justify-start md:items-start md:flex-row gap-4'>
              {fetchBmi?.data.telegram_group && (
                <Link href={fetchBmi?.data.telegram_group}>
                  <ContactButton
                    title="جروب تليجرام"
                    icon={
                      <div className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-[#26A4E3] rounded-full">
                        <BiLogoTelegram className="text-[18px]" />
                      </div>
                    }
                  />
                </Link>
              )}

              {fetchBmi?.data.whatsapp_group && (
                <Link href={fetchBmi?.data.whatsapp_group}>
                  <ContactButton
                    title="جروب الواتساب"
                    icon={
                      <div className="flex items-center justify-center w-7 h-7 text-xs font-medium text-white bg-[#29A71A] rounded-full">
                        <FaWhatsapp className="text-[20px]" />
                      </div>
                    }
                  />
                </Link>
              )}
            </div>
          </div>
          <div className='mb-5'>
            <Image src={familyClinic} alt="familyClinicImage" className='w-60 lg:w-96 md:w-96' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clinic
