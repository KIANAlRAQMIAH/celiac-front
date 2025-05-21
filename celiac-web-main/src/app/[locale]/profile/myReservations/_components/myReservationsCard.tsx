

'use client'
import { useCancelReservationMutation } from "@/api/profileApiSlice";
import { Divider, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import DeleteModal from "./deleteReservationModal";
import ReservationRate from "./reservationRate";
import Link from "next/link";
import { modelActions } from "@/store/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

const MyReservationsCard = ({ reservation, data, setPage, page }: any) => {
    const [cancelReservation, { isLoading: loadingCanceled }] = useCancelReservationMutation();
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [isRateModalOpen, { open: openRateModal, close: closeRateModal }] = useDisclosure(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedIdDelete, setSelectedIdDelete] = useState(null);
    const [selectedRate, setSelectedRate] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.data) {
            if (reservation == 1) {
                const articles = data.data.filter((item: any) => item.status == reservation);
                setFilteredReservations(articles);
            }
            else if (reservation == 2) {
                const articles = data.data.filter((item: any) => item.status == reservation);
                setFilteredReservations(articles);
            } else {
                setFilteredReservations(data.data || []);
            }
        }
    }, [data, reservation]);

    const handleCancelClick = async (reservationId: any) => {
        try {
            await cancelReservation(reservationId).unwrap();
        } catch (error) {
            console.error("Failed to cancel reservation", error);
        }
    };

    const handleDeleteModalClick = (reservationId: any) => {
        setSelectedIdDelete(reservationId);
        openDeleteModal();
    };

    const handleRateModalClick = (reservation: any) => {
        setSelectedId(reservation.id);
        setSelectedRate(reservation.rate);
        openRateModal();
    };

    const setClinic = (res: any) => {
        dispatch(modelActions.clinicData(res));
    };
    return (
        <div className="reservation flex flex-col w-full gap-3">
            {filteredReservations && filteredReservations.map((res: any) => (
                <div key={res.id} className="mb-[10px]">
                    <div className="border-solid border-[#CCCCCC] border-[1px] col-span-4 rounded-[8px] flex flex-col w-full">
                        <div className="flex justify-between items-center w-full p-[24px]">
                            <div className="flex items-center gap-4">
                                <p className="text-[16px] text-[#869791] font-[400]">رقم الحجز: <span className='text-[16px] text-[#001F15] font-[400]'>{res.id}</span></p>
                                <p className="text-[16px] text-[#869791] font-[400]">تاريخ الحجز: <span className='text-[16px] text-[#001F15] font-[400]'>{res.scheduled_time} , {res.scheduled_date}</span></p>
                            </div>
                            <div className="text-[16px] text-[#9A9A3A] bg-[#9A9A3A1A] rounded-[34px] py-[10px] px-[12px] font-[400]">{res.type === 1 ? 'حجز جديد' : 'حجز مكتمل'}</div>
                        </div>
                        <Divider color='#C1D2CC' className='w-full' />
                        <div className="p-[20px] flex justify-between items-center w-full">
                            <div className="flex flex-col gap-2">
                                <p className="text-[16px] font-[400] text-[#9A9A3A]">{res.type_text}</p>
                                <div className="flex items-center">
                                    <p className="text-[16px] text-[#001F15] font-[600]">عيادة الجهاز الهضمي للبالغين</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-[16px] text-[#45534E] font-[400]">حي الغدير, الرياض, شارع السيدة عائشة رضي الله عنها , عمارات الاتحاد , الدور الاول والثاني</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 max-w-[220px]">
                                {res.status === 1 ? (
                                    <div className="flex flex-col items-center gap-2 max-w-[220px]">
                                        <button onClick={() => handleCancelClick(res.id)} className='hover:text-[#FFF] text-[#019868d1] w-full hover:bg-[#019868d1] transition text-[16px] font-[600] border-[1px] border-solid border-[#019868d1] rounded-[50px] py-2 px-6'>الغاء الاشتراك</button>
                                        <Link href={`/ar/clinic/${res.clinic.id}`} onClick={() => setClinic(res)} className='hover:text-[#FFF] text-[#019868d1] w-full hover:bg-[#019868d1] transition text-[16px] font-[600] border-[1px] border-solid border-[#019868d1] rounded-[50px] py-2 px-6'>تعديل</Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 max-w-[220px]">
                                        <button onClick={() => handleRateModalClick(res)} className='text-[#FFF] hover:bg-[#019868d1] w-full transition text-[16px] font-[600] bg-[#019867] rounded-[50px] py-2 px-6'>تقييم</button>
                                        <button onClick={() => handleDeleteModalClick(res.id)} className='hover:text-[#FFF] text-[#019868d1] w-full hover:bg-[#019868d1] transition text-[16px] font-[600] border-[1px] border-solid border-[#019868d1] rounded-[50px] py-2 px-6'>حذف</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <Pagination color="#019867" total={data?.meta?.last_page} value={page} onChange={setPage} />
            <DeleteModal opened={isDeleteModalOpen} close={closeDeleteModal} selectedIdDelete={selectedIdDelete} />
            <ReservationRate opened={isRateModalOpen} close={closeRateModal} rate={selectedRate} selectedId={selectedId} />
        </div>
    );
};

export default MyReservationsCard;