import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '../../api/Auth';


export const formSchema = z
    .object({
        password: z.string().min(6, 'يجب أن يكون الرقم السري لا يقل عن 6 حروف أو أرقام'),
        // .refine(
        //     (value) => /[A-Z]/.test(value), // Ensure there is at least one uppercase letter
        //     {
        //         message: 'يجب أن تحتوي كلمة السر على حرف واحد كبير على الأقل',
        //     }
        // )
        // .refine((value) => /[0-9]/.test(value) && /[^a-zA-Z0-9]/.test(value), {
        //     message: 'كلمة السر يجب أن تحتوي على حروف وأرقام ورموز',
        // }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'كلمه السر غير متطابقه',
        path: ['password_confirmation'], // Specify the path to the field being
    });

interface signUpfromData {
    password: string;
    password_confirmation: string;
}

const initialFormData = {
    password: '',
    password_confirmation: '',
};

const ResetPassword = () => {
    const [formData, setFormData] = useState<signUpfromData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const location = useLocation();

    const [ResetPassword] = useResetPasswordMutation();

    const adminlogin = useSelector((state: any) => state.auth.adminLogin);
    const dispatch = useDispatch();
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
        const data = await ResetPassword({
            password: formData.password,
            password_confirmation: formData.password_confirmation,
            code: location?.state,
        });

        // setToastData(data);
        // setToastData(data);

        setErrors({});
        // @ts-ignore
        if (data?.data?.status === 200) {
            navigate('/');
            //   setToastData({});
            //   props.savePassAndCloseModel();
            //   dispatch(modelActions.setIsLoginToTrue());
        }
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
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">تسجيل الدخول</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">ادخل الحساب الخاصبك لتسجيل الدخول</p>
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit}>
                                {/* <div>
                                    <label htmlFor="Email">الكود</label>
                                    <div className="relative text-white-dark">
                                        <input id="code" type="text" placeholder="ادخل الرمز" className="form-input ps-10 placeholder:text-white-dark" {...register("code")} />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    {errors.password && <p className='text-[red]'>{errors.password.message}</p>}
                                </div> */}
                                <div>
                                    <label htmlFor="Email">كلمه المرور</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="password"
                                            onChange={handleChange}
                                            placeholder="ادخل كلمه المرور"
                                            className="form-input ps-10
                                        placeholder:text-white-dark"
                                            name="password"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    {errors.password && <p className="text-[red] font-normal">{errors.password[0]}</p>}
                                    {/* {errors.password && <p className="text-[red]">{errors.password.message}</p>} */}
                                </div>
                                <div>
                                    <label htmlFor="Email">تأكيد كلمة المرور الجديدة</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="password"
                                            onChange={handleChange}
                                            placeholder="تأكيد كلمة المرور الجديدة"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            name="password_confirmation"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    {errors.password_confirmation && <p className="text-[red] font-normal">{errors.password_confirmation[0]}</p>}
                                    {/* {errors.password_confirmation && <p className="text-[red]">{errors.password_confirmation.message}</p>} */}
                                </div>
                                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    الاستمرار
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
