import Image from 'next/image';
import Link from 'next/link';

function LatestHomeCard({ readMore = false, data }: any) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.posts.map((post: any, index: number) => (
        <div key={index}>
          <article className="home-card-LatestHome overflow-hidden rounded-[25px] shadow border-spacing-0 transition-all ease duration-500 group hover:scale-105 hover:bg-[#019867]">
            <Image
              alt="card image"
              src={post.image.url}
              className="overflow-hidden w-[100%] object-contain h-64"
              height={208}
              width={100}
            />
            <div className="relative p-4 sm:p-6 group-hover:bg-[#019867] group hover:text-white">
              <span
                className="absolute -top-10 inline-block rounded border border-[#019867] px-3 py-5 text-xs font-medium text-white hover:bg-white hover:text-[#019867] focus:outline-none focus:ring bg-[#019867]"
              >
                {post.publish_date}
              </span>
              <Link href="#">
                <h3 className="mt-0.5 text-lg font-bold text-gray-900 hover:text-white">
                  {post.name}
                </h3>
              </Link>
              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 hover:text-white">
                {post.description}
              </p>
              {readMore && (
                <div className='text-center cursor-pointer px-3 text-[16px] py-2 mt-6 w-[100px] rounded-full border border-white text-white bg-[#019867]'>
                  اقرأ المزيد
                </div>
              )}
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}

export default LatestHomeCard;
