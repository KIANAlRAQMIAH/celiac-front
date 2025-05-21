import React, { Dispatch, useEffect } from "react";
import { toast } from "react-toastify";
import { useFindRecordQuery } from "../../../api/serveces";
import useDeleteConfirmation from "../../../hooks/useDeleteConfirmation";

export default function EventsDetails({
  viewId,
  resetViewData,
  setEditData,
  openCloseModal,
}: {
  viewId?: number | null;
  resetViewData?: Dispatch<any>;
  setEditData: Dispatch<any>;
  openCloseModal: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isLoading, isSuccess } = useFindRecordQuery(
    { id: viewId, url: "cooking-courses" },
    { skip: viewId === null }
  );

  useEffect(() => {
    if (isLoading) {
      toast.loading("جاري التحميل...", {
        toastId: "loadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loadingToast");
    }
  }, [isLoading]);

  const deleteSubmitHandler = useDeleteConfirmation({
    url: "cooking-courses",
    inValid: "cooking-courses",
    openCloseModal,
  });

  const event = data?.data;

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {event?.name ?? "بدون عنوان"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Detail label="تاريخ الدورة" value={event?.course_date ?? "غير متوفر"} />
        <Detail label="وقت البدء" value={event?.starts_at?.slice(0, 5) ?? "غير متوفر"} />
        <Detail label="وقت الانتهاء" value={event?.ends_at?.slice(0, 5) ?? "غير متوفر"} />
        <Detail label="عدد الحضور الأقصى" value={event?.max_attendees ?? "غير متوفر"} />
        <Detail label="الرسوم" value={event?.price ? `${event.price} ريال` : "غير متوفر"} />
        <Detail label="رسوم الشهادة" value={event?.certificate_fees ? `${event.certificate_fees} ريال` : "غير متوفر"} />
        {event?.address && <Detail label="العنوان" value={event.address} />}
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-gray-500">الوصف:</p>
        <p className="text-base text-gray-700">{event?.desc || "غير متوفر"}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">التفاصيل:</p>
        <p className="text-base text-gray-700">{event?.details || "غير متوفر"}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-gray-500">الحالة:</p>
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            event?.active_class === "danger"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {event?.active_status ?? "غير محددة"}
        </span>
      </div>

      <div className="flex gap-4 justify-end mt-6">
        <button
          onClick={() => setEditData({ id: viewId })}
          className="py-3 px-6 bg-primary text-white rounded-[12px] font-semibold"
        >
          تعديل
        </button>
        <button
        // @ts-ignore
          onClick={() => deleteSubmitHandler(viewId)}
          className="py-3 px-6 bg-red-500 text-white rounded-[12px] font-semibold"
        >
          حذف
        </button>
      </div>
    </div>
  );
}

const Detail = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}:</p>
    <p className="text-base text-gray-700">{value}</p>
  </div>
);
