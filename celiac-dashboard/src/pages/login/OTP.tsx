import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import MaskedInput from 'react-text-mask';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgetPasswordMutation, useVerifyCodeMutation } from '../../api/Auth';
import { showAlert } from '../../components/Error';
import Loader from '../../components/Loader';

const SignUpSchema = z.object({
    email: z.string().email('Invalid email address'),
});
type SignUpData = z.infer<typeof SignUpSchema>;

const OTP = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ar') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    const [flag, setFlag] = useState(themeConfig.locale);

    const [code, setCode] = useState<string>('');
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
    const [ForgetPassword, { isLoading }] = useForgetPasswordMutation();


    if (isLoading || codeIsLoading) {
        return (
            <div className="flex justify-center items-center mt-[50%]">
                <Loader />
            </div>
        );
    }
    // const [verifynumber, { isLoading }] = useVerifynumberMutation();

    // const [toastData, setToastData] = useState<any>({});

    // useEffect(() => {
    //     if (toastData?.error?.status === 422) {
    //         toast.error(toastData?.error?.data?.message, {
    //             autoClose: 5000, // Automatically close after 5 seconds
    //         });
    //         setToastData({});
    //     }

    //     // if (codeIsLoading) {
    //     //   toast.loading("Loading...", {
    //     //     toastId: "loadingToast",
    //     //     autoClose: false,
    //     //   });
    //     // } else {
    //     //   // Dismiss loading toast if it's visible
    //     //   toast.dismiss("loadingToast");
    //     // }
    //     if (isLoading) {
    //         toast.loading('Loading...', {
    //             toastId: 'loadingToast',
    //             autoClose: false,
    //         });
    //     } else {
    //         // Dismiss loading toast if it's visible
    //         toast.dismiss('loadingToast');
    //     }
    // }, [toastData, codeIsLoading, isLoading]);
    const reSendCode = async () => {
        if (reSendCodeCounter === 0) {
            const data = await ForgetPassword(location.state);
            //@ts-ignore
            if (data?.data?.status === 200) {
                setReSendCodeCounter(59);
            }
        }
    };

    const changeHandler = (e: any) => {
        setCode(e.target.value);
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = await verifyCode({ code: code });
        //@ts-ignore
        if (data?.error?.status === 422) {
            //@ts-ignore
            showAlert('error', data?.error?.data?.message);
        }
        //@ts-ignore
        if (data?.data?.status === 200) {
            navigate('/auth/resetPassword', { state: { code: code } });
        }
        // setToastData(data);
        // @ts-ignore
        // if (data?.data?.status === 200) {
        //     props.openResetPass(code);
        // }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6">
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{flag}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${flag === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            // setFlag(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl"> تغير كلمه السر</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">ادخل الرمز المرسل اليك لاعاده تعيين كلمه السر </p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="altnMask1" className="text-white-dark">
                                        ادخل الرمز
                                    </label>
                                    <MaskedInput
                                        onChange={changeHandler}
                                        id="altnMask2"
                                        type="text"
                                        name="code"
                                        placeholder="____"
                                        className="form-input"
                                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                    />
                                </div>
                                <button
                                    disabled={code.trim().replace('_', '').length < 4}
                                    type="submit"
                                    className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                >
                                    تاكيد
                                </button>
                                <div className="flex justify-center">
                                    <button style={reSendCodeCounter > 0 ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} disabled={reSendCodeCounter > 0} onClick={reSendCode} type="button">
                                        اعادة الارسال بعد <span className="[0_10px_20px_-10px_rgba(67,97,238,0.44)]"> {`00:${reSendCodeCounter}`}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTP;
