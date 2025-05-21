import React, { useEffect, useState } from "react";
import CustomModal from "../formModal/CustomFormModal";
import { Button } from "@mantine/core";
import CustomInputWithIcon from "../CustomnputWithIcon/CustomInputWithIcon";
import { z } from "zod";
import { useVerifynumberMutation } from "@/api/AuthApiSlice";
import { ToastContainer, toast } from "react-toastify";
type ForgetPassProps = {
  setForgetPass: (value: boolean) => void;
  openOtp: (phoneNumber: string) => void;
  backToLogin: () => void;
};
const formSchema = z.object({
  phone: z
    .string()
    .min(9, "يجب ادخال رقم هاتف مكون من تسعه ارقام")
    .startsWith("5", " 5xxxxxxxx   الرقم لابد ان يكون مثل ذلك "),
});

interface signInfromData {
  phone: string;
}

const initialFormData = {
  phone: "",
};
const ForgetPassword = (props: ForgetPassProps) => {
  const [formData, setFormData] = useState<signInfromData>(initialFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [verifynumber, { isLoading }] = useVerifynumberMutation();
  const [toastData, setToastData] = useState<any>({});

  useEffect(() => {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    // phoneSchema.safeParse(phone);

    if (!result.success) {
      // @ts-ignore
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }

    const data = await verifynumber(formData);
    // @ts-ignore
    if (data?.data?.status === 200) {
      props.setForgetPass(false);
      props.openOtp(formData.phone);
    }

    setToastData(data);
    // setPhone('')
    // props.openOtp();
  };
  return (
    <>
      {/* <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      <CustomModal initState={true} title="  نسيت كلمة المرور">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col items-center justify-center gap-[15px] mt-[15px] ">
              <h5 className="lg:w-[365px] w-[100%] text-center text-[#001F15] m-0 p-0">
                من فضلك قم بكتابة رقم الجوال المسجل به على الموقع حتي نستطيع
                استرجاع كلمة المرور الخاصة بك{" "}
              </h5>
            </div>

            <div className="flex flex-col gap-[12px]">
              <CustomInputWithIcon
                label="رقم الجوال"
                placeholder="رقم الجوال"
                handleChange={handleChange}
                value={formData.phone}
              />
              {errors.phone && (
                <p className="text-[red] font-normal">{errors.phone[0]}</p>
              )}

              <Button
                color="primary"
                variant="filled"
                size="lg"
                radius={25}
                className="font-medium"
                type="submit"
              >
                {isLoading ? "جار الارسال" : "ارسال الكود"}
              </Button>
            </div>
            <div className="flex justify-center">
              <button onClick={props.backToLogin}>
                تذكرت كلمة المرور؟
                <span className="text-[#019867]"> تسجيل الدخول</span>
              </button>
            </div>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default ForgetPassword;
