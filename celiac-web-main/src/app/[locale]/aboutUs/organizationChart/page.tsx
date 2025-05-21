"use client"
import CustomButtonIcon from "../../../../components/customButtonIcon";
import MemberCard from "../boardMembers/_components/memberCard";
import Breadcrumb from "@/components/Breadcrumb";
import { useGetOrganizationChartQuery } from "@/api/AboutUsApiSlice";


interface IMember {
    image: {
        url: string;
    };
    name: string;
    position_name: string;

};
export default function OrganizationChart() {
    const { data: memberData, isLoading: loadingMemberData } = useGetOrganizationChartQuery();
    if (loadingMemberData) {
        <div>isLoading.....</div>
    }
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الهيكل التنظيمي", link: "#" },
    ];
    return (
        <div className='w-[100%] mt-[15px] '>
            <div className="container">

                <Breadcrumb items={breadcrumbData} />
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-[12px] mb-[30px]">
                <div className='flex flex-col gap-4 justify-center items-center my-[12px]'>
                    <CustomButtonIcon title='هيكل الادارة' />
                    <h3 className='text-[#001F15] md:text-[24px] text-[20px]  font-[600]'>الهيكل التنظيمي لجمعية السلياك</h3>
                    <p className='text-[#45534E] md:text-[20px] text-[15px] w-[80%]'>نتشرف بعرض اعضاء الجمعية الكرام المساهمين فى جميع انجازات الجمعية بمختلف المجالات</p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1  gap-[12px] py-[20px] w-[100%] container">

                    {loadingMemberData ? (
                        <div>Loading...</div>
                    ) : (
                        memberData?.data?.map((member: any, index: number) => (
                            <MemberCard
                                key={index}
                                image={member?.image?.url}
                                name={member?.name}
                                position={member?.position_name}

                            />
                        ))
                    )}



                </div>
            </div>
        </div>
    );
};