"use client"
import Link from "next/link";
import { useState } from "react";
import "./mediaCenter.css";
import { useGetCommitteesQuery } from "@/api/CommitteeApiSlice";
import Image from "next/image";
interface IMediaCenterCard {
    url: string
    description: string
    head: string
    icon: any
    iconW: any
}

function MediaCenterCard({ url, head, icon, description, iconW }: IMediaCenterCard) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <Link href={url}
            // key={committee.id}
            className="border mediaIcons p-10 rounded-2xl flex flex-col justify-center transition-all ease duration-500 items-center text-center home-card hover:text-white hover:bg-[#019867] cursor-pointer"
            // onMouseEnter={() => setHoveredIndex(committee.id)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div className=" ">
                <Image
                    className="iconMain"
                    src={iconW}
                    alt=""
                    width={100}
                    height={100}
                />
                <Image
                    className="iconw"
                    src={icon}
                    alt=""
                    width={100}
                    height={100}
                />
            </div>
            <h2 className="font-bold mb-3 mt-4">{head}</h2>
            <p className="text-gray-500 ">{description}</p>
            {/* <Link href={`/en/aboutUs/Committees/${committee.id}`} className="w-[100%]">
                            <button className="rounded-full border text-[#019867] border-green-600 bg-white py-2 mt-5 w-[90%]">عرض تفاصيل اللجنة</button>
                        </Link> */}
        </Link>
    );
}

export default MediaCenterCard;
