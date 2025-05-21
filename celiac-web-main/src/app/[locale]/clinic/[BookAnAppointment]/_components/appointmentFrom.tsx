"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Group,
  Input,
  PasswordInput,
  Radio,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";

import { FaCalendar } from "react-icons/fa6";
import { DateInput, DateValue } from "@mantine/dates";
import "../../../../../components/consultation/style.css";

import { Paper } from "@mantine/core";
import CustomInputWithIcon from "@/components/Auth/CustomnputWithIcon/CustomInputWithIcon";
import { number, z } from "zod";
import { toast } from "react-toastify";
import { useCreateReservationMutation } from "@/api/Clinic/ClinicApiSlice";
import { useRouter } from "next/router";
export const formSchema = z.object({
  name: z
    .string()
    .nonempty("يجب إدخال الإسم بشكل صحيح")
    .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
    .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
  phone: z
    .string()
    .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام")
    .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك "),
  email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
  birthdate: z.date({
    required_error: "قم ب إدخال تاريخ الميلاد",
    invalid_type_error: "قم ب إدخال تاريخ الميلاد",
  }),
  residency_number: z
    .string()
    .min(9, "يجب إدخال رقم اقامه لا  يقل عن 9 أرقام ")
    .max(15, "يجب إدخال 15 رقما فقط"),
  is_saudi: z.boolean(),

  // civil_id: z
  //   .string()
  //   .min(9, "يجب إدخال رقم اقامة لا يقل عن 9 أرقام ")
  //   .max(15, "يجب إدخال 15 أرقام فقط"),
});

export const formSchema1 = z.object({
  name: z
    .string()
    .nonempty("يجب إدخال الإسم بشكل صحيح")
    .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
    .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
  phone: z
    .string()
    .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام")
    .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك "),
  email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
  birthdate: z.date({
    required_error: "قم ب إدخال تاريخ الميلاد",
    invalid_type_error: "قم ب إدخال تاريخ الميلاد",
  }),
  // residency_number: z
  //   .string()
  //   .min(10, "يجب إدخال رقم هوية لا يقل عن 10 أرقام ")
  //   .max(10, "يجب إدخال 10 أرقام فقط"),
  is_saudi: z.boolean(),

  civil_id: z
    .string()
    .min(10, "يجب إدخال رقم هويه لا يقل عن 10 أرقام ")
    .max(10, "يجب إدخال 10 أرقام فقط"),
});
import { redirect } from "next/navigation";
import { useUpdateReservationMutation } from "@/api/profileApiSlice";
// export const phoneSchema = z
//   .number(phone :z.number().min(9, "");)

// const phoneSchema = z.number().min(9, "يجب ادخال رقم هاتف مكون من تسعه ارقام");
interface signUpfromData {
  name: string;
  phone: string;
  email: string;
  birthdate: DateValue | null;
  residency_number?: string;
  civil_id?: string;
  gender: string;
  is_saudi: boolean;
  BookAnAppointment?: string
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  birthdate: null,
  residency_number: "",
  civil_id: "",
  is_saudi: true,
  gender: "1",
  BookAnAppointment: "null",
};

const AppointmentForm = ({
  prevStep,
  clinic_id,
  scheduled_date,
  scheduled_time,
  type,
  BookAnAppointment
}: any) => {
  const [formData, setFormData] = useState<signUpfromData>(initialFormData);

  const [createReservation, { isLoading }] = useCreateReservationMutation();
  const [updateReservation, { isLoading: updateReservationLoading }] = useUpdateReservationMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastData, setToastData] = useState<any>({});
  useEffect(() => {
    console.log(toastData)
    if (toastData?.status === 200) {
      toast.success("تم حجز الموعد بنجاح", {
        autoClose: 5000, // Automatically close after 5 seconds
      });
      setToastData({});
      setFormData(initialFormData);
      redirect("/en/profile/myReservations");
    }

    if (toastData?.error?.status === 422) {
      toast.error(toastData?.error?.data?.message, {
        autoClose: 5000, // Automatically close after 5 seconds
      });
      setToastData({});
    }
    if (isLoading || updateReservationLoading) {
      toast.loading("Loading...", {
        toastId: "loadingToast",
        autoClose: false,
      });
    } else {
      // Dismiss loading toast if it's visible
      toast.dismiss("loadingToast");
    }
  }, [toastData, updateReservationLoading, isLoading]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setNumberForVerifyCode(formData.phone);

    if (formData.is_saudi === true) {
      const fomDataWithSaudi = { ...formData };
      // delete fomDataWithSaudi.civil_id;
      delete fomDataWithSaudi.residency_number;

      //@ts-ignore
      const result = formSchema1.safeParse(fomDataWithSaudi);
      if (!result.success) {
        // @ts-ignore
        setErrors(result.error.formErrors.fieldErrors);
        return;
      }
      const formattedDate = `${new Date(
        //@ts-ignore
        fomDataWithSaudi.birthdate
      ).getFullYear()}-${
        //@ts-ignore
        new Date(fomDataWithSaudi.birthdate).getMonth() + 1
        //@ts-ignore
        }-${new Date(fomDataWithSaudi.birthdate).getDate()}`;
      //@ts-ignore
      fomDataWithSaudi.birthdate = formattedDate;

      const finalData = {
        clinic_id: BookAnAppointment != 'BookAnAppointment' ? BookAnAppointment : clinic_id,
        type,
        scheduled_date,
        scheduled_time,
        patient_name: fomDataWithSaudi.name,
        patient_phone: fomDataWithSaudi.phone,
        gender: fomDataWithSaudi.gender,
        email: fomDataWithSaudi.email,
        dob: fomDataWithSaudi.birthdate,
        is_saudi: fomDataWithSaudi.is_saudi,
        national_id: fomDataWithSaudi.civil_id,

      };
    if(BookAnAppointment !== "BookAnAppointment"){
      //@ts-ignore
     const data =  await updateReservation(finalData).unwrap()
     setToastData(data);
    }else{
  const data = await createReservation(finalData).unwrap();
  setToastData(data);
    }
      
    
    } else {
      const fomDataWithNonSaudi = { ...formData };
      // delete fomDataWithNonSaudi.residency_number;
      delete fomDataWithNonSaudi.civil_id;

      const result = formSchema.safeParse(fomDataWithNonSaudi);
      if (!result.success) {
        // @ts-ignore
        setErrors(result.error.formErrors.fieldErrors);
        return;
      }
      const formattedDate = `${new Date(
        //@ts-ignore
        fomDataWithNonSaudi.birthdate
      ).getFullYear()}-${
        //@ts-ignore
        new Date(fomDataWithNonSaudi.birthdate).getMonth() + 1
        //@ts-ignore
        }-${new Date(fomDataWithNonSaudi.birthdate).getDate()}`;
      //@ts-ignore
      fomDataWithNonSaudi.birthdate = formattedDate;
      const finalData = {
        clinic_id: BookAnAppointment != 'BookAnAppointment' ? BookAnAppointment : clinic_id,
        type,
        scheduled_date,
        scheduled_time,
        patient_name: fomDataWithNonSaudi.name,
        patient_phone: fomDataWithNonSaudi.phone,
        gender: fomDataWithNonSaudi.gender,
        email: fomDataWithNonSaudi.email,
        dob: fomDataWithNonSaudi.birthdate,
        is_saudi: fomDataWithNonSaudi.is_saudi,
        residency_number: fomDataWithNonSaudi.residency_number,
      };
      console.log(BookAnAppointment)
      const data = BookAnAppointment//@ts-ignore
        ? await updateReservation(finalData).unwrap()
        : await createReservation(finalData).unwrap();
      // @ts-ignore
      setToastData(data);
    }
    // const result = formSchema.safeParse(formData);
    // phoneSchema.safeParse(phone);
  };
  return (
    <div className="">
      <div className="">
        {/* <Breadcrumb ></Breadcrumb> */}
        <div className="sm:w-[100%] text-center m-auto">
          <Paper radius={25}>
            <form>
              <div className="flex flex-col gap-[24px] text-start w-[100%] p-[24px]">
                <div className="flex flex-col gap-[12px]  w-[100%]">
                  <TextInput
                    size="lg"
                    rightSectionPointerEvents="none"
                    radius={40}
                    label="الاسم كاملا"
                    placeholder="ادخل الاسم كاملا"
                    name="name"
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-[red] font-normal">{errors.name[0]}</p>
                  )}
                  {/* <NumberInput onChange={setPhone} /> */}
                  <CustomInputWithIcon
                    label="رقم الجوال"
                    placeholder="رقم الجوال"
                    handleChange={handleChange}
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <p className="text-[red] font-normal">{errors.phone[0]}</p>
                  )}
                  <TextInput
                    size="lg"
                    rightSectionPointerEvents="none"
                    radius={40}
                    label=" البريد الالكترونى"
                    placeholder=" ex: someone@gmail.com"
                    type="email"
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-[red] font-normal">{errors.email[0]}</p>
                  )}
                  <DateInput
                    maxDate={new Date()}
                    size="lg"
                    valueFormat="YYYY/MM/DD"
                    rightSectionPointerEvents="none"
                    radius={40}
                    label=" تاريخ الميلاد"
                    placeholder="dd - mm - yy"
                    rightSection={<FaCalendar />}
                    name="birthdate"
                    // valueFormat="YYYY MMM DD"
                    onChange={(value) =>
                      setFormData({ ...formData, birthdate: value })
                    }
                  />
                  {errors.birthdate && (
                    <p className="text-[red] font-normal">
                      {errors.birthdate[0]}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 ">
                    <div className="flex gap-3">
                      <Radio
                        size="xs"
                        color="primary"
                        name="is_saudi"
                        onChange={() =>
                          setFormData({ ...formData, is_saudi: true })
                        }
                        label="سعودي "
                        checked={formData.is_saudi}
                      />
                      <Radio
                        color="primary"
                        size="xs"
                        checked={!formData.is_saudi}
                        onChange={() =>
                          setFormData({ ...formData, is_saudi: false })
                        }
                        label="مقيم "
                      />
                    </div>

                    {!formData.is_saudi && (
                      <>
                        <TextInput
                          size="lg"
                          rightSectionPointerEvents="none"
                          radius={40}
                          placeholder=" رقم الاقامه"
                          type="number"
                          onChange={handleChange}
                          name="residency_number"
                        />

                        {errors.residency_number && (
                          <p className="text-[red] font-normal">
                            {errors.residency_number[0]}
                          </p>
                        )}
                      </>
                    )}

                    {formData.is_saudi && (
                      <>
                        <TextInput
                          size="lg"
                          rightSectionPointerEvents="none"
                          radius={40}
                          placeholder=" رقم الهويه"
                          type="number"
                          onChange={handleChange}
                          name="civil_id"
                        />
                        {errors.civil_id && (
                          <p className="text-[red] font-normal">
                            {errors.civil_id[0]}
                          </p>
                        )}
                      </>
                    )}
                    <div className="flex gap-3">
                      <Radio
                        size="xs"
                        color="primary"
                        name="gender"
                        onChange={() =>
                          setFormData({ ...formData, gender: "1" })
                        }
                        label="ذكر "
                        checked={formData.gender === "1"}
                      />
                      <Radio
                        color="primary"
                        size="xs"
                        checked={formData.gender === "2"}
                        onChange={() =>
                          setFormData({ ...formData, gender: "2" })
                        }
                        label="انثي "
                      />
                    </div>
                    <div className="flex justify-start">
                      <div className="flex justify-center gap-7">
                        <button
                          className="bg-[#019867] text-[white] px-[4px] py-[8px] w-[219px] rounded-[50px]"
                          onClick={prevStep}
                        >
                          رجوع
                        </button>
                        <button
                          //@ts-ignore
                          onClick={handleSubmit}
                          disabled={isLoading}
                          className="bg-[transparent] hover:bg-[#019867] hover:text-[#FFF] transition text-[#019867] border-solid border-[1px] border-[#019867] px-[4px] py-[8px] w-[219px] rounded-[50px]"
                        >
                          {isLoading ? "loading..." : "تاكيد الحجز"}{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
