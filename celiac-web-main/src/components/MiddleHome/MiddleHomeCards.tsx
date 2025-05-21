"use client"
import { useState } from 'react';
import Image from 'next/image';
import cardShape from '../../../public/cardShape.png';
import cardShapeWhite from '../../../public/cardShape-white.png';
import plusColor from '../../../public/plusColor.png';
import plusColorWhite from '../../../public/Plus.png';
import donationColor from '../../../public/donationColor.png';
import donationColorWhite from '../../../public/donationWhite.png';
import calenderColor from '../../../public/calenderColor.png';
import calenderColorWhite from '../../../public/calenderWhite.png';
import volunteeredColor from '../../../public/VolunteeredColor.png';
import volunteeredColorWhite from '../../../public/volunteeredWhite.png';
import partnerFocusColor from '../../../public/partnersFocus.png';
import partnerFocusColorWhite from '../../../public/partnerFocusWhite.png';
import celiacCard from '../../../public/celiacCard.png';
import celiacCardWhite from '../../../public/celiacCardWhite.png';
import { url } from 'inspector';
import Link from 'next/link';

const data = [
  {
    title: "الشراكـة الاستراتيجيـة",
    images: [partnerFocusColor, partnerFocusColorWhite],
    url: "ar/ContributeWithUs/StrategicPartnerships"
  },
  {
    title: "حجــز مـــوعد جديد",
    images: [calenderColor, calenderColorWhite],
    url: "ar/clinic/BookAnAppointment"
  },
  {
    title: "بطاقة سليـــاكي",
    images: [celiacCard, celiacCardWhite],
    url: "ar/services/celiacCard"
  },
  // {
  //   title: "العضــوية",
  //   images: [plusColor, plusColorWhite],
  //   url: "ar/ContributeWithUs/Memberships"
  // },
  // {
  //   title: "التبـــــــــــــرع",
  //   images: [donationColor, donationColorWhite],
  //   url: "ar/ContributeWithUs/donation"
  // },
  {
    title: "التطـــــــوع",
    images: [volunteeredColor, volunteeredColorWhite],
    url: "ar/ContributeWithUs/Volunteer"
  },
];

function MiddleHomeCards() {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  return (
    <div>
      <div
        className="grid grid-cols-1 gap-4  md:grid-cols-2  lg:grid-cols-3  lg:gap-8 container my-20  mb-28"
        dir="rtl"
      >
        {data.map((card, index) => (
          <Link
            href={card.url}
            key={index}
            className="transition ease-in-out delay-150 home-card bg-[#E4EFEB] rounded-[12px] relative p-[31px] overflow-hidden flex justify-center items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              className="absolute left-0 bottom-0 shapeGreen"
              src={cardShape}
              alt=""
            />
            <Image
              className="absolute left-0 bottom-0 shapeWhite"
              src={cardShapeWhite}
              alt=""
            />
            <div className="flex justify-center items-center flex-col gap-[24px]">
              <Image
                src={hoveredIndex === index ? card.images[1] : card.images[0]}
                width={60}
                height={60}
                alt={card.title}
              />
              <h5 className="transition ease-in-out delay-150 font-semibold text-[16px] text-center text-[#001F15]">
                {card.title}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MiddleHomeCards;
