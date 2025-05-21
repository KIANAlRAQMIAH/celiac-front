import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showAlert } from "../../../components/Error";
import InputComponent from "../../../components/reusableComponents/InputComponent";
import CustomTextAria from "../../../components/reusableComponents/CustomTextAria";
import { useCreatRecordMutation, useEditRecordMutation, useFindRecordQuery } from "../../../api/serveces";

interface Event {
  name: string;
  event_date: string;
  starts_at: string;
  ends_at: string;
  event_type: string;
  address?: string;
  max_attendees: number;
  desc: string;
  details: string;
}

const defaultEvent: Event = {
  name: "",
  event_date: new Date().toISOString().split("T")[0],
  starts_at: "10:00",
  ends_at: "12:00",
  event_type: "1",
  max_attendees: 10,
  desc: "",
  details: "",
  address: "",
};

export default function EventsForm({
  editData,
  resetEditData,
  openCloseModal,
}: {
  editData?: any;
  resetEditData?: React.Dispatch<any>;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: recordUpdateData, isSuccess: recordIsSuccess } =
    useFindRecordQuery(
      { id: editData?.id, url: "events" },
      { skip: editData === null }
    );

  const [formData, setFormData] = useState(defaultEvent);

  const closeModal = () => {
    openCloseModal((prevState) => !prevState);
    if (resetEditData) {
      resetEditData([]);
    }
  };

  useEffect(() => {
    if (recordIsSuccess) {
      setFormData({
        name: recordUpdateData.data?.name || "",
        event_date: recordUpdateData.data?.event_date || new Date().toISOString().split("T")[0],
        starts_at: recordUpdateData.data?.starts_at.slice(0,5) || "10:00",
        ends_at: recordUpdateData.data?.ends_at.slice(0,5) || "12:00",
        event_type: String(recordUpdateData.data?.event_type) || "1",
        max_attendees: recordUpdateData.data?.max_attendees || 10,
        desc: recordUpdateData.data?.desc || "",
        details: recordUpdateData.data?.details || "",
        address: recordUpdateData.data?.address || "",
      });
    }
  }, [recordIsSuccess]);

  const [toastData, setToastData] = useState<any>({});
  const [createRecord, { isLoading: createIsLoading }] = useCreatRecordMutation();
  const [editRecord, { isLoading: editIsLoading }] = useEditRecordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (toastData?.data?.status === 200) {
      showAlert("Success", "تمت العملية بنجاح");
      setToastData({});
      closeModal();
    }
    if (toastData?.error) {
      toast.error(toastData?.error?.data?.message);
      setToastData({});
    }
    if (createIsLoading||editIsLoading) {
      toast.loading("Loading...", {
        toastId: "loadingToast",
        autoClose: false,
      });
    } else {

      toast.dismiss("loadingToast");
    }
  }, [toastData, createIsLoading, editIsLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editData?.id) {
        const response = await editRecord({
          id: editData?.id,
          method: "PUT",
          formData,
          url: "events",
          inValid: ["events"],
        });
        setToastData(response);
      } else {
        const response = await createRecord({
          formData,
          url: "events",
          inValid: ["events"],
        });
        setToastData(response);
      }
    } catch (err) {
      setToastData(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
      <div className="grid gap-6 mb-4 grid-cols-12">
        {/* Name */}
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label="اسم الفعاليه"
            onChange={handleChange}
            required
            type="text"
            name="name"
            placeholder="أدخل اسم الفعاليه"
            value={formData.name}
          />
        </div>

        {/* Event Date */}
        <div className="lg:col-span-6 col-span-12">
          <InputComponent
            label="تاريخ الفعاليه"
            onChange={handleChange}
            required
            type="date"
            name="event_date"
            value={formData.event_date}
          />
        </div>

        {/* Start & End Time */}
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

        {/* Event Type */}

        {/* Description & Details */}
        <div className="lg:col-span-6 col-span-12">
          <CustomTextAria
            label="وصف الفعاليه"
            onChange={handleChange}
            required
            name="desc"
            placeholder="أدخل وصف الفعاليه"
            value={formData.desc}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <CustomTextAria
            label="تفاصيل الفعاليه"
            onChange={handleChange}
            required
            name="details"
            placeholder="أدخل تفاصيل الفعاليه"
            value={formData.details}
          />
        </div>
      </div>
      <div className="lg:col-span-6 col-span-12">
          <label className="block text-sm font-medium text-gray-700">نوع الفعاليه</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="event_type"
                value="1"
                checked={formData.event_type === "1"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>حضوري</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="event_type"
                value="2"
                checked={formData.event_type === "2"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>عن بعد</span>
            </label>
          </div>
        </div>

        {/* Address Field (Only for Physical Events) */}
        {formData.event_type === "1" && (
          <div className="lg:col-span-6 col-span-12">
            <InputComponent
              label="العنوان"
              onChange={handleChange}
              required
              type="text"
              name="address"
              placeholder="أدخل عنوان الفعاليه"
              value={formData.address || ""}
            />
          </div>
        )}

      {/* Submit Button */}
      <div className="w-full  mt-4 flex justify-end">
        <button type="submit" className="text-white bg-black rounded-lg text-sm px-5 py-2.5">
          {editData ? "تعديل" : "إضافة"}
        </button>
      </div>
    </form>
  );
}
