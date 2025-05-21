import Image from 'next/image';
import ac1 from '../../../../../../../../public/PsychotherapyDetailsImg.png'
import ic6 from '../../../../../../../../public/ic6.png'
import Link from 'next/link';
import AppointmentMap from '../../../../../clinic/[BookAnAppointment]/_components/appointmentMap';

interface IPsychotherapyDetails {
    free: boolean
}
const PsychotherapyDetailsCard = ({ free }: IPsychotherapyDetails) => {
    return (
        <div className="rounded-b-[14px] flex flex-col gap-2" >
            <div className="w-full h-[350px] relative  overflow-hidden " >
                <Image className='w-full h-full object-cover ' src={ac1} alt='1' />
            </div>
            <div className="flex flex-wrap justify-between items-center">
                <div className=" flex flex-wrap w-full justify-start items-center gap-4">
                    <div className="flex justify-center items-center gap-1">
                        <Image alt='icon' src={ic6} />
                        <p>22 مايو, 2023 </p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <Image alt='icon' src={ic6} />
                        <p>08:00 مساءا - 10:00 مساءا</p>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <Image alt='icon' src={ic6} />
                        <p>حضور عن بعد</p>
                    </div>
                    {free && <p className='bg-[#FD2854] ms-auto rounded-[31px] py-2 px-4 text-[#FFF]   font-[500] text-[12px]'>مجاني</p>}
                </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
                <div className="md:col-span-2 flex flex-col gap-4 ">
                    <p className="text-[24px] text-[#001F15] font-[600]">
                        مناقشة أفضل الحلول للتوتر والضغط النفسي عند حل المشكلات
                    </p>
                    <p className="text-[16px] text-[#45534E] font-[400] ">
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.
                    </p>
                    <Link href='/en/services/activities/Psychotherapy/PsychotherapyForm' className='w-max'><button className='bg-[#019867] text-[#FFF] mt-[16px] w-max rounded-[50px] py-2 px-[16px] text-[16px] font-[600]'>تأكيد الاشتراك</button></Link>
                </div>
                <div className="flex flex-col  justify-between mr-auto gap-[12px] lg:w-[90%] w-[100%]">
                    <div className=" flex-grow min-h-[200px]"><AppointmentMap /></div>
                    <div className="flex flex-col gap-[4px]">
                        <p className="text-[#001F15] text-[16px] font-[600]">عيادة الجهاز الهضمي للبالغين</p>
                        <p className="text-[#869791] text-[16px] font-[400]">حي الغدير, الرياض, شارع السيدة عائشة رضي الله عنها , عمارات الاتحاد , الدور الاول والثاني</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PsychotherapyDetailsCard;