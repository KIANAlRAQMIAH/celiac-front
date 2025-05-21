
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useEffect } from "react";
import { IRootState } from "../../store";

const Error404 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Error 404'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                   <h1 className='text-9xl'>404 Not Found</h1>
                    <p className="mt-5 text-base dark:text-white">The page you requested was not found!</p>
                    <Link to="/" className="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error404;
