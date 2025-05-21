import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
const MemberCard = (props:{name:string
                         ,position:string
                         ,PeriodDate?:string
                         ,image:any}) => {
  return (
    <div className="bg-[#F7F8F9] flex flex-col justify-center items-center px-[27px] py-[58px] rounded-[10px] gap-[8px]">
      <div className="w-[120px] h-[120px] rounded-[50%]">
        <Image
          className="w-[120px] h-[120px] rounded-[50%] object-contain"
         width={100}
         height={100}
         src={props?.image}
          alt="image"
        />
      </div>
      <h3>{props.name}</h3>
      <p className="text-[#019867]">{props?.position}</p>
      {props.PeriodDate && <div className=" flex justify-center items-center gap-[4px]">
        <CiCalendar color="#019867" />
        <p className="text-[12px]">
          <span className="text-[#acacac]"> مدة العضوية :</span> {props.PeriodDate}
        
        </p>
      </div>}
    </div>
  );
};

export default MemberCard;
