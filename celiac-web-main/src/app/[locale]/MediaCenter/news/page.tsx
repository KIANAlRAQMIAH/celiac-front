import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import NewsCard from './_components/newsCard';

function LatestHomeCard({ readMore = false, data }: any) {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "المركز الاعلامي", link: "/ar/MediaCenter" },
        { title: "الاخبار", link: "/ar/MediaCenter/news" },
    ];
    return (
        <div className="container mb-[40px]">
            <Breadcrumb items={breadcrumbData} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NewsCard id={1} />
                <NewsCard id={2} />
                <NewsCard id={3} />
                <NewsCard id={4} />
                <NewsCard id={5} />
                <NewsCard id={6} />
            </div>
        </div>
    );
}

export default LatestHomeCard;
