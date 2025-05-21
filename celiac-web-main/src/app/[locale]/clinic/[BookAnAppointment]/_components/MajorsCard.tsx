import Image from "next/image";
import ic1 from "../../../../../../public/ic1.png";
import ic5 from "../../../../../../public/ic6.png";
import ic6 from "../../../../../../public/ic6.png";
import { BiArrowFromLeft } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa6";
interface IMajorsCard {
  nextStep: any;
  name: string;
  duration: number;
  doctors: number;
  id: string;
  location: string;
  
  handleSelectedClinic: (
    id: string,
    clinicName: string,
    clinicAddress: string,
    doctors: number,
    time: number
  ) => void;
}
const MajorsCard = (props: IMajorsCard) => {
  
 
    return (
      <div className="border-solid border-[1px] border-[#D9D9D9] rounded-[14px] p-[24px]">
        <div className="bg-[#0198682a] flex flex-col justify-center items-center  w-[60px] h-[60px] rounded-[50%]">
          <Image className="w-[70%]" alt="icon" src={ic1} />
        </div>
        <p className="text-[#001F15] font-bold text-[16px]">{props?.name} </p>
        <div className="flex justify-between items-center">
          <div className=" flex justify-center items-center gap-2">
            <Image alt="icon" src={ic5} />
            <p>{props?.doctors} طبيب</p>
            <Image alt="icon" src={ic6} />
            <p>{props.duration} دقيقة</p>
          </div>
          <div
            onClick={() =>
              props.handleSelectedClinic(
                props.id,
                props.name,
                props.location,
                props.doctors,
                props.duration
              )
            }
            className="bg-[#019867] cursor-pointer w-[40px] h-[40px] rounded-[50%] flex justify-center items-center"
          >
            <FaArrowLeft size={25} color="white" />
          </div>
        </div>
      </div>
    );
  
};

export default MajorsCard;
