"use client"
import Link from "next/link";
import { useState } from "react";
import "../../../../../components/MiddleHome.css";
import { useGetCommitteesQuery } from "@/api/CommitteeApiSlice";
import Image from "next/image";

interface ICommittee {
  id: number;
  name: string;
  description: string;
  mainIcon: {
    url: string;
  };
  icon: {
    url: string;
  };
}

function CommittesCards() {
  const { data, isLoading, error } = useGetCommitteesQuery();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
      {isLoading && <p>Loading...</p>}
      {data &&
        data.data.map((committee: ICommittee, index: number) => (
          <div
            key={committee.id}
            className="border p-10 rounded-2xl flex flex-col justify-center transition-all ease duration-500 items-center text-center home-card hover:text-white hover:bg-[#019867] cursor-pointer"
            onMouseEnter={() => setHoveredIndex(committee.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative">
              <Image
                src={committee.mainIcon.url}
                alt=""
                width={100}
                height={100}
              />
              {hoveredIndex === committee.id && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50">
                  <Image
                    src={committee.icon.url}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
            <h2 className="font-bold mb-3 mt-4">{committee.name}</h2>
            <p className="text-gray-500 ">{committee.description}</p>
            <Link href={`/en/aboutUs/Committees/${committee.id}`} className="w-[100%]">
              <button className="rounded-full border text-[#019867] border-green-600 bg-white py-2 mt-5 w-[90%]">عرض تفاصيل اللجنة</button>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default CommittesCards;
