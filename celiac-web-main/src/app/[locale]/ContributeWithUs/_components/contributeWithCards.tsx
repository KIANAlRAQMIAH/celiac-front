"use client"
import Link from "next/link";
import { useState } from "react";
import "../../../../components/MiddleHome.css";
import { useGetCommitteesQuery } from "@/api/CommitteeApiSlice";
import Image from "next/image";
import mc1 from '../../../../../public/con1.png'
import mc2 from '../../../../../public/con2.png'
import mc3 from '../../../../../public/con3.png'
import mc4 from '../../../../../public/con4.png'
import mc5 from '../../../../../public/con5.png'
import mc1W from '../../../../../public/conW1.png'
import mc2W from '../../../../../public/conW2.png'
import mc3W from '../../../../../public/conW3.png'
import mc4W from '../../../../../public/conW4.png'
import mc5W from '../../../../../public/conW5.png'
import MediaCenterCard from "../../MediaCenter/_components/mediaCCard";


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
const MediaContent = [
    {
        id: 1,
        icon: mc1,
        iconW: mc1W,
        head: 'العضويات',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/en/ContributeWithUs/Memberships'
    },
    {
        id: 2,
        icon: mc2,
        iconW: mc2W,
        head: 'الشراكة الاستراتيجية',
        description: "اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد",
        url: '/en/ContributeWithUs/StrategicPartnerships'
    },
    {
        id: 3,
        icon: mc3,
        iconW: mc3W,
        head: 'التطوع',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/en/ContributeWithUs/Volunteer'
    },
    {
        id: 4,
        icon: mc4,
        iconW: mc4W,
        head: 'التدريب التعاوني',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/en/ContributeWithUs/Memberships/CooperativeTraining'
    },
    {
        id: 5,
        icon: mc5,
        iconW: mc5W,
        head: 'التبرع',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/en/ContributeWithUs/donation'
    }
]
function ContributeWithUs() {

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {
                MediaContent.map((card) => (
                    <MediaCenterCard key={card.id} iconW={card.iconW} description={card.description} icon={card.icon} head={card.head} url={card.url} />
                ))
            }        </div>
    );
}

export default ContributeWithUs;
