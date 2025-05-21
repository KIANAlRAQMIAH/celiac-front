import Image from 'next/image'
import ImageVideo from "../../../../../../../public/vedioCart.png"
import ImageIconVideo from "../../../../../../../public/VideoIconImage.svg"
import { useEffect, useState } from 'react';

function VideoCard({ data }: any) {
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    const videos = data && data.filter((item: any) => item.type == 3);
    setVideosData(videos);
  }, [data]);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videosData && videosData?.map((post: any, index: number) => (
        <div key={post.id}>
          <div className=' relative  flex flex-col justify-center items-center '>
            <Image src={post.image.url} width={100} alt='ImageVideo' className="overflow-hidden w-[100%] h-[250px] object-cover" height={100} />
            <Image src={ImageIconVideo} alt='ImageVideo' className=' absolute ' />
          </div>
          <h1 className='font-bold text-start mt-[1px]'>{post.title} </h1>
          <p className=' text-start mt-[1px]'>{post.description} </p>
        </div>
      ))}
    </div>
  )
}

export default VideoCard
