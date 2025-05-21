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








import { z } from "zod";
import { useCreateFoodBasketMutation } from "@/api/serveces";
import { redirect } from "next/navigation";
import { authActions } from "@/store/auth-slice";
import { civilIdSchema, formatDateToString, residencySchema, validateSchema } from "@/utils/helpers";



export const formSchema = z
  .object({
    full_name: z
      .string()
      .nonempty("يجب إدخال الإسم بشكل صحيح")
      .min(3, "الاسم يجب أن يكون أكبر من ثلاثة أحرف")
      .max(25, "الاسم يجب أن يكون أقل من 25 حرف"),
      
   
      full_national_address: z
      .string()
      .nonempty("يجب إدخال العنوان الوطني بشكل صحيح")
      .min(3, "العنوان الوطني يجب أن يكون أكبر من ثلاثة أحرف"),
      
      
   

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
  
    full_national_address:string;
   
 
  
   
    
  
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
   
    full_national_address:""
  

};
dayjs.extend(customParseFormat);
const FoodBasketsForm = () => {
  const [errorMessages, setErrorMessages] = useState<{resedency:string; national:string}>({
    resedency:'', national:''
  })

const dispatch = useDispatch()


    const [formData, setFormData] = useState<celiacCardFromData>(initialFormData);
  

   const [createFoodBasket, {isLoading}] = useCreateFoodBasketMutation()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [toastData, setToastData] = useState<any>({});


 
    useEffect(() => {
        if (toastData?.data?.status === 200) {
            toast.success(" تم ارسال بياناتك  بنجاح  بانتظار الموافقه   ", {
                autoClose: 9000, // Automatically close after 5 seconds
            });
            setToastData({});
            setTimeout(() => {
              
              redirect('/ar/services')
            }, 500);
        }
        if (toastData?.error?.data?.status === 409) {
          toast.success(toastData?.error?.data?.errors.message[0], {
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


    const validate = validateSchema({
      full_national_address: z
      .string()
      .nonempty("يجب إدخال العنوان الوطني بشكل صحيح")
      .min(3, "العنوان الوطني يجب أن يكون أكبر من ثلاثة أحرف"),
      
      
    })

    
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
  
          // const fomDataWithSaudi = { ...formData };
         

          // if(formData.is_saudi === "1"){
          //   delete formData.residency_number;
          // }else{
          //   delete formData.national_id;
          // }
          // const cityResult = citySchema.safeParse(formData.city);
          const result = validate.safeParse(formData);
          let resResult ;
        if(formData.is_saudi==="1"){
    
          resResult =  civilIdSchema.safeParse(formData.national_id);
        }else{
          resResult = residencySchema.safeParse(formData.residency_number);
        }
       
    
        
        if (!result.success ) {
          // @ts-ignore
          setErrors(result.error.formErrors.fieldErrors);
       
          return;
        }
    
        setErrors({})
      
        if ( !resResult.success) {
          // @ts-ignore
         
          if(resResult.error !== undefined){
    if(formData.is_saudi === "1"){
    
      setErrorMessages({resedency:'', national:resResult.error.errors[0].message})
    }else{
      setErrorMessages({resedency:resResult.error.errors[0].message, national:''})
    }
          }
          return;
        }
        
        setErrorMessages({resedency:'', national:''})
       
    
      
         
     
        const formDataa = new FormData();

        // Append each key-value pair directly to formDataa
        formDataa.append('full_name', formData.full_name || '');
        formDataa.append('full_national_address', formData.full_national_address || '');
        formDataa.append('phone', formData.phone || '');
        formDataa.append('gender', formData.gender || '');
        formDataa.append('email', formData.email || '');
  
        // Convert `dob` to string if it's a Date object
        // @ts-ignore
        formDataa.append('dob', formatDateToString(formData.dob));
  
 
        if(formData.is_saudi === "1"){
          
          formDataa.append('national_id', formData.national_id || '');
        }else{
          
          formDataa.append('residency_number', formData.residency_number || '');
        }
        formDataa.append('is_saudi', formData.is_saudi);
       
     
  
        
        
   
         
          
         


        
       
    
       

          // Append each key-value pair directly to formDataa



     
          const data = await createFoodBasket(formDataa);
          console.log(data);
          // @ts-ignore
    
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
                        {errors.full_name && (
                            <p className="text-[red] font-normal">{errors.full_name[0]}</p>
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
                                    checked={formData.is_saudi === "0"}
                                    onChange={() =>
                                        setFormData({ ...formData, is_saudi: "0" })
                                    }
                                    label="مقيم "
                                />
                               
                            </div>

                           
                            {formData.is_saudi === "0" && (
                                <>
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        // error={formData.residency_number?.length != null &&formData.residency_number?.length > 0 && formData.residency_number?.length < 9 ||formData.residency_number?.length != null &&formData.residency_number?.length > 0&& formData.residency_number?.length >15? "رقم الاقامه يجب  ان يكوم من 9 الي 15 رقم" : false}
                                        radius={40}
                                        placeholder=" رقم الاقامه"
                                        type="number"
                                        onChange={handleChange}
                                        name="residency_number"
                                       
                                    />
 {errorMessages.resedency !== '' && (
                                          <p className="text-[red] font-normal">
                                            {errorMessages.resedency}
                                          </p>
                                        )}

                                </>
                            )}
  

                            {formData.is_saudi === "1" && (
                                <>
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        // error={formData.national_id?.length != null && formData.national_id?.length > 0 && formData.national_id?.length < 10 ? "رقم الهويه يجب ان يساوي 15 رقم" : false}
                                              
                                        radius={40}
                                        placeholder=" رقم الهويه"
                                        type="number"
                                        onChange={handleChange}
                                        name="national_id"
                                        // required={formData.is_saudi === "1"}
                                     
                                       
                                          
                                    />
                                  {errorMessages.national !== '' && (
                        <p className="text-[red] font-normal">
                          {errorMessages.national}
                        </p>
                      )}
                                </>
                            )}

<TextInput
                            size="lg"
                            rightSectionPointerEvents="none"
                            radius={40}
                            label="  العنوان الوطني بالكامل"
                            placeholder="ادخل عنوان إقامتك"
                            name="full_national_address"
                            onChange={handleChange}
                        />
                        {errors.full_national_address && (
                            <p className="text-[red] font-normal">{errors.full_national_address[0]}</p>
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

export default FoodBasketsForm;
