"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import statIcon from "../../../public/stat-icon1.svg"
import "../MiddleHome.css"
import CountUp from 'react-countup';
function CounterHomeCard() {

  return (
    <div>
      <div className='flex justify-center items-center gap-[12px] statistic '>
        <div className='flex flex-col justify-center items-center'>
          <CountUp start={0} end={4500} duration={2.5} separator="," decimal="," decimals={0} className='font-bold lg:text-[24px] text-[16px] text-white' >
          </CountUp>
          <p className='font-medium text-[16px]  text-white'>زائر للموقع</p>
        </div>
        <div
          className=' lg:w-[70px] w-[40px] lg:h-[70px] h-[40px] rounded-[50%] flex flex-col justify-center items-center bg-[#ffffff4d] lg:p-[18px] p-[5px]'>
          <Image className=' lg:w-[50px] w-[25px] lg:h-[50px] h-[25px]' src={statIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default CounterHomeCard
