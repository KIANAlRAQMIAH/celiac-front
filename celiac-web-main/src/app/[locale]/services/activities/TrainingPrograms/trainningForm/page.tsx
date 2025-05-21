"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Paper, Radio, Select, TextInput } from "@mantine/core";
import { FaCalendar } from "react-icons/fa6";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateInput, DateValue } from "@mantine/dates";
import { toast } from "react-toastify";
import CustomInputWithIcon from "@/components/Auth/CustomnputWithIcon/CustomInputWithIcon";
import { z } from "zod";
import { useCreateVolunteerRequestMutation, useTrainingRequestMutation } from "@/api/serveces";
import { modelActions } from "@/store/modelSlice";
import { authActions } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import Breadcrumb from "@/components/Breadcrumb";

// Remove the export keyword to make this a local variable
const formSchema = z
    .object({
        full_name: z
            .string()
            .nonempty("يجب إدخال الإسم بشكل صحيح")
            .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
            .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
        volunteering_field: z
            .string()
            .nonempty("يجب اختيار مجال التطوع بشكل صحيح"),
        phone: z
            .string()
            .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام")
            .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك ")
            .max(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام فقط"),

        email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),

        dob: z.date({
            required_error: "قم ب إدخال تاريخ الميلاد",
            invalid_type_error: "قم ب إدخال تاريخ الميلاد",
        }),


    })
interface celiacCardFromData {
    full_name: string;
    phone: string;
    email: string;
    dob: DateValue | null;
    residency_number?: string;
    national_id?: string;
    is_saudi: string;
    gender: string;
    is_student: boolean
    job?: string;
    study_field?: string
    
    work_field:string
}

const initialFormData = {
    full_name: "",
    phone: "",
    email: "",
    dob: null,
    residency_number: "",
    national_id: "",
    is_saudi: "1",
    gender: "1",
    is_student: true,
    job: "",
    study_field: "",
    work_field:"",
    

};
dayjs.extend(customParseFormat);
const TrainningAndPreparingForm = () => {
     const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/ar/services" },
        { title: "الأنشطة", link: "/ar/services/activities" },
        { title: "البرامج التدريبية", link: "/ar/services/activities/TrainingPrograms" },
        { title: "تأكيد الاشتراك", link: "/ar/services/activities/TrainingPrograms/trainningAndPreparingFrom" }
    ];
    const [formData, setFormData] = useState<celiacCardFromData>(initialFormData);
    const [trainingRequest, { isLoading }] = useTrainingRequestMutation()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toastData, setToastData] = useState<any>({});
    const dispatch = useDispatch()
    useEffect(() => {
        if (toastData?.data?.status === 200) {
            toast.success(" تم ارسال بياناتك  بنجاح  بانتظار الموافقه   ", {
                autoClose: 9000, // Automatically close after 5 seconds
            });
            setToastData({});
        }
        if (toastData?.error?.data?.status === 409) {
            toast.error(toastData?.error?.data?.errors.message[0], {
                autoClose: 9000, // Automatically close after 5 seconds
            });
            setToastData({});
        }
        if (toastData?.error?.status === 422) {
            toast.error(toastData?.error?.data?.message, {
                autoClose: 5000, // Automatically close after 5 seconds
            });
            setToastData({});
        }
        if (isLoading) {
            toast.loading("Loading...", {
                toastId: "loadingToast",
                autoClose: false,
            });
        } else {
            // Dismiss loading toast if it's visible
            toast.dismiss("loadingToast");
        }

    }, [toastData, isLoading]);
    // };
    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const openModelAction = () => {
        dispatch(modelActions.openModel());
        dispatch(authActions.setValidationMessage("هذه الخدمة متاحة فقط للاعضاء , من فضلك قم بتسجيل دخولك الى الموقع لتستطيع طلب الخدمة "))
      };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const token = localStorage.getItem("celiacToken")
        if (!token) {
            openModelAction()
            return
          }
      
        e.preventDefault();
        const fomDataWithSaudi = { ...formData };
        if (formData.is_saudi === "1") {
            delete formData.residency_number;
        } else {
            delete formData.national_id;
        }
        if (formData.is_student) {
            // delete formData.work_field;
        } 
        else {
            delete formData.study_field;
        }

        setErrors({})
        //@ts-ignore
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
        }

        const formattedDate = `${new Date(
            //@ts-ignore
            formData.dob
        ).getFullYear()}-${
            //@ts-ignore
            new Date(formData.dob).getMonth() + 1
            //@ts-ignore
            }-${new Date(fomDataWithSaudi.dob).getDate()}`;
        console.log(formattedDate);
        //@ts-ignore
        formData.dob = formattedDate;
        const data = await trainingRequest(formData);
        console.log(data);
        // @ts-ignore

        setToastData(data);
    }
    return (
        <>

            <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center     m-auto">
  <Breadcrumb items={breadcrumbData} />
                <Paper radius={25} shadow="md">
                    <div className="p-[32px]">
                        <div className="gap-[32px]">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] text-start">

                                <TextInput
                                    size="lg"
                                    rightSectionPointerEvents="none"
                                    radius={40}
                                    label="الاسم كاملا"
                                    placeholder="ادخل الاسم كاملا"
                                    name="full_name"
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
                                    name="dob"
                                    // valueFormat="YYYY MMM DD"
                                    onChange={(value) =>
                                        setFormData({ ...formData, dob: value })
                                    }
                                />
                                {errors.dob && (
                                    <p className="text-[red] font-normal">
                                        {errors.dob[0]}
                                    </p>
                                )}

                                <div className="flex flex-col gap-4 ">
                                    <div className="flex gap-3">
                                        <Radio
                                            size="xs"
                                            color="primary"
                                            name="is_saudi"
                                            onChange={() =>
                                                setFormData({ ...formData, is_saudi: "1" })
                                            }
                                            label="سعودي "
                                            checked={formData.is_saudi === "1"}
                                        />
                                        <Radio
                                            color="primary"
                                            size="xs"
                                            checked={formData.is_saudi === "2"}
                                            onChange={() =>
                                                setFormData({ ...formData, is_saudi: "2" })
                                            }
                                            label="مقيم "
                                        />

                                    </div>
                                    {formData.is_saudi === "2" && (
                                        <>
                                            <TextInput
                                                size="lg"
                                                rightSectionPointerEvents="none"
                                                error={formData.residency_number?.length != null && formData.residency_number?.length > 0 && formData.residency_number?.length < 9 || formData.residency_number?.length != null && formData.residency_number?.length > 0 && formData.residency_number?.length > 15 ? "رقم الاقامه يجب  ان يكوم من 9 الي 15 رقم" : false}
                                                radius={40}
                                                placeholder=" رقم الاقامه"
                                                type="number"
                                                onChange={handleChange}
                                                name="residency_number"
                                                required={formData.is_saudi === "2"}
                                            />


                                        </>
                                    )}
                                    {formData.is_saudi === "1" && (
                                        <>
                                            <TextInput
                                                size="lg"
                                                rightSectionPointerEvents="none"
                                                error={formData.national_id?.length != null && formData.national_id?.length > 0 && formData.national_id?.length < 10 ? "رقم الهويه يجب ان يساوي 15 رقم" : false}

                                                radius={40}
                                                placeholder=" رقم الهويه"
                                                type="number"
                                                onChange={handleChange}
                                                name="national_id"
                                                required={formData.is_saudi === "1"}



                                            />

                                        </>
                                    )}




                                </div>
                                <div className="flex gap-3">
                                    <Radio
                                        size="xs"
                                        color="primary"
                                        // name="is_student"
                                        onChange={() =>
                                            setFormData({ ...formData, is_student: true })
                                        }
                                        label="طالب "
                                        checked={formData.is_student === true}
                                    />
                                    <Radio
                                        color="primary"
                                        size="xs"
                                        checked={formData.is_student === false}
                                        onChange={() =>
                                            setFormData({ ...formData, is_student: false })
                                        }
                                        label="موظف "
                                    />


                                </div>
                                {formData.is_student === true && (
                                    <>
                                        <TextInput
                                            size="lg"
                                            rightSectionPointerEvents="none"
                                            radius={40}
                                            placeholder="  ادخل مجال الدراسة"
                                            type="text"
                                            onChange={handleChange}
                                            name="study_field"
                                            error={formData.study_field != null && formData.study_field?.length > 0 && formData.study_field?.length < 3 ? "اسم المجال يجب ان يكون اكبر من 3 حروف " : false}
                                            required={formData.is_student}
                                        />


                                    </>
                                )}

                                {formData.is_student === false && (
                                    <>
                                        <TextInput
                                            size="lg"
                                            rightSectionPointerEvents="none"
                                            radius={40}
                                            placeholder="  ادخل الوظيفة"
                                            type="text"
                                            onChange={handleChange}
                                            name="work_field"
                                            error={formData.job?.length != null && formData.job?.length > 0 && formData.job?.length < 3 ? "     اسم الوظيفه يجب ان يكون اكبر من 3 حروف " : false}
                                            required={!formData.is_student}
                                        />

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
                                    <div className="flex gap-3">
                                        <Checkbox
                                            size="xs"
                                            color="primary"
                                            name="work_field"
                                            onChange={() =>
                                                setFormData({ ...formData, work_field: "1" })
                                            }
                                            label="طلب شهاده حضور"
                                            checked={formData.work_field === "1"}
                                        />
                                      
                                    </div>
                                  
                                <Button
                                    color="primary"
                                    variant="filled"
                                    size="lg"
                                    radius={25}
                                    className="font-medium"
                                    type="submit"
                                // onClick={handleSubmit}
                                >
                                    ارسال الطلب
                                </Button>
                            </form>
                        </div>
                    </div>

                </Paper>
            </div>
        </>
    );
};

export default TrainningAndPreparingForm;
