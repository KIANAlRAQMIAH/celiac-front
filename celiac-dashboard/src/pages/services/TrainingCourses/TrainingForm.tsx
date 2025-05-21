import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputComponent from "../../../components/reusableComponents/InputComponent";
import CustomTextAria from "../../../components/reusableComponents/CustomTextAria";
import { useCreatRecordMutation, useEditRecordMutation, useFindRecordQuery } from "../../../api/serveces";

export default function TrainingCourseForm({ openCloseModal, editData,
    resetEditData, }: { openCloseModal: React.Dispatch<React.SetStateAction<boolean>>,editData?: any;
        resetEditData?: React.Dispatch<any>; }) {
  const [createRecord, { isLoading }] = useCreatRecordMutation();
  const [formData, setFormData] = useState({
    name: "",
    course_date: new Date().toISOString().split("T")[0],
    starts_at: "10:00",
    ends_at: "12:00",
    address: "",
    max_attendees: "10",
    desc: "",
    details: "",
    certificate_fees: "10",
    training_period: "10",
    price: "10",
    photo: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const { data: recordUpdateData, isSuccess: recordIsSuccess } =
  useFindRecordQuery(
    { id: editData?.id, url: "training-courses" },
    { skip: editData === null }
  );
  const [editRecord, { isLoading: editIsLoading }] = useEditRecordMutation();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };
  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        name: recordUpdateData.data?.name || "",
        course_date: recordUpdateData.data?.course_date || new Date().toISOString().split("T")[0],
        starts_at: recordUpdateData.data?.starts_at?.slice(0, 5) || "10:00",
        ends_at: recordUpdateData.data?.ends_at?.slice(0, 5) || "12:00",
        address: recordUpdateData.data?.address || "",
        max_attendees: recordUpdateData.data?.max_attendees || 10,
        desc: recordUpdateData.data?.desc || "",
        details: recordUpdateData.data?.details || "",
        price: recordUpdateData.data?.price || "",
        certificate_fees: recordUpdateData.data?.certificate_fees || "",
        //  @ts-ignore
        is_active: recordUpdateData.data?.is_active ?? false,
        training_period:recordUpdateData.data?.training_period
      });
    }
  }, [recordIsSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("course_date", formData.course_date);
    data.append("starts_at", formData.starts_at);
    data.append("ends_at", formData.ends_at);
    data.append("address", formData.address);
    data.append("max_attendees", formData.max_attendees);
    data.append("desc", formData.desc);
    data.append("details", formData.details);
    data.append("certificate_fees", formData.certificate_fees);
    data.append("training_period", formData.training_period);
    data.append("price", formData.price);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {

if(editData?.id){
    data.append('_method', "PUT")
    const response = await editRecord({
        id: editData?.id,
        method: "POST",

        formData: data,
        url: "training-courses",
        inValid: ["training-courses"],
      })
      //  @ts-ignore
      if (response?.data?.status === 200) {
        toast.success("تمت العملية بنجاح");
        openCloseModal(false);
      } else {
        //  @ts-ignore
        toast.error(response?.error?.data?.message || "حدث خطأ");
      }
    //   setToastData(response);
}else{
    const res = await createRecord({
        formData: data,
        url: "training-courses",
        inValid: ["training-courses"],
      });
      //  @ts-ignore
      if (res?.data?.status === 200) {
        toast.success("تمت العملية بنجاح");
        openCloseModal(false);
      } else {
        //  @ts-ignore
        toast.error(res?.error?.data?.message || "حدث خطأ");
      }
}






    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 grid gap-4 grid-cols-12">
      <div className="col-span-12 md:col-span-6">
        <InputComponent type="text" label="اسم الدورة" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="col-span-12 md:col-span-6">
        <InputComponent label="تاريخ الدورة" type="date" name="course_date" value={formData.course_date} onChange={handleChange} required />
      </div>
      <div className="col-span-6">
        <InputComponent label="وقت البدء" type="time" name="starts_at" value={formData.starts_at} onChange={handleChange} required />
      </div>
      <div className="col-span-6">
        <InputComponent label="وقت الانتهاء" type="time" name="ends_at" value={formData.ends_at} onChange={handleChange} required />
      </div>
      <div className="col-span-12">
        <InputComponent type="text" label="العنوان" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="col-span-6">
        <InputComponent label="الحد الأقصى للحضور" type="number" name="max_attendees" value={formData.max_attendees} onChange={handleChange} required />
      </div>
      <div className="col-span-6">
        <InputComponent label="مدة التدريب" type="number" name="training_period" value={formData.training_period} onChange={handleChange} required />
      </div>
      <div className="col-span-6">
        <InputComponent label="السعر" type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div className="col-span-6">
        <InputComponent label="رسوم الشهادة" type="number" name="certificate_fees" value={formData.certificate_fees} onChange={handleChange} required />
      </div>
      <div className="col-span-12">
        <CustomTextAria  placeholder="أدخل تفاصيل برنامج الطهي" label="الوصف" name="desc" value={formData.desc} onChange={handleChange} required />
      </div>
      <div className="col-span-12">
        <CustomTextAria placeholder="أدخل تفاصيل برنامج الطهي" label="تفاصيل الدورة" name="details" value={formData.details} onChange={handleChange} required />
      </div>
      <div className="col-span-12">
        <label className="block text-sm font-medium mb-2">صورة الدورة</label>
        <input type="file" name="photo" accept="image/*" onChange={handleFileChange} required={editData === null}/>
      </div>
      <div className="col-span-12 flex justify-end">
        <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg">
          إرسال
        </button>
      </div>
    </form>
  );
}
