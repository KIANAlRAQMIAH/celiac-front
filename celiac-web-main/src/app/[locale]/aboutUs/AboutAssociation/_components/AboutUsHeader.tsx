import Image from "next/image";


export default function AboutUsHeader({ data }: any) {
  return (
    <div className=" pt-[40px]">
      <div className="text-center flex flex-col justify-center items-center gap-[12px]">
        <div className="flex flex-col gap-4 justify-center items-center my-[12px]">
          <h3 className="text-[#001F15] text-[24px] font-[600]">
            تأسيس الجمعية
          </h3>
          <p className="text-[#001F15] md:text-[20px] font-[400] text-[15px] w-[80%]">
            {data?.establishment_of_the_association}
          </p>
        </div>
        <Image
          className="w-[100%] max-h-[649px] mt-[40px] object-cover"
          width={300}
          height={6000}
          src={data?.about_image}
          alt=""
        />
      </div>
    </div>
  );
}
