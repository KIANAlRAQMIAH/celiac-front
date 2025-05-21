"use client"
import Link from "next/link";
import { useState } from "react";
import "../../../../components/MiddleHome.css";
import { useGetCommitteesQuery } from "@/api/CommitteeApiSlice";
import Image from "next/image";
import MediaCenterCard from "./mediaCCard";
import mc1 from '../../../../../public/mediacenter1.png'
import mc2 from '../../../../../public/mediacener2.png'
import mc3 from '../../../../../public/mediacener3.png'
import mc4 from '../../../../../public/mediacener4.png'
import mc5 from '../../../../../public/mediacener5.png'
import mc6 from '../../../../../public/mediacener6.png'
import mc1W from '../../../../../public/mc1.png'
import mc2W from '../../../../../public/mc2.png'
import mc3W from '../../../../../public/mc3.png'
import mc4W from '../../../../../public/mc4.png'
import mc5W from '../../../../../public/mc5.png'
import mc6W from '../../../../../public/mc6.png'


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
        head: 'الأخبــــار',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/ar/MediaCenter/news'
    },
    {
        id: 2,
        icon: mc2,
        iconW: mc2W,
        head: 'مقاطع مساحات منصة X',
        description: "اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد",
        url: '/ar/MediaCenter/XPlatformSpaces'
    },
    {
        id: 3,
        icon: mc3W,
        iconW: mc3,
        head: 'مقاطع البودكاست',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/ar/MediaCenter/XPlatformSpaces'
    },
    {
        id: 4,
        icon: mc4,
        iconW: mc4W,
        head: 'مقاطع اللقاءات العلمية',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/ar/MediaCenter/ScientificMeetings'
    },
    {
        id: 5,
        icon: mc5,
        iconW: mc5W,
        head: 'سلسلة حلقات الطهي',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/ar/MediaCenter/CookingRings'
    },
    {
        id: 6,
        icon: mc6,
        iconW: mc6W,
        head: 'المكتبة',
        description: 'اخر واهم الاخبار التى تهمك فى جميع المجالات لتكون على علم بكل ما تريد',
        url: '/ar/MediaCenter/Library'
    },
]
function MediaCenterCards() {

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {
                MediaContent.map((card) => (
                    <MediaCenterCard key={card.id} iconW={card.iconW} description={card.description} icon={card.icon} head={card.head} url={card.url} />
                ))
            }        </div>
    );
}

export default MediaCenterCards;
