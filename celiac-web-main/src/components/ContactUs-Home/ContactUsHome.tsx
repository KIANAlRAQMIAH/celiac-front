import dynamic from "next/dynamic";
import Image from "next/image";
// import Map from "./Map";
const Map = dynamic(() => import("./Map"), { ssr: false });
import ContactUsForm from "./ContactUsForm";
import CustomButtonIcon from "../customButtonIcon";
import { ToastContainer } from "react-toastify";
function ContactUsHome() {
  return (
    <>
      <div className="container flex flex-col justify-center text-center  gap-4 items-center mb-10">
      <ToastContainer position="bottom-right" autoClose={5000} />
        <CustomButtonIcon title="تواصل معنــا" />
        <h1 className="font-extrabold">
          دعنـا نتواصل سويا لمساعدتــك فى كل ما تريد
        </h1>
      </div>
      <div className="mb-24 grid md:grid-cols-2 grid-cols-1 justify-center items-center sm:flex-col container  ">
        <Map />
        <div className="rounded-2xl   md:translate-x-[50px] translate-x-[0px] md:translate-y-[0] translate-y-[-50px] z-index bg-[white]  shadow-2xl p-6 pt-10  border w-[100%] lg:w-[100%]  h-auto md:h-[600px]  lg:h-[600px]  ">
          <div className="flex flex-col justify-start items-start gap-4">
            <h2 className="font-extrabold">ارسل رسالتك واستفسارك</h2>
            <p>
              أدخل البيانات المطلوبة بلاسفل ثم اضغط زر الارسال واستفسر عن <br />
              اي شىء تريد وسنقوم بالرد عليك فى اقرب وقت
            </p>
          </div>
          {/* form */}
          <ContactUsForm />
        </div>
      </div>
    </>
  );
}

export default ContactUsHome;
