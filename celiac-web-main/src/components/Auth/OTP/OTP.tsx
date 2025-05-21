import React, { useEffect, useState } from "react";
import CustomModal from "../formModal/CustomFormModal";
import { Button, PinInput } from "@mantine/core";
import CustomInputWithIcon from "../CustomnputWithIcon/CustomInputWithIcon";
import {
  useVerifyCodeMutation,
  useVerifynumberMutation,
} from "@/api/AuthApiSlice";
import { ToastContainer, toast } from "react-toastify";
type ForgetPassProps = {
  openResetPass: (resetCode: string) => void;
  phoneNumber: string;
};
const OTP = (props: ForgetPassProps) => {
  const [code, setCode] = useState<string>("");
  const [reSendCodeCounter, setReSendCodeCounter] = useState<number>(59);
  useEffect(() => {
    const timer = setInterval(() => {
      // Decrement the counter
      setReSendCodeCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    // Clear the interval when counter reaches 0
    if (reSendCodeCounter === 0) {
      clearInterval(timer);
    }

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [reSendCodeCounter]); // Re-run effect when counter changes
  const [verifyCode, { isLoading: codeIsLoading }] = useVerifyCodeMutation();
  const [verifynumber, { isLoading }] = useVerifynumberMutation();
  const [toastData, setToastData] = useState<any>({});

  useEffect(() => {
    if (toastData?.error?.status === 422) {
      toast.error(toastData?.error?.data?.message, {
        autoClose: 5000, // Automatically close after 5 seconds
      });
      setToastData({});
    }

    // if (codeIsLoading) {
    //   toast.loading("Loading...", {
    //     toastId: "loadingToast",
    //     autoClose: false,
    //   });
    // } else {
    //   // Dismiss loading toast if it's visible
    //   toast.dismiss("loadingToast");
    // }
    if (isLoading) {
      toast.loading("Loading...", {
        toastId: "loadingToast",
        autoClose: false,
      });
    } else {
      // Dismiss loading toast if it's visible
      toast.dismiss("loadingToast");
    }
  }, [toastData, codeIsLoading, isLoading]);
  const reSendCode = async () => {
    if (reSendCodeCounter === 0) {
      const data = await verifynumber({ phone: props.phoneNumber });
      // @ts-ignore
      if (data?.data?.status === 200) {
        setReSendCodeCounter(59);
      }
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = await verifyCode({ code: code });
    setToastData(data);

    // @ts-ignore
    if (data?.data?.status === 200) {
      props.openResetPass(code);
    }
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
      <CustomModal initState={true} title="  استرجاع كلمة المرور">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col items-center justify-center gap-[15px] mt-[15px] ">
              <h5 className="lg:w-[365px] w-[100%]  text-center text-[#001F15] m-0 p-0">
                ادخل الكود المكون من 4 ارقام المرسل الى رقم جوالك لاسترجاع كلمة
                المرور الخاصة بك{" "}
              </h5>
            </div>

            <div className="flex flex-col  gap-[24px]">
              <div className="flex justify-center w-full ">
                <PinInput
                  placeholder=""
                  type="number"
                  dir="ltr"
                  //   name="code"
                  onChange={(value) => setCode(value)}
                />
              </div>

              <Button
                color="primary"
                variant="filled"
                size="lg"
                radius={25}
                type="submit"
                className="font-medium"
                disabled={code.length < 4 || codeIsLoading}
              // onClick={props.openResetPass}
              >
                {codeIsLoading ? "جار الارسال" : "تأكيد"}
              </Button>
            </div>
            <div className="flex justify-center">
              <button
                style={
                  reSendCodeCounter > 0
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
                disabled={reSendCodeCounter > 0}
                onClick={reSendCode}
                type="button"
              >
                اعادة الارسال بعد{" "}
                <span className="text-[#019867]">
                  {" "}
                  {`00:${reSendCodeCounter}`}
                </span>
              </button>
            </div>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default OTP;
