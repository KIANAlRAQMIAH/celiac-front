import React, { useEffect, useState } from "react";
import CustomModal from "../formModal/CustomFormModal";
import {
  Button,
  Checkbox,
  Input,
  NumberInput,
  PasswordInput,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import CustomInputWithIcon from "../CustomnputWithIcon/CustomInputWithIcon";
import { FaCalendar } from "react-icons/fa6";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateInput, DateValue } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { z } from "zod";
import { useRegisterMutation, useVerifyMutation } from "@/api/AuthApiSlice";
import "./style.css";
import OTP from "../OTP/OTP";
import VerifyOTP from "./verifyOtp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { modelActions } from "@/store/modelSlice";
import { ToastContainer, toast } from "react-toastify";

type signPassProps = {
  //   setForgetPass: (value: boolean) => void;
  //   openOtp: () => void;
  backToLoginFromSignUp: () => void;
};
// import { z } from 'zod';
// import { z } from "zod";

// import { z } from 'zod';

export const formSchema = z
  .object({
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
    terms_and_conditions: z.boolean().refine((value) => value === true, {
      message: "يجب أن توافق على الشروط والأحكام",
    }),
    // civil_id: z
    //   .string()
    //   .min(9, "يجب إدخال رقم اقامة لا يقل عن 9 أرقام ")
    //   .max(15, "يجب إدخال 15 أرقام فقط"),
  })

  .refine(
    (data) => {
      // Check if password matches password_confirmation
      return data.password === data.password_confirmation;
    },
    {
      message: "كلمتا المرور غير متطابقتين",
      path: ["password_confirmation"], // Specify the path to the field being validated
    }
  );
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
    terms_and_conditions: z.boolean().refine((value) => value === true, {
      message: "يجب أن توافق على الشروط والأحكام",
    }),
    civil_id: z
      .string()
      .min(10, "يجب إدخال رقم هويه لا يقل عن 10 أرقام ")
      .max(10, "يجب إدخال 10 أرقام فقط"),
  })

  .refine(
    (data) => {
      // Check if password matches password_confirmation
      return data.password === data.password_confirmation;
    },
    {
      message: "كلمتا المرور غير متطابقتين",
      path: ["password_confirmation"], // Specify the path to the field being validated
    }
  );
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
  is_saudi: boolean;
  password: string;
  password_confirmation: string;
  terms_and_conditions: boolean;
}

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  birthdate: null,
  residency_number: "",
  civil_id: "",
  is_saudi: true,
  password: "",
  password_confirmation: "",
  terms_and_conditions: false,
};
dayjs.extend(customParseFormat);
const SignUp = (props: signPassProps) => {
  // const [visible, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const [verify] = useVerifyMutation();
  const [isVerify, setIsVerify] = useState<boolean>(false);

  const [formData, setFormData] = useState<signUpfromData>(initialFormData);
  const [numberForVerifyCode, setNumberForVerifyCode] = useState<string>("");

  // const [is_saudi, setIs_saudi] = useState<boolean>(true);

  const { isLogin, signUp } = useSelector((state: RootState) => state.Model);
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
      toast.success("تم انشاء حسابك بنجاح  قم بتاكيد الحساب", {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNumberForVerifyCode(formData.phone);

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
      ).getFullYear()}/${
        //@ts-ignore
        new Date(fomDataWithSaudi.birthdate).getMonth() + 1
        //@ts-ignore
        }/${new Date(fomDataWithSaudi.birthdate).getDate()}`;
      //@ts-ignore
      fomDataWithSaudi.birthdate = formattedDate;
      const data = await register(fomDataWithSaudi);
      // @ts-ignore
      if (data?.data?.status === 200) {
        setIsVerify(true);
        setFormData(initialFormData);
      }
      setToastData(data);
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
      ).getFullYear()}/${
        //@ts-ignore
        new Date(fomDataWithNonSaudi.birthdate).getMonth() + 1
        //@ts-ignore
        }/${new Date(fomDataWithNonSaudi.birthdate).getDate()}`;
      //@ts-ignore
      fomDataWithNonSaudi.birthdate = formattedDate;
      const data = await register(fomDataWithNonSaudi);
      // @ts-ignore
      if (data?.data?.status === 200) {
        setIsVerify(true);
        setFormData(initialFormData);
      }
      setToastData(data);
    }
    // const result = formSchema.safeParse(formData);
    // phoneSchema.safeParse(phone);
  };
  return (
    <>
      {!isVerify ? (
        <CustomModal initState={true} title="حساب جديد">
          <form
            className="lg:max-h-[600px] max-h-[400px]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-[24px] signup_input_container w-[100%]">
              <div className="flex flex-col items-center justify-center gap-[12px] mt-[15px] text-center ">
                <h5 className="lg:w-[365px] w-[100%] text-[#001F15] m-0 p-0">
                  ادخل البيانات التالية لانشاء حساب جديد يمكنك من خلاله الحصول
                  على المميزات الكثيرة التى نقدمها لك من خلال موقع السلياك
                </h5>
              </div>

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

                  <PasswordInput
                    label="كلمة المرور "
                    defaultValue=""
                    // visible={visible}
                    // onVisibilityChange={toggle}
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
                  <PasswordInput
                    label="  تاكيد كلمة المرور   "
                    defaultValue=""
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
                  <div className="">
                    <div className="flex gap-[14px]">
                      <Checkbox
                        color="primary"
                        checked={formData.terms_and_conditions}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            terms_and_conditions:
                              !formData.terms_and_conditions,
                          })
                        }
                      />

                      <div className="w-[243px]">
                        <Text
                          //    onClick={props.backToLogin}
                          size="sm"
                        >
                          أوافق على جميع &nbsp;
                          <button type="button" className="text-[#019867]">
                            الشروط والاحكام
                          </button>{" "}
                          &nbsp; الخاصة بموقع السلياك
                        </Text>
                      </div>
                    </div>
                    {errors.terms_and_conditions && (
                      <p className="text-[red] font-normal">
                        {errors.terms_and_conditions[0]}
                      </p>
                    )}
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
                  ابدأ الآن
                </Button>
              </div>
              <div className="flex justify-center">
                {/* <button onClick={setisLoginToFalse}> */}
                <button type="button" onClick={goLogin}>
                  لديك حساب من قبل؟{" "}
                  <span className="text-[#019867]"> تسجيل الدخول</span>
                </button>
              </div>
            </div>
          </form>
        </CustomModal>
      ) : (
        <VerifyOTP
          setIsVerify={setIsVerify}
          phoneNumber={numberForVerifyCode}
        />
      )}
    </>
  );
};

export default SignUp;
