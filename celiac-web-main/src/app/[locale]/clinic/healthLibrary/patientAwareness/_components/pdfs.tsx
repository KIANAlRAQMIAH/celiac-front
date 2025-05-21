import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { LuGlasses } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";
import pdfIcon from '../../../../../../../public/pdfIcon.png'
import Link from "next/link";
import { useEffect, useState } from "react";
const Pdfs = ({ data }: any) => {
    const [pdfData, setPdfData] = useState([]);
    useEffect(() => {
        const pdfdata = data && data?.filter((item: any) => item.type == 1);
        setPdfData(pdfdata);
    }, [data]);
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            {pdfData && pdfData?.map((post: any, index: number) => (
                <Link key={post.id} href={post?.pdf.url} target="_blank">
                    <div className="bg-[#FFFFFF] border flex w-[100%] md:flex-row flex-col  justify-start items-center md:px-[44px] px-[22px] md:py-[28px] py-[20px] rounded-[10px] gap-[8px] text-right">

                        <Image className='w-[131px] h-[119px] rounded-[8px] object-contain  ' src={pdfIcon} alt='card member' />

                        <div className="flex flex-col md:justify-start justify-center md:items-start items-center md:text-right text-center gap-[5px]">
                            <h3 className="text-[16px] font-[600]" >{post?.title}</h3>
                            <p className="text-[#869791] text-[12px]" dir="ltr">{post?.size}</p>


                            {/* {props.disc && (
                        <div className="text-gray-500 text-[16px]">{props?.disc}</div>
                    )}


                    {props.date && (
                        <div className="flex justify-center items-center gap-[4px]">
                            <CiCalendar color="#019867" />
                            <p className="text-[12px]"><span className="text-[#acacac]"> مدة العضوية:</span> {props?.date}</p>
                        </div>
                    )}
                    <div className="flex justify-center items-center gap-3 mt-3">

                        {props.researcherName && (

                            <div className="flex justify-center items-center gap-[4px]">
                                <LuGlasses color="#019867" />
                                <p className="text-[12px]"><span className="text-[#acacac]">اسم الباحث:</span> {props?.researcherName}</p>
                            </div>

                        )}

                        {props.publicationDate && (

                            <div className="flex justify-center items-center gap-[4px]">
                                <CiCalendar color="#019867" />
                                <p className="text-[12px]"><span className="text-[#acacac]">تاريخ النشر:</span>{props?.publicationDate}</p>
                            </div>

                        )}

                        {props.writerName && (

                            <div className="flex justify-center items-center gap-[4px]">
                                <LuPenLine color="#019867" />
                                <p className="text-[12px]"><span className="text-[#acacac]">اسم الكاتب:</span> {props?.writerName}</p>
                            </div>

                        )}


                        {props.RecordDate && (

                            <div className="flex justify-center items-center gap-[4px]">
                                <CiCalendar color="#019867" />
                                <p className="text-[12px]"><span className="text-[#acacac]"> تاريخ المحضر:</span> {props?.RecordDate}</p>
                            </div>

                        )} */}
                        </div>
                    </div>
                </Link >
            ))}
        </div>
    );
}

export default Pdfs;