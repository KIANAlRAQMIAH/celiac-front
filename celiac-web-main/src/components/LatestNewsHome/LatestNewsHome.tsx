import LatestHomeCard from "./LatestHomeCard";
import Link from "next/link";
import CustomButtonIcon from "../customButtonIcon";
import "../MiddleHome.css"
function LatestNewsHome({ data }: any) {
  return (
    <>
      <div className="bg-[#F4F9F7] pb-[8px]">
        <div className="container  py-8 mt-20">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="flex flex-col justify-center items-center gap-4  md:justify-start  md:items-start ">
              <CustomButtonIcon title='المركز الاعلامي' />
              <h1 className="font-bold mb-5">
                تعرف على آخر الأخبار من جمعية السلياك
              </h1>
            </div>
            <Link
              className="responsive-Home-Btn-A flex justify-center items-center mb-5 rounded-3xl border border-[#019867] px-12 py-3 text-sm font-bold text-[#019867]   hover:bg-[#019867] hover:text-[#ffffff] h-12 focus:outline-none focus:ring active:bg-[#019867]"
              href="/ar/ContributeWithUs/donation"
            >
              اعرض المزيد
            </Link>
          </div>
          <LatestHomeCard data={data} />
        </div>
        <Link
          className=" responsive-Home-Btn-B mt-5 flex justify-center items-center  m-[16px] mb-5 rounded-3xl border border-[#019867] px-12 py-3 text-sm font-bold text-[#019867]   hover:bg-[#019867] hover:text-[#ffffff] h-12 focus:outline-none focus:ring active:bg-[#019867]"
          href="/ar/ContributeWithUs/donation"
        >
          اعرض المزيد
        </Link>
      </div>

    </>
  );
}

export default LatestNewsHome;
