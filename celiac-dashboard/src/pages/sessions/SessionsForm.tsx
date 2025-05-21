import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { showAlert } from "../../components/Error";

import InputComponent from "../../components/reusableComponents/InputComponent";



import Upload_cover from "../../components/reusableComponents/Upload_Cover";

import { useTranslation } from "react-i18next";
import CustomTextAria from "../../components/reusableComponents/CustomTextAria";
import { useCreatRecordMutation, useEditRecordMutation, useFindRecordQuery } from "../../api/serveces";


interface TherapySession {
  name: string;
  session_date: string; 
  starts_at: string;    
  ends_at: string;      
  session_type: string; 
  address?: string;     
  max_attendees: number;
  desc: string;
  details: string;
}


const defaultTherapySession: TherapySession = {
  name: "",
  session_date: new Date().toISOString().split("T")[0],
  starts_at: "10:00",
  ends_at: "12:00",
  session_type: "2",
  max_attendees: 10,
  desc: "",
  details: "",
  address:''
};



export default function SessionsForm({
  editData,
  resetEditData,
  openCloseModal,
}: {
  editData?: any;
  resetEditData?: React.Dispatch<any>;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: recordUpdateData, isLoading, isSuccess: recordIsSuccess } =
    useFindRecordQuery(
      { id: editData?.id, url: "therapy-sessions" },
      { skip: editData === null }
    );
    const {t} = useTranslation()
    
  const [formData, setFormData] = useState(defaultTherapySession);
 
  
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
      resetEditData([]);
    }
  };
 
 

  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        name: recordUpdateData.data?.name || "", // Default to an empty string if name is undefined
        session_date: recordUpdateData.data?.session_date || new Date().toISOString().split("T")[0],
        starts_at: recordUpdateData.data?.starts_at.slice(0,5) || "10:00",
        ends_at: recordUpdateData.data?.ends_at.slice(0,5) || "12:00",
        session_type: String(recordUpdateData.data?.session_type) || "2",
        max_attendees: recordUpdateData.data?.max_attendees || 10,
        desc: recordUpdateData.data?.desc || "",
        details: recordUpdateData.data?.details || "",
        address: recordUpdateData.data?.address || "",
      });
      
      setFile(recordUpdateData?.data?.image);


     
    }
  }, [recordIsSuccess]);
  // const [options, setOptions] = useState<{ value: any; label: string }[]>([]);

  const [toastData, setToastData] = useState<any>({});

  const [createRecord, { isLoading:createIsLoading }] = useCreatRecordMutation();

  // const [editCity ] = useEditCityMutation()
  const [editRecord, {isLoading:editIsLoading}] = useEditRecordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      showAlert("Added", "تمت الاضافة بنجاح");

      setToastData({});
      closeModal();
    }

    if (toastData?.error?.status === 422) {
      toast.error(toastData?.error?.data?.message, {});
      setToastData({});
    }
    if (toastData?.error?.status === 500) {
      toast.error(toastData?.error?.data?.message, {});
      setToastData({});
    }

    if (isLoading|| createIsLoading || editIsLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading, createIsLoading, editIsLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

   
   
    
    try {
      if (editData?.id) {
      
        const response = await editRecord({
          id: editData?.id,
          method:"PUT",
          formData:formData ,
          url: "therapy-sessions",
          inValid: ["therapy-sessions"],
        });
        console.log(response);
        setToastData(response);
      } else {
        const response = await createRecord({
          formData: formData,
          url: "therapy-sessions",
          inValid: ["therapy-sessions"],
        });
         console.log(response);
        setToastData(response);
      }
    } catch (err) {
      setToastData(err);
    }
  };
  return (
    <>
   <form onSubmit={handleSubmit} className="p-4 md:p-5 ">
  <div className="grid gap-6 mb-4 grid-cols-12">
    {/* Name */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label="اسم الجلسة"
        onChange={handleChange}
        required
        type="text"
        name="name"
        placeholder="أدخل اسم الجلسة"
        value={formData.name}
      />
    </div>

    {/* Session Date */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label="تاريخ الجلسة"
        onChange={handleChange}
        required
        type="date"
        name="session_date"
        value={formData.session_date}
      />
    </div>

    {/* Start Time */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label="وقت البدء"
        onChange={handleChange}
        required
        type="time"
        name="starts_at"
        value={formData.starts_at}
      />
    </div>

    {/* End Time */}
    <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label="وقت الانتهاء"
        onChange={handleChange}
        required
        type="time"
        name="ends_at"
        value={formData.ends_at}
      />
    </div>

   
  

    {/* Description */}
    <div className="lg:col-span-6 col-span-12">
      <CustomTextAria
        label="وصف الجلسة"
        onChange={handleChange}
        required
        name="desc"
        placeholder="أدخل وصف الجلسة"
        value={formData.desc}
      />
    </div>

    {/* Details */}
    <div className="lg:col-span-6 col-span-12">
      <CustomTextAria
        label="تفاصيل الجلسة"
        onChange={handleChange}
        required
        name="details"
        placeholder="أدخل تفاصيل الجلسة"
        value={formData.details}
      />
    </div>
  {/* Max Attendees */}
  <div className="lg:col-span-6 col-span-12">
      <InputComponent
        label="الحد الأقصى للحضور"
        onChange={handleChange}
        required
        type="number"
        name="max_attendees"
        placeholder="أدخل الحد الأقصى للحضور"
        value={formData.max_attendees.toString()}
      />
    </div>
     {/* Session Type Radio Buttons */}
     <div className="lg:col-span-6 col-span-12">
      <label className="block text-sm font-medium text-gray-700">
        نوع الجلسة
      </label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="session_type"
            value="1"
            checked={formData.session_type === "1"}
            onChange={handleChange}
            className="form-radio"
          />
          <span>حضورية</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="session_type"
            value="2"
            checked={formData.session_type === "2"}
            onChange={handleChange}
            className="form-radio"
          />
          <span>عن بعد</span>
        </label>
      </div>
    </div>

    {/* Address Field (Conditional) */}
    {formData.session_type === "1" && (
      <div className="lg:col-span-6 col-span-12">
        <InputComponent
          label="العنوان"
          onChange={handleChange}
          required
          type="text"
          name="address"
          placeholder="أدخل عنوان الجلسة"
          value={formData.address || ""}
        />
      </div>
    )}

    {/* Upload Cover */}
    {/* <div className="col-span-12 mt-7">
      <Upload_cover setFile={setFile} editImgUrl={file?.original_url} />
    </div> */}
  </div>

  {/* Submit Button */}
  <div className="w-full flex justify-end">
    <button
      type="submit"
      className="text-white flex bg-gradient-to-r from-[black] to-[black] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      <svg
        className="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      {editData ? "تعديل" : "إضافة"}
    </button>
  </div>
</form>



    </>
  );
}
