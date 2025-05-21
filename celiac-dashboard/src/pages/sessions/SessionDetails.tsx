import React, { Dispatch } from "react";
import { toast } from "react-toastify";
import { useFindRecordQuery } from "../../api/serveces";
import useDeleteConfirmation from "../../hooks/useDeleteConfirmation";

export default function SessionDetails({
    viewId,
    resetViewData,
    setEditData,
  openCloseModal,
}: {
    viewId?: any;
    resetViewData?: React.Dispatch<any>;
    setEditData: Dispatch<any>,
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, isLoading } = useFindRecordQuery(
    { id: viewId, url: "therapy-sessions" },
    { skip: viewId === null }
  );

  if (isLoading) {
    toast.loading("جاري التحميل...", {
      toastId: "loadingToast",
      autoClose: false,
    });
  } else {
    toast.dismiss("loadingToast");
  }
  const deleteSubmitHandler = useDeleteConfirmation({ url: 'therapy-sessions', inValid: 'therapy-sessions' , openCloseModal });
  return (
    <>
      <div className="w-full mx-auto p-6 bg-white shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{data?.data.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">تاريخ الجلسة:</p>
            <p className="text-base text-gray-700">{data?.data.session_date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">وقت البدء:</p>
            <p className="text-base text-gray-700">{data?.data.starts_at}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">وقت الانتهاء:</p>
            <p className="text-base text-gray-700">{data?.data.ends_at}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">نوع الجلسة:</p>
            <p className="text-base text-gray-700">{data?.data.session_type_text}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">عدد الحضور الأقصى:</p>
            <p className="text-base text-gray-700">{data?.data.max_attendees}</p>
          </div>
          {data?.data?.address && (
            <div>
              <p className="text-sm font-medium text-gray-500">العنوان:</p>
              <p className="text-base text-gray-700">{data?.data.address}</p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">الوصف:</p>
          <p className="text-base text-gray-700">{data?.data.desc}</p>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">التفاصيل:</p>
          <p className="text-base text-gray-700">{data?.data.details}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-500">الحالة:</p>
          <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              data?.data.active_class === "danger"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {data?.data.active_status}
          </span>
        </div>
        <div className="flex gap-4 justify-end">

            <button onClick={()=>setEditData({id:viewId})} className="py-3 px-6 bg-primary text-white rounded-[12px] font-semibold">تعديل</button>
            <button onClick={()=>{
                
                 deleteSubmitHandler(viewId)
             
                
                
                }} className="py-3 px-6 bg-red-500 text-white rounded-[12px] font-semibold">حذف</button>
        </div>
      </div>
    </>
  );
}
