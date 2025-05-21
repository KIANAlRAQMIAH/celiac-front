"use client";

import React, { useEffect, useState } from "react";
import {
    Button,
   
    Paper,
 
    Radio,

    Select,

    TextInput,
} from "@mantine/core";
import { FaCalendar } from "react-icons/fa6";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateInput, DateValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

import { useRegisterMutation, useVerifyMutation } from "@/api/AuthApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { modelActions } from "@/store/modelSlice";
import { ToastContainer, toast } from "react-toastify";
import VerifyOTP from "@/components/Auth/SignUp/verifyOtp";
import CustomInputWithIcon from "@/components/Auth/CustomnputWithIcon/CustomInputWithIcon";
import { GrUploadOption } from "react-icons/gr";
import Image from "next/image";
import { useCreateCeliacCardMutation, useCreateCooperativeRequestMutation, useCreateHajRequestMutation, useCreateJobHiringMutation, useCreateVolunteerRequestMutation } from "@/api/serveces";







import { z } from "zod";
import { redirect } from "next/navigation";
import { authActions } from "@/store/auth-slice";



export const formSchema = z
  .object({
    full_name: z
      .string()
      .nonempty("يجب إدخال الإسم بشكل صحيح")
      .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
      .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
   
      faculty_name: z
      .string()
      .nonempty("يجب إدخال اسم الكليه بشكل صحيح")
      .min(3, "اسم الكليه يجب أن يكون أكبر من ثلاثة أحرف")
      .max(25, "اسم الكليه يجب أن يكون أقل من 25 حرف"),
   

   

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
    faculty_name:string
   
 
  
   
    
  
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
    faculty_name:""
  

};
dayjs.extend(customParseFormat);
const CooperativeTrainingshipForm = () => {
   


const dispatch = useDispatch()

    const [formData, setFormData] = useState<celiacCardFromData>(initialFormData);
    const [cv, setCv] = useState <File | null>(null)
    const [fileSrc, setFileSrc] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
      const [fileType, setFileType] = useState<string | null>(null);

   const [createCooperativeRequest, {isLoading}] = useCreateCooperativeRequestMutation()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toastData, setToastData] = useState<any>({});


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file from the input
        if (file) {
            setCv(file)
          const reader = new FileReader();
          setFileType(file.type); // Store file type (MIME type)
          setFileName(file.name); // Store file name
    
          reader.onload = () => {
            if (file.type.startsWith("image/")) {
              setFileSrc(reader.result as string); // Set base64 image string for image files
            } else if (file.type === "application/pdf") {
              setFileSrc(null); // Clear fileSrc for PDF files, as we only display the name
            }
          };
    
          // Handle image and PDF files
          if (file.type.startsWith("image/")) {
            reader.readAsDataURL(file); // Read image files as data URL (base64 string)
          } else if (file.type === "application/pdf") {
            reader.readAsDataURL(file); // Optionally, you can still read the file for further processing
          }
        }
      };

    useEffect(() => {
        if (toastData?.data?.status === 200) {
            toast.success(" تم ارسال بياناتك  بنجاح  بانتظار الموافقه   ", {
                autoClose: 9000, // Automatically close after 5 seconds
            });
            setToastData({});
            redirect('/ar/ContributeWithUs')
        }
        if (toastData?.error?.status === 422) {
            toast.error(toastData?.error?.data?.message, {
                autoClose: 5000, // Automatically close after 5 seconds
            });
            setToastData({});
        }
        if (toastData?.error?.data?.status === 409) {
          toast.error(toastData?.error?.data?.errors.message[0], {
            autoClose: 9000, // Automatically close after 5 seconds
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const openModelAction = () => {
      dispatch(modelActions.openModel());
      dispatch(authActions.setValidationMessage("هذه الخدمة متاحة فقط للاعضاء , من فضلك قم بتسجيل دخولك الى الموقع لتستطيع طلب الخدمة "))
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const token = localStorage.getItem("celiacToken")
        if (!token) {
          openModelAction()
          return
        }
    
       
          const fomDataWithSaudi = { ...formData };
         

          if(formData.is_saudi === "1"){
            delete formData.residency_number;
          }else{
            delete formData.national_id;
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
          // formData.dob = formattedDate;
       
    
          const formDataReq = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            if(key === 'dob'){
              return
            }
            formDataReq.append(key, value || ""); // Append each field to FormData
          });
          if(cv){
            formDataReq.append("cv", cv);

          }
          formDataReq.append("dob", formattedDate);

          // Append each key-value pair directly to formDataa



     
          const data = await createCooperativeRequest(formDataReq);
       
          setToastData(data);
        }
    return (
        <>
      
  <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center     m-auto">
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
                                    checked={formData.is_saudi ==="1"}
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
                                        error={formData.residency_number?.length != null &&formData.residency_number?.length > 0 && formData.residency_number?.length < 9 ||formData.residency_number?.length != null &&formData.residency_number?.length > 0&& formData.residency_number?.length >15? "رقم الاقامه يجب  ان يكوم من 9 الي 15 رقم" : false}
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
                                        error={formData.national_id?.length != null && formData.national_id?.length > 0 && formData.national_id?.length < 10 ? "رقم الهويه يجب ان يساوي 10 رقم" : false}
                                              
                                        radius={40}
                                        placeholder=" رقم الهويه"
                                        type="number"
                                        onChange={handleChange}
                                        name="national_id"
                                        required={formData.is_saudi === "1"}
                                     
                                      
                                          
                                    />
                                  
                                </>
                            )}

<TextInput
                            size="lg"
                            rightSectionPointerEvents="none"
                            radius={40}
                            label=" اسم الكليه"
                            placeholder="ادخل اسم الكليه"
                            name="faculty_name"
                            onChange={handleChange}
                        />
                        {errors.faculty_name && (
                            <p className="text-[red] font-normal">{errors.faculty_name[0]}</p>
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
                 
                          
                        </div>
  
<div className="relative min-h-[170px] bg-[#0198670D] overflow-hidden p-[24px] border-dashed border-[1px] border-[#019867] rounded-[15px] flex flex-col justify-center items-center gap-3">
                
                { fileType ===null ?(  
                    <>
                 <GrUploadOption size={35} color="#019867" />
                  <p className="text-[12px] text-[#45534E] font-[400]"> من فضلك ارفق السيره الذاتيه
                  </p>
                  <p className="text-[12px] text-[#45534e74] font-[400]">.pdf, png, jpg, jpeg
                  </p> 
                  </>
                ) :(
                    <>
                  {fileSrc && fileType?.startsWith("image/") && (
        <Image
          src={fileSrc}
          alt="uploaded-file"
          className=" object-cover"
         fill
        />
      )}
{fileType === "application/pdf" && fileName && (
        <p className="text-gray-700">Uploaded PDF: {fileName}</p>
      )}
                    </>
                ) }
                
                  <input type="file" accept="image/*,.pdf" required onChange={handleFileUpload} className="absolute top-0 z-10 left-0 w-full h-full opacity-0 cursor-pointer" />
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

export default CooperativeTrainingshipForm;
