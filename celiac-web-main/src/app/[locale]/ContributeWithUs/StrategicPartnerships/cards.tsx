'use client'
import { useGetStrategicPartnershipsQuery } from "@/api/CommitteeApiSlice";
import Link from "next/link";
import { BiLayer } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

const Cards = () => {
    const { data, isLoading, error } = useGetStrategicPartnershipsQuery();
    return (
        <div className="w-full grid grid-cols-3 gap-[24px] translate-y-[-70px] ">
            {data?.data?.map((item: any, index: number) => (
                <div key={item.id} className="rounded-[16px] border-solid border-[1px] border-[#EAECF0] overflow-hidden shadow-lg flex flex-col justify-center items-center">
                    <div className="bg-[#F9FAFB] w-full p-[32px] flex flex-col justify-center items-center">
                        <BiLayer color="#019867" size={25} />
                        <p className="text-[20px] font-[600] text-[#019867]">{item.partnership_type}</p>
                        <p className="text-[48px] font-[600] text-[#001F15]">{item.partnership_fees}</p>
                        {/* <p className="text-[16px] font-[400] text-[#667085]">150 ريال</p> */}
                    </div>
                    <ul className="flex flex-col gap-2 p-[32px] w-full flex-1">
                        {item.partnership_benefits.split('-').map((benefit: string, index: number) => (
                            <li key={index} className="flex items-center gap-2">
                                <div className="bg-[#0198671A] rounded-[50%] p-[4px]">
                                    <FaCheck color="#019867" size={15} />
                                </div>
                                {benefit}
                            </li>
                        ))}
                    </ul>
                    {false && <div className="bg-[#F9FAFB] p-[35px] w-full flex justify-center items-center">
                        <Link className=" rounded-[50px] w-[80%]" href='en/ContributeWithUs/Memberships/joinMembership'><button className="rounded-[50px] bg-[#019867] p-[15px] text-[#FFF] w-[100%]">انضم الآن</button></Link>
                    </div>}
                </div>
            ))}

        </div>
    );
}

export default Cards;