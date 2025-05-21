import Image from "next/image";
import Frame from "../../public/Frame.svg";
export default function CustomButtonIcon(props: { title: string }) {
  return (
    <div className="relative ">
      <span className="whitespace-nowrap rounded-full bg-[#E9F5F1] w-20 px-2.5 py-[8px] text-sm text-center font-extrabold text-[#019867]">
        {props.title}
      </span>
      <Image
        alt="frame"
        src={Frame}
        width={30}
        height={20}
        className="absolute top-[-10px] right-[-5px] "
      />
    </div>
  );
}
