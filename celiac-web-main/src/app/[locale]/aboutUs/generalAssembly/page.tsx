"use client"
import CustomButtonIcon from "../../../../components/customButtonIcon";
import MemberCard from "../boardMembers/_components/memberCard";
import PdfComponent from "../boardMembers/_components/pdfComponent";
import Breadcrumb from "@/components/Breadcrumb";
import { useGetAssemblyQuery } from "@/api/CommitteeApiSlice";
import { useGetFilesGeneralAssemblyQuery } from "@/api/AboutUsApiSlice";

interface IMember {
    image: {
        url: string;
    };
    name: string;
    position_name: string;
    member_period_text: string;

};

interface IFile {
    id: number;
    name: string;
    url: string;
    size: string;
    date: string;

}
export default function GeneralAssembly() {
    const { data: memberData, isLoading: LoadingMemberData } = useGetAssemblyQuery();
    const { data: filesData, isLoading: LoadingFilesData } = useGetFilesGeneralAssemblyQuery();




    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "اعضاء الجمعية العمومية", link: "#" },
    ];

    return (

        <div className='  w-[100%] mt-[15px]'>
            <div className="container">
                <Breadcrumb items={breadcrumbData} />
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-[12px] mb-[30px]">
                <div className='flex flex-col gap-4 justify-center items-center my-[12px]'>
                    <CustomButtonIcon title='اعضاء الجمعية' />
                    <h3 className='text-[#001F15] md:text-[24px] text-[20px]  font-[600]'>أعضاء الجمعيـــة العموميـــة</h3>
                    <p className='text-[#45534E] md:text-[20px] text-[15px] w-[80%]'>نتشرف بعرض اعضاء الجمعية الكرام المساهمين فى جميع انجازات الجمعية بمختلف المجالات</p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-[12px] py-[20px] w-[100%] container">

                    {LoadingMemberData ? (
                        <div>Loading...</div>
                    ) : (
                        memberData?.data?.map((member: IMember, index: number) => (
                            <MemberCard
                                key={index}
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
                    <h3 className='text-[#001F15] md:text-[24px] text-[20px]  font-[600]'>محاضر اجتماعات الجمعية العمومية</h3>
                    <p className='text-[#45534E] md:text-[20px] text-[15px] w-[80%]'>نتشرف بعرض اعضاء الجمعية الكرام المساهمين فى جميع انجازات الجمعية بمختلف المجالات</p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px] py-[20px] w-[100%] container">



                    {LoadingFilesData ? (
                        <div>Loading...</div>
                    ) : (
                        filesData?.data.map((file: IFile) => (
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