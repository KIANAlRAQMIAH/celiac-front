
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import noCard from '../../../../../public/noCard.png'
import ProfileMenu from '../_components/profileMenu';
import MembershipCard from './_components/membershipCard';
function ProfileMembership() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الملف الشخصي", link: "/ar/profile/" },
        { title: "العضوية", link: "/ar/profile/profileMembership" },
    ];

    return (
        <div className='mx-auto  px-4 sm:px-6 lg:px-8  py-[0] pb-[70px]'>
            <Breadcrumb items={breadcrumbData} />
            <div className="grid md:grid-cols-5 grid-cols-1 gap-8">
                <ProfileMenu />
                {false &&
                    <div className="md:col-span-4 grid grid-cols-1  gap-5">
                        <p className="text-[#001F15] text-[24px] font-[600]">العضوية</p>
                        <div className=" p-[24px] rounded-[8px] flex flex-col justify-center items-center w-full gap-3">
                            <Image alt='' src={noCard} />
                            <p className="text-[20px] font-[500] text-[#001F15]">لم تنضم الى اي عضويات بعد !</p>
                            <button className='text-[#FFF] hover:bg-[#019868d1] transition text-[16px] font-[600] bg-[#019867] rounded-[50px] py-3 px-6'>اشتراك فى عضوية</button>
                        </div>
                    </div>
                }
                {true &&
                    <div className="md:col-span-4 flex flex-col w-full gap-3">
                        <MembershipCard renew title='العضوية الحالية' />
                        <MembershipCard renew title='سجل الاشتراكات' />
                        <MembershipCard renew={false} title='' />
                        <MembershipCard renew={false} title='' />
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfileMembership;