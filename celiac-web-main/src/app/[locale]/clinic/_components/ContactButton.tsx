import Link from 'next/link'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa6'

function ContactButton({title ,icon}:any) {
  return (
    <div className='rounded-3xl flex justify-center items-center border bg-white gap-2 p-2 px-4'> 
                       {icon}
     <p className='md:text-[13px] lg:text-[15px] text-[10px]'>{title}</p>
                </div>
  )
}

export default ContactButton
