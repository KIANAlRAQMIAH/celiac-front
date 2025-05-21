"use client"
import { useGetCommitteeByIdQuery } from "@/api/CommitteeApiSlice";
import MemberCard from "../../boardMembers/_components/memberCard";
import Breadcrumb from "@/components/Breadcrumb";

interface IMember  {
    image: {
      url: string;
    };
    name: string;
    position_name: string;
   
  };
export default function CommittessDetails({params}:any) {

        
   
    let breadcrumbTitles;

    if (params.CommitteessDetails === "1" ) {
        breadcrumbTitles = ["الرئيسية", " لجنة التخطيط والتطوير"];
    } else if (params.CommitteessDetails === "2") {
        breadcrumbTitles = ["الرئيسية", "لجنة التدقيق والمراجعة الداخلية"];
    } else if (params.CommitteessDetails === "3") {
        breadcrumbTitles = ["الرئيسية", "لجنة الموارد المالية والاستثمار"];
    } else if (params.CommitteessDetails === "4") {
        breadcrumbTitles = ["الرئيسية", "لجنة إدارة المخاطر"];
    } else {
        breadcrumbTitles = ["الرئيسية", "اللجنة العلمية"];
    }
    const { data , isLoading  }:any = useGetCommitteeByIdQuery(params.CommitteessDetails);

     const unsafeHtml =data?.data.tasks

     const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: data?.data?.name, link: "#" },
       ];
    
    return (
        
       <>
          <div className="container">
          <Breadcrumb items={breadcrumbData} />
           </div>
            <div className="bg-[#F4FEFA]">
                <div className=" grid md:grid-cols-2 grid-cols-1 container py-[78px] gap-[24px]">
                    <div className="">
                    <h2 className="md:text-[24px] text-[20px]  font-[600]">
                           {data?.data?.name}
                        </h2>
                        <p className="md:w-[60%] w-[100%] text-[14px] font-[400] text-[#45534E]">{data?.data.specialties}</p>
                    </div>
                    <div className="">
                        <ul className="list-square flex flex-col gap-[4px] mr-[17px]" dangerouslySetInnerHTML={{ __html: unsafeHtml }} />  
                    </div>
                </div>
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-[12px] py-[70px]">
                <div className='flex flex-col justify-center items-center my-[12px]'>
                    <h3 className='text-[#001F15] md:text-[24px] text-[20px]  font-[600]'>
                        أعضاء {data?.data?.name}</h3>
                    <p className='text-[#45534E] md:text-[20px] text-[15px] w-[80%]'>نتشرف بعرض اعضاء الجمعية الكرام المساهمين فى جميع انجازات الجمعية بمختلف المجالات</p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-[12px] py-[20px] w-[100%] container">
                {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        data?.data.members.map((member: IMember, index: number) => (
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
            </>
        
    );
};