'use client'
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import reservationImg from '../../../../../public/reservations.png'
import ProfileMenu from '../_components/profileMenu';
import MyReservationsCard from './_components/myReservationsCard';
import { Pagination, Select } from '@mantine/core';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { useGetReservationsQuery } from '@/api/profileApiSlice';

const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "الملف الشخصي", link: "/ar/profile/" },
    { title: "حجوزاتي", link: "/ar/profile/myReservations" },
];

function MyReservations() {
    const [page, setPage] = useState<any>(1);
    const { data, isLoading, isSuccess } = useGetReservationsQuery(page);
    const [reservation, setReservation] = useState();
    const reservations = [
        { value: '1', label: 'الحجوزات القادمة' },
        { value: '2', label: 'الحجوزات المكتملة' },
        { value: '', label: 'الكل' },
    ];

    return (
        <div className='mx-auto  px-4 sm:px-6 lg:px-8 py-[0] pb-[70px]'>
            <Breadcrumb items={breadcrumbData} />
            <div className="grid md:grid-cols-5 grid-cols-1 gap-8 ">
                <div className="relative w-full">
                    <ProfileMenu />
                </div>
                {data?.data?.length < 1 &&
                    <div className="md:col-span-4 grid grid-cols-1  gap-5">
                        <p className="text-[#001F15] text-[24px] font-[600]">حجوزاتي</p>
                        <div className=" p-[24px] rounded-[8px] flex flex-col justify-center items-center w-full gap-3">
                            <Image alt='' src={reservationImg} />
                            <p className="text-[20px] font-[500] text-[#001F15]">ليس لديك حجوزات بعد</p>
                        </div>
                    </div>
                }
                {data?.data?.length > 0 &&
                    <div className="md:col-span-4 ">
                        <div className="flex md:flex-row flex-col justify-between items-center mb-[12px] ">
                            <p className="text-[#001F15] text-[24px] font-[600]">حجوزاتي</p>
                            <Select
                                rightSection={<IoIosArrowDown />}
                                radius='31px'
                                className='rounded-[31px]'
                                placeholder="نوع الحجز"
                                data={reservations}
                                defaultValue=""
                                onChange={(e: any) => setReservation(e)}
                            />
                        </div>
                        <MyReservationsCard data={isSuccess && data} setPage={setPage} page={page} reservation={reservation} />
                    </div>
                }
            </div>
        </div>
    )
}

export default MyReservations;