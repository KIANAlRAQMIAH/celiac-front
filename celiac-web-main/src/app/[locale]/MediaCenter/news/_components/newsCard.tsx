import Image from "next/image";
import Link from "next/link";
import newsImg from '../../../../../../public/GlobalInformationImg.png'
interface INewsCard {
    id: number
}
const NewsCard = ({ id }: INewsCard) => {
    return (
        <article className="home-card-LatestHome overflow-hidden rounded-[25px] shadow border-spacing-0 transition-all ease duration-500 group  hover:bg-[#019867]">
            <Image
                alt="card image"
                src={newsImg}
                className="overflow-hidden w-[100%] object-cover h-64"
                height={208}
                width={100}
            />
            <div className="relative p-4 sm:p-6 group-hover:bg-[#019867] flex flex-col group hover:text-white">
                <span
                    className="absolute -top-10 inline-block rounded border border-[#019867] px-3 py-5 text-xs font-medium text-white hover:bg-white hover:text-[#019867] focus:outline-none focus:ring bg-[#019867]"
                >
                    22 مايو, 2023
                </span>
                <Link href="#">
                    <h3 className="mt-0.5 text-lg font-bold text-gray-900 hover:text-white">
                        حمـلة توعـوية بالتعاون مع مستشفي الامام عبد الرحمن الفيصل
                    </h3>
                </Link>
                <p className="my-1 line-clamp-3 text-sm/relaxed text-gray-500 hover:text-white">
                    اقامت جمعية السلياك الركن التوعوي يوم الأربعاء الموافق 2023/5/10 بمناسبة شهر السلياك العالمي في الهيئة الملكية بالسفارات كل الشكر والتقدير لـ بدر سالم القحطاني اخصائي اول التدريب والتطوير ......
                </p>
                <Link href={`/ar/MediaCenter/news/${id}`} className=' text-center cursor-pointer px-3 text-[16px] py-2 mt-2 w-[100px] rounded-full border border-white text-white bg-[#019867]'>
                    اقرأ المزيد
                </Link>
            </div>
        </article>
    );
}

export default NewsCard;