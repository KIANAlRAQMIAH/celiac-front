"use client";
import { TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { PasswordInput, Stack } from "@mantine/core";
import Login from "@/components/Auth/Login/Login";
import ForgetPassword from "@/components/Auth/forgetPassword/ForgetPassword";
import { useState } from "react";
import OTP from "@/components/Auth/OTP/OTP";
import ReseetPassword from "@/components/Auth/ReseetPassword/ReseetPassword";
import { modelActions } from "@/store/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./SignUp/SignUp";
import { RootState } from "@/store";

export default function Auth() {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, { toggle }] = useDisclosure(false);
  // const [isLogin, setisLogin] = useState<boolean>(true);
  // const [signUp, setSignUp] = useState<boolean>(false);
  const [forgetPass, setForgetPass] = useState<boolean>(false);
  const [otp, setOtp] = useState<boolean>(false);
  const [isResetPass, setIsResetPass] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");
  const { isLogin,signUp } = useSelector((state: RootState) => state.Model);

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

  const openSignUp = () => {
    setisLoginToFalse();
    setSignUpToTrue();
  };
  const backToLoginFromSignUp = () => {
    setisLoginToTrue();
    setSignUpToFalse;
  };
  const openForgetPass = () => {
    setForgetPass(true);
  };
  const backToLogin = () => {
    setisLoginToTrue();
    setForgetPass(false);
  };
  const openOtp = (phoneNum: string) => {
    setForgetPass(false);
    setOtp(true);
    setPhoneNumber(phoneNum);
  };
  const openResetPass = (resetCode: string) => {
    setOtp(false);
    setIsResetPass(true);
    setResetCode(resetCode);
  };

  const savePassAndCloseModel = () => {
    setIsResetPass(false);
    // dispatch(modelActions.closeAuthModel());
  };
  return (
    <>
      {isLogin && (
        <Login
          forgetPass={forgetPass}
          openForgetPass={openForgetPass}
          openSignUp={openSignUp}
        />
      )}
      {signUp && <SignUp backToLoginFromSignUp={backToLoginFromSignUp} />}
      {forgetPass && (
        <ForgetPassword
          setForgetPass={setForgetPass}
          backToLogin={backToLogin}
          openOtp={openOtp}
        />
      )}

      {otp && <OTP openResetPass={openResetPass} phoneNumber={phoneNumber} />}

      {isResetPass && (
        <ReseetPassword
          resetCode={resetCode}
          savePassAndCloseModel={savePassAndCloseModel}
        />
      )}
    </>
  );
}
