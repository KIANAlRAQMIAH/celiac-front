"use client"
import Link from "next/link";
import { useState } from "react";
import "../../../../components//MiddleHome.css";
import { useGetCommitteesQuery } from "@/api/CommitteeApiSlice";
import Image from "next/image";
import food from '../../../../../public/food.png'
import foodW from '../../../../../public/food-w.png'
import hig from '../../../../../public/hig.png'
import higW from '../../../../../public/hig-w.png'
import hire from '../../../../../public/hire.png'
import hireW from '../../../../../public/hire-w.png'
import Cicon from '../../../../../public/celiac-card-icon.png'
import CiconW from '../../../../../public/celiac-icon-w.png'
import prog from '../../../../../public/prog.png'
import progW from '../../../../../public/prog-w.png'

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

function AllServices() {
    const { data, isLoading, error } = useGetCommitteesQuery();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const servicesData = [
        {
            icon: Cicon,
            iconW: CiconW,
            link: '/ar/services/celiacCard',
            head: 'بطاقة سليـــــاكي',
            para: 'رفع مستوى الوعي, المساهمة في توفير بيئة صحية لمرضى السلياك, تعزيز ودعم الأبحاث العلمية والتطويرية, و دعم وتحفيز المشاريع الصغيرة في مجال السلياك'
        },
        {
            icon: hire,
            iconW: hireW,
            link: '/ar/services/recrutment',
            head: 'التــــــوظيف',
            para: 'رفع مستوى الوعي, المساهمة في توفير بيئة صحية لمرضى السلياك, تعزيز ودعم الأبحاث العلمية والتطويرية, و دعم وتحفيز المشاريع الصغيرة في مجال السلياك'
        },
        {
            icon: food,
            iconW: foodW,
            link: '/ar/services/foodBaskets',
            head: 'السلال الغذائيـــــة',
            para: 'رفع مستوى الوعي, المساهمة في توفير بيئة صحية لمرضى السلياك, تعزيز ودعم الأبحاث العلمية والتطويرية, و دعم وتحفيز المشاريع الصغيرة في مجال السلياك'
        },
        {
            icon: hig,
            iconW: higW,
            link: '/ar/services/hajj',
            head: 'الحـــــج',
            para: 'رفع مستوى الوعي, المساهمة في توفير بيئة صحية لمرضى السلياك, تعزيز ودعم الأبحاث العلمية والتطويرية, و دعم وتحفيز المشاريع الصغيرة في مجال السلياك'
        },
        {
            icon: prog,
            iconW: progW,
            link: '/ar/services/activities',
            head: 'الأنشطة والبرامــــــج',
            para: 'رفع مستوى الوعي, المساهمة في توفير بيئة صحية لمرضى السلياك, تعزيز ودعم الأبحاث العلمية والتطويرية, و دعم وتحفيز المشاريع الصغيرة في مجال السلياك'
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {
                servicesData.map((service, index) => (
                    <div
                        key={index}
                        className="border service p-10 rounded-2xl flex flex-col justify-center transition-all ease duration-500 items-center text-center home-card hover:text-[white] hover:shadow-lg hover:bg-[#019867] "                    >
                        <div className="relative">
                            <Image
                                className="main-icon"
                                src={service.icon}
                                alt=""
                                width={88}
                                height={88}
                            />
                            <Image
                                src={service.iconW}
                                className="w-icon"
                                alt=""
                                width={88}
                                height={88}
                            />
                        </div>
                        <h2 className="font-bold mb-3 mt-4">{service.head}</h2>
                        <p className="text-gray-500 ">{service.para}</p>
                        <Link href={`${service.link}`} className="w-[100%]">
                            <button className="rounded-full border text-[#019867] border-green-600 bg-white py-2 mt-5 w-[90%]">عرض تفاصيل اللجنة</button>
                        </Link>
                    </div>
                ))}
        </div>
    );
}

export default AllServices;
