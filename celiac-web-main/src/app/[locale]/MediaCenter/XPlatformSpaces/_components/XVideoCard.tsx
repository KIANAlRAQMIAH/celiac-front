import Image from 'next/image'
import ImageVideo from "../../../../../../public/vedioCart.png"
import ImageIconVideo from "../../../../../../public/VideoIconImage.svg"

function XVideoCard() {
  return (
    <div className='bg-[#FFF] pb-3 rounded-[12px]'>
      <div className=' relative  flex flex-col justify-center items-center rounded-[12px]'>
        <Image src={ImageVideo} alt='ImageVideo' className="rounded-[12px] overflow-hidden w-[100%] object-cover" height={208} />


        <Image src={ImageIconVideo} alt='ImageVideo' className='rounded-[12px] absolute ' />
      </div>
      <h1 className='font-bold text-start mt-3 mx-2'>حمـلة توعـوية بالتعاون مع مستشفي الامام عبد الرحمن الفيصل. mp4</h1>
    </div>
  )
}

export default XVideoCard
