
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import noCard from '../../../../../public/noCard.png'
import ProfileMenu from '../_components/profileMenu';
import ProfileProgramsCard from './_components/profileProgramsCard';
import { Select } from '@mantine/core';
import { IoIosArrowDown } from 'react-icons/io';
function ProfilePrograms() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الملف الشخصي", link: "/ar/profile" },
        { title: "الانشطة والبرامج", link: "/ar/profile/ProfilePrograms" },
    ];

    return (
        <div className='mx-auto px-4 sm:px-6 lg:px-8  py-[0] pb-[70px]'>
            <Breadcrumb items={breadcrumbData} />
            <div className="grid grid-cols-5 gap-8 ">
                <div className="relative w-full">
                    <ProfileMenu />
                </div>
                {false &&
                    <div className="col-span-4 grid grid-cols-1  gap-5">
                        <p className="text-[#001F15] text-[24px] font-[600]">الانشطة والبرامج</p>
                        <div className=" p-[24px] rounded-[8px] flex flex-col justify-center items-center w-full gap-3">
                            <Image alt='' src={noCard} />
                            <p className="text-[20px] font-[500] text-[#001F15]">لم تنضم لاي انشطه وبرامج بعد !</p>
                        </div>
                    </div>
                }
                {true &&
                    <div className="col-span-4 ">
                        <div className="flex justify-between items-center mb-2 ">
                            <p className="text-[#001F15] text-[24px] font-[600]">الانشطة والبرامج</p>
                            <Select
                                rightSection={<IoIosArrowDown />}
                                radius='31px'
                                className='rounded-[31px]'
                                placeholder="Pick value"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                                defaultValue="React"
                            />
                        </div>
                        <div className="flex flex-col w-full gap-3">
                            <ProfileProgramsCard title='' renew />
                            <ProfileProgramsCard title='' renew />
                            <ProfileProgramsCard title='' renew />
                            <ProfileProgramsCard title='' renew />
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default ProfilePrograms;