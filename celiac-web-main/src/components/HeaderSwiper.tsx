"use client"
import "@mantine/carousel/styles.css";
import { useRef } from 'react';
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Autoplay from 'embla-carousel-autoplay';
import Link from "next/link";

function HeaderSwiper({ data }: any) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <Carousel plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      withIndicators height={600} slideGap="md" align="center" dir="ltr"
    >
      {data?.banners.map((banner: any, index: number) => (
        <Carousel.Slide key={banner.id} >
          <Link href={banner?.url ? banner?.url : '/'}>
            <div >
              <Image fill src={banner?.image?.url} alt={`swiperImage${index + 1}`} />
            </div>
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default HeaderSwiper;
