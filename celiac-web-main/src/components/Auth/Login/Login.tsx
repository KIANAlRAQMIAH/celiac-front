import React, { useEffect, useState } from "react";
import CustomModal from "../formModal/CustomFormModal";
import { Button, Checkbox, PasswordInput } from "@mantine/core";
import CustomInputWithIcon from "../CustomnputWithIcon/CustomInputWithIcon";
import { useDisclosure } from "@mantine/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { z } from "zod";
import { useLoginMutation } from "@/api/AuthApiSlice";
import { modelActions } from "@/store/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import VerifyOTP from "../SignUp/verifyOtp";
import { RootState } from "@/store";
// import { login } from "@/api/axiosApi/post";

export const formSchema = z.object({
  phone: z
    .string()
    .min(9, "يجب ادخال رقم هاتف مكون من تسعه ارقام")
    .startsWith("5", " 5xxxxxxxx   الرقم لابد ان يكون مثل ذلك "),

  password: z.string().min(6, "كلمه المرور يجب ان تكون  6 حروف او اكثر"),
});

type LoginProps = {
  openForgetPass: () => void;
  openSignUp: () => void;
  forgetPass?: boolean;
};
interface signInfromData {
  phone: string;

  password: string;
  remember_me: boolean;
}

const initialFormData = {
  phone: "",
  password: "",
  remember_me: false,
};
const Login = (props: LoginProps) => {
  const dispatch = useDispatch();
  const [visible, { toggle }] = useDisclosure(false);
  const [formData, setFormData] = useState<signInfromData>(initialFormData);
  const [toastData, setToastData] = useState<any>({});
  const [isVirefied, setIsVirefied] = useState<boolean>(true);
  const { message } = useSelector((state: RootState) => state.auth)

  const [errors, setErrors] = useState<any>({});

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("تم تسجيل دخولك بنجاح", {});
      setToastData({});
    }
    if (toastData?.error?.status === 422) {
      toast.error(toastData?.error?.data?.message, {});
      setToastData({});
    }
    if (toastData?.error?.data?.status === 500) {
      toast.error(toastData?.error?.data?.errors?.message[0], {});
      setToastData({});
    }

    if (isLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      // Dismiss loading toast if it's visible
      // setToastData({});
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const goForgetPasswordPage = () => {
    props.openForgetPass();
    dispatch(modelActions.setIsLoginToFalse());
    dispatch(modelActions.setSignupTofalse());
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
    const data = await login(formData);

    //@ts-ignore
    if (+data?.error?.status === 410) {
      setIsVirefied(false);
    }
    // @ts-ignore
    if (data?.data?.status === 200) {
      localStorage.setItem(
        "celiacToken",
        // @ts-ignore
        JSON.stringify(data?.data?.data?.accessToken)
      );
      dispatch(modelActions.closeAuthModel());
      // @ts-ignore
      localStorage.getItem("celiacToken")! &&//@ts-ignore
        dispatch(modelActions.SetToken(localStorage.getItem("celiacToken")));

      setFormData(initialFormData);
      // dispatch(modelActions.closeAuthModel())
    }

    // if (data?.error)
    setToastData(data);
    setErrors({});
  };

  return (
    <>
      {isVirefied ? (
        <CustomModal
          initState={!props.forgetPass && true}
          title=" تسجيل الدخول"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[51px]">
              <div className="flex flex-col gap-[12px]">
                {message !== "" ? (<div className="flex p-5 gap-4 bg-[#9A9A3A1A] rounded-[8px]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="#9A9A3A"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>
                    {message}
                  </p>{" "}
                </div>) : ""}

                <CustomInputWithIcon
                  label="رقم الجوال"
                  placeholder="رقم الجوال"
                  handleChange={handleChange}
                  value={formData.phone}
                />
                {errors.phone && (
                  <p className="text-[red] font-normal">{errors.phone[0]}</p>
                )}
                <div className="flex flex-col gap-[12px]">
                  <PasswordInput
                    label=" كلمة المرور   "
                    // defaultValue="123123"
                    visible={visible}
                    onVisibilityChange={toggle}
                    placeholder="  كلمة المرور "
                    radius={25}
                    size="lg"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                  {errors.password && (
                    <p className="text-[red] font-normal">
                      {errors.password[0]}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Checkbox
                        onChange={() =>
                          setFormData({
                            ...formData,
                            remember_me: !formData.remember_me,
                          })
                        }
                      />
                      <button> تذكرنى</button>
                    </div>
                    <button
                      type="button"
                      onClick={() => goForgetPasswordPage()}
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>
                </div>
                <Button
                  color="primary"
                  variant="filled"
                  size="lg"
                  radius={25}
                  type="submit"
                  className="font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "جار الارسال......" : "تسجيل الدخول"}
                </Button>
              </div>
              <div className="flex justify-center">
                <button type="button" onClick={props.openSignUp}>
                  ليس لديك حساب؟{" "}
                  <span className="text-[#019867]">انشاء حساب جديد</span>
                </button>
              </div>
            </div>
          </form>
        </CustomModal>
      ) : (
        <VerifyOTP phoneNumber={formData?.phone} setIsVerify={setIsVirefied} />
      )}
    </>
  );
};

export default Login;
