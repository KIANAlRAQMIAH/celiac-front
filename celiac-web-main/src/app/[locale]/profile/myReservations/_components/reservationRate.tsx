import { Modal, Rating, Textarea } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { useNewRateMutation, useReservationRateMutation } from "@/api/profileApiSlice";
import { toast } from "react-toastify";

type IReservationRate = {
    opened: boolean;
    close: () => void;
    selectedId: any;
    rate: any;
};

const ReservationRate = ({ opened, close, selectedId, rate }: IReservationRate) => {
    const [ReservationRate, { isLoading: loadingCanceled, isSuccess: isSCanceled }] = useReservationRateMutation();
    const [newRateData, { isLoading, isSuccess }] = useNewRateMutation();
    const [selectedRate, setSelectedRate] = useState(1);
    const hasNotified = useRef(false);

    useEffect(() => {
        if (opened) {
            ReservationRate(selectedId);
        }
    }, [ReservationRate, selectedId, opened]);

    useEffect(() => {
        if ((isSCanceled || isSuccess) && !hasNotified.current) {
            toast.success("تم تقييم الجلسة بنجاح");
            hasNotified.current = true;
        }
    }, [isSCanceled, isSuccess]);

    const handleConfirmRate = () => {
        hasNotified.current = false;
        if (rate) {//@ts-ignore
            newRateData({ reservation_id: selectedId, rate: selectedRate, id: rate.id });
        } else {//@ts-ignore
            ReservationRate({ reservation_id: selectedId, rate: selectedRate });
        }
        close();
    };

    return (
        <Modal radius={29} opened={opened} centered onClose={close}>
            <div className="flex flex-col justify-center items-center gap-2 text-center p-2">
                <h2 className="text-[#001F15] text-[24px] font-[600]">تقييم الجلسة العلاجية</h2>
                <p className="text-[14px] font-[500] text-[#45534E]">يهمنا رايك فى تقييم الجلسة العلاجية التى حصلت غليها لتشجيعنا على الاستمرار وتحسين الخدمة لتناسب احتياجاتكم</p>
                <Rating defaultValue={+rate?.rate} onChange={(value) => setSelectedRate(value)} color="#019867" size="lg" count={5} dir="ltr" />
                <Textarea
                    className="w-full"
                    radius="md"
                    label="تعليقك"
                    placeholder="يهمنا سماع رايك فى الجلسة العلاجية ..."
                />
                <div className="flex items-center gap-2 max-w-[220px]">
                    <button onClick={() => close()} className='text-[#FFF] hover:bg-[#019868d1] w-full transition text-[16px] font-[600] bg-[#019867] rounded-[50px] py-2 px-6'>العودة</button>
                    <button onClick={handleConfirmRate} className='hover:text-[#FFF] text-[#019868d1] w-full hover:bg-[#019868d1] transition text-[16px] font-[600] border-[1px] border-solid border-[#019868d1] rounded-[50px] py-2 px-6'>ارسال</button>
                </div>
            </div>
        </Modal>
    );
};

export default ReservationRate;