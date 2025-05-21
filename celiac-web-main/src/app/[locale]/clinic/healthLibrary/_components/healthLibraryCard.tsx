import Link from "next/link"


function HealthLibraryCard({title ,description ,cardLink}:any) {
  return (
    <Link href={cardLink}>
    <div className='cursor-pointer  hover:shadow-xl  hover:text-white home-card  transition-all ease duration-500 hover:bg-[#019867]  text-center border rounded-xl p-6 pt-7'>
        <h1 className='text-[24px] font-extrabold mb-2'>{title}</h1>
         <p className='text-gray-500 text-[16px]'>{description}</p>
     </div>
     </Link>
   
  )
}

export default HealthLibraryCard
