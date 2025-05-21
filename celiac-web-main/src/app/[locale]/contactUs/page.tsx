import Breadcrumb from "@/components/Breadcrumb";
import ContactUsForm from "./_components/contactUsForm";
import Map from "@/components/ContactUs-Home/Map";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

function MyReservations() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "تواصل معنا", link: "/en/contactUs/" },
    ];

    return (
        <div className='container pb-[70px]'>
            <Breadcrumb items={breadcrumbData} />
            <div className="grid grid-cols-2 gap-8 ">
                <div className="">
                    <p className="text-[36px] text-[#001F15] font-[600]">نحن دائما على تواصل معك</p>
                    <p className="text-[16px] text-[#45534E] font-[500] mb-[32px]">ارسل استفسارك وسنقوم بالرد عليك فى اقرب وقت فنحن هنا لحل جميع المشاكل التى تقابلك </p>
                    <ContactUsForm />
                </div>
                <div className="">
                    <Map />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5 my-[40px]">
                <div className="p-[16px] hover:text-[#FFF] transition contact-card hover:bg-[#019867] boder-solid border-[1px] border-[#019867] rounded-[16px] flex justify-center items-center gap-3">
                    <div className="bg-[#0198671A] icon-bg rounded-[50%] transition w-[120px] h-[120px] flex flex-col justify-center items-center">
                        <FaLocationDot color="#019867" size={45} />
                    </div>
                    <div className="">
                        <p className="text-[#001F15] text-[20px] transition font-[600]">يمكنك ايجادنا فى</p>
                        <p className="text-[#45534E] text-[16px] font-[400] transition">حي العليا _ شارع موسى بن نصير _ مبنى 9</p>
                    </div>
                </div>
                <div className="p-[16px] hover:text-[#FFF] transition contact-card hover:bg-[#019867] boder-solid border-[1px] border-[#019867] rounded-[16px] flex justify-center items-center gap-3">
                    <div className="bg-[#0198671A] icon-bg rounded-[50%] transition w-[120px] h-[120px] flex flex-col justify-center items-center">
                        <FaLocationDot color="#019867" size={45} />
                    </div>
                    <div className="">
                        <p className="text-[#001F15] text-[20px] transition font-[600]">يمكنك ايجادنا فى</p>
                        <p className="text-[#45534E] text-[16px] font-[400] transition">حي العليا _ شارع موسى بن نصير _ مبنى 9</p>
                    </div>
                </div>
                <div className="p-[16px] hover:text-[#FFF] transition contact-card hover:bg-[#019867] boder-solid border-[1px] border-[#019867] rounded-[16px] flex justify-center items-center gap-3">
                    <div className="bg-[#0198671A] icon-bg rounded-[50%] transition w-[120px] h-[120px] flex flex-col justify-center items-center">
                        <FaLocationDot color="#019867" size={45} />
                    </div>
                    <div className="">
                        <p className="text-[#001F15] text-[20px] transition font-[600]">يمكنك ايجادنا فى</p>
                        <p className="text-[#45534E] text-[16px] font-[400] transition">حي العليا _ شارع موسى بن نصير _ مبنى 9</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyReservations;