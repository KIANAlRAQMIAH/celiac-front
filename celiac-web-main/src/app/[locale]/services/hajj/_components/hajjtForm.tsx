"use client";

import React, { useEffect, useState } from "react";
import {
    Button,
   
    Paper,
 
    Radio,

    TextInput,
} from "@mantine/core";
import { FaCalendar } from "react-icons/fa6";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateInput, DateValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";
import { useRegisterMutation, useVerifyMutation } from "@/api/AuthApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { modelActions } from "@/store/modelSlice";
import { ToastContainer, toast } from "react-toastify";
import VerifyOTP from "@/components/Auth/SignUp/verifyOtp";
import CustomInputWithIcon from "@/components/Auth/CustomnputWithIcon/CustomInputWithIcon";
import { GrUploadOption } from "react-icons/gr";
import Image from "next/image";
import { useCreateCeliacCardMutation, useCreateHajRequestMutation, useCreateJobHiringMutation } from "@/api/serveces";
import { redirect } from "next/navigation";
import { authActions } from "@/store/auth-slice";



export const formSchema = z
    .object({
        name: z
            .string()
            .nonempty("يجب إدخال الإسم بشكل صحيح")
            .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
            .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
         
        phone: z
            .string()
            .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام").max(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام فقط" )
            .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك "),
        email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
        dob: z.date({
            required_error: "قم ب إدخال تاريخ الميلاد",
            invalid_type_error: "قم ب إدخال تاريخ الميلاد",
        }),
        residency_number: z
            .string()
            .min(9, "يجب إدخال رقم اقامه لا  يقل عن 9 أرقام ")
            .max(15, "يجب إدخال 15 رقما فقط"),
        is_saudi: z.string(),
      
        
       
    })

    
export const formSchema1 = z
    .object({
        name: z
            .string()
            .nonempty("يجب إدخال الإسم بشكل صحيح")
            .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
            .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
     
       
        phone: z
            .string()
            .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام")
            .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك ")
            .max(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام فقط" ),
        email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
        dob: z.date({
            required_error: "قم ب إدخال تاريخ الميلاد",
            invalid_type_error: "قم ب إدخال تاريخ الميلاد",
        }),
      
        is_saudi: z.string(),
       
      
        civil_id: z
            .string()
            .min(10, "يجب إدخال رقم هويه لا يقل عن 10 أرقام ")
            .max(10, "يجب إدخال 10 أرقام فقط"),
    })
export const formSchema3 = z
    .object({
        name: z
            .string()
            .nonempty("يجب إدخال الإسم بشكل صحيح")
            .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
            .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
     
     
        phone: z
            .string()
            .min(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام")
            .startsWith("5", " 5xxxxxxxx   الرقم لابد أن يكون مثل ذلك ")
            .max(9, "يجب إدخال رقم هاتف مكون من تسعة أرقام فقط" ),
        email: z.string().email("يجب إدخال البريد الإلكتروني بشكل صحيح"),
        dob: z.date({
            required_error: "قم ب إدخال تاريخ الميلاد",
            invalid_type_error: "قم ب إدخال تاريخ الميلاد",
        }),
        transaction_date: z.date({
            required_error: "قم ب إدخال تاريخ السفر",
            invalid_type_error: "قم ب إدخال تاريخ السفر",
        }),
      
        is_saudi: z.string(),
       
      
        passport_number: z
            .string()
            .min(6, "يجب إدخال رقم جواز لا يقل عن 6 أرقام ")
            .max(15, "يجب إدخال 15 أرقام فقط"),
            campaign_name: z
            .string()
            .min(1, "يجب إدخال  اسم الحمله       "),
            
            campaign_number: z
            .string()
            .min(1, "يجب إدخال رقم الحمله      ")
          
           
    })

    
  
// export const phoneSchema = z
//   .number(phone :z.number().min(9, "");)

// const phoneSchema = z.number().min(9, "يجب ادخال رقم هاتف مكون من تسعه ارقام");
interface celiacCardFromData {
    name: string;
    phone: string;
    email: string;
    dob: DateValue | null;
    residency_number?: string;
    civil_id?: string;
    is_saudi: string;
    gender: string;
   
 
  
    visitor:boolean,
    passport_number:string;
    campaign_name:string;
    campaign_number:string;
    transaction_date: DateValue | null;
  
}

const initialFormData = {
    name: "",
    phone: "",
    email: "",
    dob: null,
    residency_number: "",
    civil_id: "",
    is_saudi: "1",
    gender: "1",


 
    visitor: false,
    passport_number:"",
    campaign_name:"",
    campaign_number:"",
    transaction_date: null

};
dayjs.extend(customParseFormat);
const RecrutementForm = () => {
    // const [visible, { toggle }] = useDisclosure(false);
    const dispatch = useDispatch();
const [file, setFile] = useState <File | null>(null)
const [fileSrc, setFileSrc] = useState<string | null>(null);
const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
   
    const [verify] = useVerifyMutation();
    const [isVerify, setIsVerify] = useState<boolean>(false);

    const [formData, setFormData] = useState<celiacCardFromData>(initialFormData);
    const [numberForVerifyCode, setNumberForVerifyCode] = useState<string>("");

   const [createHajRequest, {isLoading }] = useCreateHajRequestMutation()

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file from the input
        if (file) {
            setFile(file)
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
    const setisLoginToTrue = () => {
        dispatch(modelActions.setIsLoginToTrue());
    };

    const setisLoginToFalse = () => {
        dispatch(modelActions.setIsLoginToFalse());
    };

    const setSignUpToTrue = () => {
        dispatch(modelActions.setSignupTotrue());
    };

    const setSignUpToFalse = () => {
        dispatch(modelActions.setSignupTofalse());
    };

    const goLogin = () => {
        dispatch(modelActions.setIsLoginToTrue());
        dispatch(modelActions.setSignupTofalse());
    };
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toastData, setToastData] = useState<any>({});
    useEffect(() => {
        if (toastData?.data?.status === 200) {
            toast.success(" تم ارسال بياناتك  بنجاح  بانتظار الموافقه   ", {
                autoClose: 9000, // Automatically close after 5 seconds
            });
            setToastData({});
            redirect('/ar/services')
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
      
    
        if (formData.is_saudi === "1") {
          const fomDataWithSaudi = { ...formData };
          // delete fomDataWithSaudi.civil_id;
          delete fomDataWithSaudi.residency_number;
    
          //@ts-ignore
          const result = formSchema1.safeParse(fomDataWithSaudi);
          if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
          }
          const formattedDate = `${new Date(
            //@ts-ignore
            fomDataWithSaudi.dob
          ).getFullYear()}-${
            //@ts-ignore
            new Date(fomDataWithSaudi.dob).getMonth() + 1
            //@ts-ignore
          }-${new Date(fomDataWithSaudi.dob).getDate()}`;
          console.log(formattedDate);
          //@ts-ignore
          fomDataWithSaudi.dob = formattedDate;
          console.log(fomDataWithSaudi);
    
          const formDataa = new FormData();

          // Append each key-value pair directly to formDataa
      formDataa.append('full_name', fomDataWithSaudi.name || '');
formDataa.append('phone', fomDataWithSaudi.phone || '');
formDataa.append('gender', fomDataWithSaudi.gender || '');
formDataa.append('email', fomDataWithSaudi.email || '');

// Convert `dob` to string if it's a Date object
//@ts-ignore
formDataa.append('dob', fomDataWithSaudi.dob);

// Check if the remaining fields are strings or provide a default

formDataa.append('is_saudi', '1');
formDataa.append('is_visitor', 'false');


// Handle address and national ID fields

formDataa.append('national_id', fomDataWithSaudi.civil_id || '');

// Ensure file is a valid Blob or fallback
formDataa.append('file', file || new Blob()); // Provide a default empty Blob if `file` is null

     
          const data = await createHajRequest(formDataa);
          console.log(data);
          // @ts-ignore
    
          setToastData(data);
        } else if (formData.is_saudi === "2") {
          const fomDataWithNonSaudi = { ...formData };
          // delete fomDataWithNonSaudi.residency_number;
          delete fomDataWithNonSaudi.civil_id;
    
          const result = formSchema.safeParse(fomDataWithNonSaudi);
          if (!result.success) {
            // @ts-ignore
            setErrors(result.error.formErrors.fieldErrors);
            console.log(result.error.formErrors.fieldErrors);
            return;
          }
          const formattedDate = `${new Date(
            //@ts-ignore
            fomDataWithNonSaudi.dob
          ).getFullYear()}-${
            //@ts-ignore
            new Date(fomDataWithNonSaudi.dob).getMonth() + 1
            //@ts-ignore
          }-${new Date(fomDataWithNonSaudi.dob).getDate()}`;
          console.log(formattedDate);
          //@ts-ignore
          fomDataWithNonSaudi.dob = formattedDate;
          const formDataa = new FormData();

          // Append each key-value pair directly to formDataa
          formDataa.append('full_name', fomDataWithNonSaudi.name || '');
          formDataa.append('phone', fomDataWithNonSaudi.phone || '');
          formDataa.append('gender', fomDataWithNonSaudi.gender || '');
          formDataa.append('email', fomDataWithNonSaudi.email || '');
          formDataa.append('dob', fomDataWithNonSaudi.dob ? fomDataWithNonSaudi.dob.toString() : ''); // Ensure dob is a string
         
        
          formDataa.append('is_saudi', '0');
          formDataa.append('is_visitor', '0');
      
          formDataa.append('residency_number', fomDataWithNonSaudi.residency_number || '');
          
          // Make sure `file` is either a valid Blob object or provide a fallback
          formDataa.append('file', file || new Blob()); // Provide a default empty Blob if `file` is null
          
          const data = await createHajRequest(formDataa);
          // @ts-ignore
          console.log(data);
          setToastData(data);
          console.log(fomDataWithNonSaudi);
        }else{
            const visitorForm = { ...formData };
            // delete visitorForm.civil_id;
            delete visitorForm.residency_number;
      
            //@ts-ignore
            const result = formSchema3.safeParse(visitorForm);
            console.log(visitorForm)
            if (!result.success) {
              // @ts-ignore
              setErrors(result.error.formErrors.fieldErrors);
              console.log(result.error.formErrors.fieldErrors);
              return;
            }
            const formattedDate = `${new Date(
              //@ts-ignore
              visitorForm.dob
            ).getFullYear()}-${
              //@ts-ignore
              new Date(visitorForm.dob).getMonth() + 1
              //@ts-ignore
            }-${new Date(visitorForm.dob).getDate()}`;
            const transaction_date = `${new Date(
              //@ts-ignore
              visitorForm.transaction_date
            ).getFullYear()}-${
              //@ts-ignore
              new Date(visitorForm.transaction_date).getMonth() + 1
              //@ts-ignore
            }-${new Date(visitorForm.transaction_date).getDate()}`;
            console.log(formattedDate);
            //@ts-ignore
            visitorForm.dob = formattedDate;
            console.log(visitorForm);
      
            const formDataa = new FormData();
  
            // Append each key-value pair directly to formDataa
        formDataa.append('full_name', visitorForm.name || '');
  formDataa.append('phone', visitorForm.phone || '');
  formDataa.append('gender', visitorForm.gender || '');
  formDataa.append('email', visitorForm.email || '');
  
  // Convert `dob` to string if it's a Date object
    //@ts-ignore
  formDataa.append('dob', visitorForm.dob ? visitorForm.dob : '');
  formDataa.append('transaction_date', transaction_date);
  
  // Check if the remaining fields are strings or provide a default

  formDataa.append('is_visitor', '1');
  formDataa.append('is_saudi', '0');
 
  
  // Handle address and national ID fields
  formDataa.append('passport_number', visitorForm.passport_number || '');
  formDataa.append('campaign_name', visitorForm.campaign_name || '');
  formDataa.append('campaign_number', visitorForm.campaign_number || '');
//   formDataa.append('address', visitorForm.address || '');
//   formDataa.append('national_id', visitorForm.civil_id || '');
  
  // Ensure file is a valid Blob or fallback
  formDataa.append('file', file || new Blob()); // Provide a default empty Blob if `file` is null
  
       
            const data = await createHajRequest(formDataa);
            console.log(data);
            // @ts-ignore
      
            setToastData(data);
        }
        // const result = formSchema.safeParse(formData);
        // phoneSchema.safeParse(phone);
      };
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
                            name="name"
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <p className="text-[red] font-normal">{errors.name[0]}</p>
                        )}
                        {/* <NumberInput onChange={setPhone} /> */}

                        <div className="flex gap-[24px] items-center">
                  <div className="w-[50%]">
                  <CustomInputWithIcon
                            label="رقم الجوال"
                            placeholder="رقم الجوال"
                            handleChange={handleChange}
                            value={formData.phone}
                        />
                        {errors.phone && (
                            <p className="text-[red] font-normal">{errors.phone[0]}</p>
                        )}
                  </div>
                  <div className="w-[50%]">
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
                  </div>
                </div>
                       
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
                                <Radio
                                    color="primary"
                                    size="xs"
                                    checked={formData.is_saudi === "3"}
                                    onChange={() =>
                                        setFormData({ ...formData, is_saudi:"3" })
                                    }
                                    label="زائر "
                                />
                            </div>

                            {formData.is_saudi === "3" && (
                                <>
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        placeholder="  رقم جواز السفر"
                                        type="text"
                                        onChange={handleChange}
                                        name="passport_number"
                                    />

                                    {errors.passport_number && (
                                        <p className="text-[red] font-normal">
                                            {errors.passport_number[0]}
                                        </p>
                                    )}
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        placeholder="  اسم الحملة التابع لها"
                                        type="text"
                                        onChange={handleChange}
                                        name="campaign_name"
                                    />

                                    {errors.campaign_name && (
                                        <p className="text-[red] font-normal">
                                            {errors.campaign_name[0]}
                                        </p>
                                    )}
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        placeholder="    رقم الحملة التابع لها"
                                        type="number"
                                        onChange={handleChange}
                                        name="campaign_number"
                                    />

                                    {errors.campaign_number && (
                                        <p className="text-[red] font-normal">
                                            {errors.campaign_number[0]}
                                        </p>
                                    )}
                                      <DateInput
                            maxDate={new Date()}
                            size="lg"
                            valueFormat="YYYY/MM/DD"
                            rightSectionPointerEvents="none"
                            radius={40}
              
                            placeholder="تاريخ السفر"
                            rightSection={<FaCalendar />}
                            name="transaction_date"
                            // valueFormat="YYYY MMM DD"
                            onChange={(value) =>
                                setFormData({ ...formData, transaction_date: value })
                            }
                        />
                        {errors.transaction_date && (
                            <p className="text-[red] font-normal">
                                {errors.transaction_date[0]}
                            </p>
                        )}
                                </>
                            )}
                            {formData.is_saudi === "2" && (
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

                            {formData.is_saudi === "1" && (
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

 
<div className="relative min-h-[170px] bg-[#0198670D] overflow-hidden p-[24px] border-dashed border-[1px] border-[#019867] rounded-[15px] flex flex-col justify-center items-center gap-3">
                
                { fileType ===null ?(  
                    <>
                 <GrUploadOption size={35} color="#019867" />
                  <p className="text-[12px] text-[#45534E] font-[400]">من فضلك ارفق الملف الطبي الخاص بحالة مرضك بالسيلياك
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

export default RecrutementForm;
