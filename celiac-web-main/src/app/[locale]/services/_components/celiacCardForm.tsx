"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  NumberInput,
  Paper,
  PasswordInput,
  Radio,
  Text,
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
import { useCreateCeliacCardMutation } from "@/api/serveces";
import { redirect } from "next/navigation";
import { authActions } from "@/store/auth-slice";
import { civilIdSchema, formatDateToString, formSchema, residencySchema } from "@/utils/helpers";
// import { PiWarningCircle } from "react-icons/pi";






interface celiacCardFromData {
  name: string;
  phone: string;
  email: string;
  dob: DateValue | null;
  residency_number: string;
  civil_id: string;
  is_saudi: boolean;
  gender: string;
  address: string;

}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  dob: null,
  residency_number: "",
  civil_id: "",
  is_saudi: true,
  gender: "1",
  address: ""

};
dayjs.extend(customParseFormat);
const CeliacCardForm = () => {

  // const [visible, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [medical_report, setMedical_report] = useState<File | null>(null)
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<{resedency:string; national:string}>({
    resedency:'', national:''
  })
  const [verify] = useVerifyMutation();
  const [isVerify, setIsVerify] = useState<boolean>(false);

  const [formData, setFormData] = useState<celiacCardFromData>(initialFormData);
  const [numberForVerifyCode, setNumberForVerifyCode] = useState<string>("");

  const [createCeliacCard, { isLoading }] = useCreateCeliacCardMutation()
  console.log(medical_report)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the input
    if (file) {
      setMedical_report(file)
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
      redirect('/en/services')
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

   
    const result = formSchema.safeParse(formData);
      let resResult ;
    if(formData.is_saudi){

      resResult =  civilIdSchema.safeParse(formData.civil_id);
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
if(formData.is_saudi === true){

  setErrorMessages({resedency:'', national:resResult.error.errors[0].message})
}else{
  setErrorMessages({resedency:resResult.error.errors[0].message, national:''})
}
      }
      return;
    }
    
    setErrorMessages({resedency:'', national:''})

   
     
     

      
      // const formattedDate = `${new Date(
      //   //@ts-ignore
      //   formData.dob
      // ).getFullYear()}-${
      //   //@ts-ignore
      //   new Date(formData.dob).getMonth() + 1
      //   //@ts-ignore
      //   }-${new Date(formData.dob).getDate()}`;
      
     
      

      const formDataa = new FormData();

      // Append each key-value pair directly to formDataa
      formDataa.append('full_name', formData.name);
      formDataa.append('phone', formData.phone);
      formDataa.append('gender', formData.gender);
      formDataa.append('email', formData.email);
      //@ts-ignore
      formDataa.append('dob', formatDateToString(formData.dob));
      //@ts-ignore
      
      formDataa.append('address', formData.address);
      //@ts-ignore
      if (formData.is_saudi === true) {
        formDataa.append('is_saudi', "1");

        formDataa.append('national_id', formData.civil_id);

      }else{
        formDataa.append('is_saudi', "0");
        formDataa.append('residency_number', formData.residency_number);
      }

      //@ts-ignore
      formDataa.append('medical_report', medical_report);

      const data = await createCeliacCard(formDataa);
      console.log(data);
      // @ts-ignore

   
     
      setToastData(data);

    

  };
  useEffect(() => {


  }, [])
  return (
    <>

      <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center     m-auto">
        <Paper radius={25} shadow="md">

          <div className="p-[32px]">

            {/* <div className="flex gap-2 mb-5 rounded-[14px] p-[14px] bg-[#9A9A3A1A] items-center">
                                        <PiWarningCircle color="#9A9A3A" size={20} />
                                        <p className="text-[#001F15] text-[15px] font-[500]">هذه الخدمة متاحة فقط لحاملى الجنسية السعودية .</p>
                                    </div> */}
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
                <TextInput
                  size="lg"
                  rightSectionPointerEvents="none"
                  radius={40}
                  label="مكان الاقامه "
                  placeholder="ادخل مكان الاقامه "
                  name="address"
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-[red] font-normal">{errors.address[0]}</p>
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

                      {errorMessages.resedency !== '' && (
                        <p className="text-[red] font-normal">
                          {errorMessages.resedency}
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
                      {errorMessages.national !== '' && (
                        <p className="text-[red] font-normal">
                          {errorMessages.national}
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

                    {fileType === null ? (
                      <>
                        <GrUploadOption size={35} color="#019867" />
                        <p className="text-[12px] text-[#45534E] font-[400]">من فضلك ارفق الملف الطبي الخاص بحالة مرضك بالسيلياك
                        </p>
                        <p className="text-[12px] text-[#45534e74] font-[400]">.pdf, png, jpg, jpeg
                        </p>
                      </>
                    ) : (
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
                    )}

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

export default CeliacCardForm;
