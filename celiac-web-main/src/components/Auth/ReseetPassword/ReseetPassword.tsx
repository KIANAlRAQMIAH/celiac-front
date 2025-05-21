import React, { useEffect, useState } from "react";
import CustomModal from "../formModal/CustomFormModal";
import { Button, Checkbox, PasswordInput } from "@mantine/core";
import CustomInputWithIcon from "../CustomnputWithIcon/CustomInputWithIcon";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";
import { useChangePasswordMutation } from "@/api/AuthApiSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { modelActions } from "@/store/modelSlice";
type LoginProps = {
  savePassAndCloseModel: () => void;
  forgetPass?: boolean;
  resetCode: string;
};

export const formSchema = z
  .object({
    password: z
      .string()
      .min(6, "يجب أن يكون الرقم السري لا يقل عن 6 حروف أو أرقام")
      .refine(
        (value) => /[A-Z]/.test(value), // Ensure there is at least one uppercase letter
        {
          message: "يجب أن تحتوي كلمة السر على حرف واحد كبير على الأقل",
        }
      )
      .refine((value) => /[0-9]/.test(value) && /[^a-zA-Z0-9]/.test(value), {
        message: "كلمة السر يجب أن تحتوي على حروف وأرقام ورموز",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"], // Specify the path to the field being
  });

interface signUpfromData {
  password: string;
  password_confirmation: string;
}

const initialFormData = {
  password: "",
  password_confirmation: "",
};
const ReseetPassword = (props: LoginProps) => {
  // const [visible, { toggle }] = useDisclosure(false);
  const [formData, setFormData] = useState<signUpfromData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();

  const [toastData, setToastData] = useState<any>({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("تم تغير كلمه مرورك بنجاح", {
        autoClose: 5000, // Automatically close after 5 seconds
      });
      setToastData({});
    }
    if (toastData?.error?.status === 422) {
      toast.error("كود التاكيد لم يعد صالح حاول مره اخري", {
        autoClose: 5000, // Automatically close after 5 seconds
      });
      setToastData({});
    }

    // if (isLoading) {
    //   toast.loading("Loading...", {
    //     toastId: "loadingToast",
    //     autoClose: false,
    //   });
    // } else {
    //   // Dismiss loading toast if it's visible
    //   toast.dismiss("loadingToast");
    // }
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
    const data = await changePassword({
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      code: props.resetCode,
    });
    // setToastData(data);
    setToastData(data);

    setErrors({});
    // @ts-ignore
    if (data?.data?.status === 200) {
      setToastData({});
      props.savePassAndCloseModel();
      dispatch(modelActions.setIsLoginToTrue());
    }
  };
  // if (isSuccess) {
  //   toast.success("تم تغير كلمه مرورك بنجاح", {
  //     autoClose: 5000, // Automatically close after 5 seconds
  //   });
  // }
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
      <CustomModal title="  تغير كلمه المرور">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[51px]">
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[12px]">
                <PasswordInput
                  label=" كلمة المرور   "
                  // defaultValue="123123"
                  // visible={visible}
                  id="password"
                  // onVisibilityChange={toggle}
                  placeholder="  كلمة المرور "
                  radius={25}
                  size="lg"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                />
                {errors.password && (
                  <p className="text-[red] font-normal">{errors.password[0]}</p>
                )}
                <PasswordInput
                  label="  تاكيد كلمة المرور   "
                  // defaultValue="123123"
                  id="confirmPassword"
                  // visible={visible}
                  // onVisibilityChange={toggle}
                  placeholder="  كلمة المرور "
                  radius={25}
                  size="lg"
                  onChange={handleChange}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                />
                {errors.password_confirmation && (
                  <p className="text-[red] font-normal">
                    {errors.password_confirmation[0]}
                  </p>
                )}
              </div>
              <Button
                color="primary"
                variant="filled"
                size="lg"
                type="submit"
                radius={25}
                className="font-medium"
                disabled={isLoading}
                // onClick={props.savePassAndCloseModel}
              >
                {isLoading ? "جار الارسال" : "حفظ"}
              </Button>
            </div>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default ReseetPassword;
