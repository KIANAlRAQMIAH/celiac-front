import { Modal } from "@mantine/core";
import Image from "next/image";
import { useDeleteReservationMutation } from "@/api/profileApiSlice";
import { toast } from "react-toastify";
import warnind from '../../../../../../public/warning.png';
import { useEffect, useRef } from "react";

type IDeleteModal = {
    opened: boolean;
    close: () => void;
    selectedIdDelete: any;
};

const DeleteModal = ({ opened, close, selectedIdDelete }: IDeleteModal) => {
    const [deleteReservation, { isLoading, isSuccess, isError }] = useDeleteReservationMutation();
    const hasNotified = useRef(false);

    useEffect(() => {
        if (isSuccess && !hasNotified.current) {
            toast.success("تم حذف الحجز بنجاح");
            hasNotified.current = true;
        } else if (isError && !hasNotified.current) {
            toast.error("فشل في حذف الحجز");
            hasNotified.current = true;
        }
    }, [isSuccess, isError]);

    const handleConfirmDelete = async () => {
        hasNotified.current = false; // Reset the notification flag before making a new request
        try {
            await deleteReservation(selectedIdDelete).unwrap();
            close();
        } catch (error) {
            console.error("Failed to delete reservation", error);
        }
    };

    return (
        <Modal radius={29} opened={opened} centered onClose={close}>
            <div className="flex flex-col justify-center items-center gap-2 text-center p-2">
                <Image className="w-[150px] object-contain" src={warnind} alt='warning' />
                <p className="text-[20px] font-[600] text-[#001F15]">هل أنت متأكد من حذف موعد الحجز رقم #{selectedIdDelete} من تاريخ الحجوزات الخاص بك ؟</p>
                <div className="flex items-center gap-2 max-w-[220px]">
                    <button onClick={close} className='text-[#FFF] hover:bg-[#019868d1] w-full transition text-[14px] font-[600] bg-[#019867] rounded-[50px] py-2 px-6'>إلغاء</button>
                    <button onClick={handleConfirmDelete} className='hover:text-[#FFF] text-[#019868d1] w-full hover:bg-[#019868d1] transition text-[14px] font-[600] border-[1px] border-solid border-[#019868d1] rounded-[50px] py-2 px-6'>
                        {isLoading ? "جاري الحذف..." : "تأكيد"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;