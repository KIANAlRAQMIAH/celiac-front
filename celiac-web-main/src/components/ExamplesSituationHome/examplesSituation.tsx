import ExamplesHomeCard from "../ExamplesSituationHome/examplesHomeCard";
import CustomButtonIcon from "../customButtonIcon";
import Link from "next/link";
import "../MiddleHome.css"
function ExamplesSituation({ data }: any) {
  return (
    <div className="container">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center gap-4  md:justify-start  md:items-start ">
          <CustomButtonIcon title="تبرع معنا" />
          <h1 className="font-bold mb-5">حــــالات تنتــظر دعمـــــــكم</h1>
        </div>
        <Link
          className="responsive-Home-Btn-A  flex justify-center items-center mb-5 rounded-3xl  border border-[#019867]  bg-[#019867]    px-12 py-3 text-sm font-bold text-[#ffffff] hover:bg-[#ffffff] hover:text-[#019867] h-12 focus:outline-none focus:ring active:bg-[#019867]"
          href="/ar/ContributeWithUs/donation">
          تبرع الآن
        </Link>
      </div>
      <ExamplesHomeCard data={data} />
      <Link
        className="responsive-Home-Btn-B mt-5 flex justify-center items-center mb-5 rounded-3xl  border border-[#019867]  bg-[#019867]    px-12 py-3 text-sm font-bold text-[#ffffff] hover:bg-[#ffffff] hover:text-[#019867] h-12 focus:outline-none focus:ring active:bg-[#019867]"
        href="/ar/ContributeWithUs/donation"
      >
        تبرع الآن
      </Link>
    </div>
  );
}

export default ExamplesSituation;
