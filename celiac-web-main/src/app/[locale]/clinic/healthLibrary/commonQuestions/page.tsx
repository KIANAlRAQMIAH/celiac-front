import { useTranslations } from "next-intl";
import CommonQuestionsCards from "./_components/CommonQuestionsCards";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { fetchFAQServerAction } from "@/utils/actions";
export default async function CommonQuestions() {
    const fetchFAQ = await fetchFAQServerAction()
    // const t = useTranslations("Index");
    return (
        <div className="container">
            {/* <Breadcrumb titles={["الرئيسية","المكتبة الصحية","الأسألة الشائعة"]}/> */}
            <div className='flex flex-col gap-4 justify-center items-center my-[12px] text-center mb-10'>
                <h3 className='text-[#001F15] text-[24px] font-[600]'>الاسألة الشائعة</h3>
                <p className='text-[#869791] font-[400] md:text-[16px] text-[15px] w-[80%] mt-5'>نحن معكم يدا بيد ... لا تقلق وهنا نقدم لكل نموذج من الاسالة الهامة التى يريد ان يعرفها كل من يهتم بمصابي السلياك وان لم تجد اجابة لسؤالك يمكنك ان تتواصل معنا فى اي وقت .</p>
            </div>
            <CommonQuestionsCards data={fetchFAQ.data.data} />


            <div className="flex flex-col justify-center items-center mt-16 gap-5 mb-32">
                <h1 className="font-extrabold">مازلت لم تجد اجابة سؤالك بعد ؟</h1>
                <Link
                    className="flex justify-center items-center mb-5 rounded-3xl  border border-[#019867]  bg-[#019867]    px-12 py-3 text-sm font-bold text-[#ffffff] hover:bg-[#ffffff] hover:text-[#019867] h-12 focus:outline-none focus:ring active:bg-[#019867]"
                    href="#"
                >
                    تواصل معنا
                </Link>
            </div>

        </div>
    );
}
