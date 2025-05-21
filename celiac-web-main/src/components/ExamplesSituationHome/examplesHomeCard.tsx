import { rgba } from "@mantine/core";
import Image from "next/image";
import React from "react";

function ExamplesHomeCard({ data }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.donations.map((donation: any, index: number) => (
        <article key={index} className="overflow-hidden rounded-lg shadow border-spacing-0 transition hover:shadow-lg ">
          <Image
            alt="card image"
            src={donation?.image?.url}
            className="w-full object-contain h-48"
            width={384}
            height={208}
          />
          <div className="bg-white p-4 sm:p-6 mt-2 flex flex-col gap-[8px]">
            <span
              className="whitespace-nowrap rounded-full py-2 px-3 text-sm w-max "
              style={{
                color: "#019867",
                backgroundColor: "0xE4F3Ea",
                border: "1px solid #019867"
              }}
            >
              {donation?.destination_name}
            </span>
            <a href="#">
              <h3 className=" text-lg font-bold text-gray-900">{donation?.name}</h3>
            </a>
            <p className=" line-clamp-3 text-sm/relaxed text-gray-500">{donation?.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ExamplesHomeCard;
