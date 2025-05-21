import Image from "next/image";
import Frame from "../../../../public/Frame.svg";
import CustomButtonIcon from "../../../../components/customButtonIcon";
import PdfComponent from "./_components/pdfComponent";
import MemberCard from "./_components/memberCard";
import Breadcrumb from "@/components/Breadcrumb";
import { useGetBoardMembersQuery } from "@/api/CommitteeApiSlice";
import { useGetFilesBoardMemberQuery } from "@/api/AboutUsApiSlice";
import { fetchBoardMembersServerAction, fetchBoardPdfServerAction, fetchHomeServerAction } from "@/utils/actions";
export default async function BoardMembers() {
    const BoardMembers = await fetchBoardMembersServerAction()
    const homeData = await fetchHomeServerAction()
    const BoardPdf = await fetchBoardPdfServerAction()
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "مجلس الادارة", link: "#" },
       ];

    return (
        <div className='  w-[100%] mt-[15px]'>
            <div className="container">
                <Breadcrumb items={breadcrumbData} />
            </div>
            <div className="text-center flex flex-col justify-center items-center mb-[30px] gap-[12px]">
                <div className='flex flex-col gap-4 justify-center items-center my-[12px]'>
                    <CustomButtonIcon title='مجلس الادارة' />
                    <h3 className='text-[#001F15] text-[24px] font-[600]'>أعضـــاء مجلس ادارة جمعية السليــاك</h3>
                    <p className='text-[#45534E] font-[400] md:text-[20px] text-[15px] w-[80%]'>نتشرف بعرض اعضاء الجمعية الكرام المساهمين فى جميع انجازات الجمعية بمختلف المجالات</p>
                </div>
                <div className=" grid md:grid-cols-3 grid-cols-1 gap-[12px] py-[20px] w-[100%] container">
                    {!BoardMembers ? (
                        <div>Loading...</div>
                    ) : (
                        BoardMembers?.data.data.map((member: any, index: number) => (
                            <MemberCard
                                key={member.id}
                                image={member?.image?.url}
                                name={member?.name}
                                position={member?.position_name}
                                PeriodDate={member?.member_period_text}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-[12px] bg-[#F7FCFA] py-[80px]">
                <div className='flex flex-col gap-4 justify-center items-center my-[12px]'>
                    <CustomButtonIcon title="محاضر الاجتماعات" />
                    <h3 className='text-[#001F15] lg:text-[24px] text-[20px] font-[600]'>محاضر اجتماعات مجلس الادارة</h3>
                    <p className='text-[#45534E] md:text-[20px] text-[15px] w-[80%]'>نتشرف بعرض اعضاء الجمعية الكرام المساهمين فى جميع انجازات الجمعية بمختلف المجالات</p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px] py-[20px] w-[100%] container">
                    {!BoardPdf ? (
                        <div>Loading...</div>
                    ) : (
                        BoardPdf?.data?.data.map((file: any, index: number) => (
                            <PdfComponent
                                key={file.id}
                                title={file?.name}
                                url={file?.url}
                                size={file?.size}
                                RecordDate={file?.date}

                            />
                        ))
                    )}

                </div>
            </div>
        </div>
    );
};