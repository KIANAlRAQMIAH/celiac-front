import CounterHomeCard from "./CounterHomeCard";

import '../MiddleHome.css'
function CounterHome() {
  return (
    <div>
      <div className="statistics w-[100%] p-[30px]  lg:p-[50px]  grid md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-5 grid-cols-2 justify-center items-center lg:gap-[20px] gap-[10px]">
        <CounterHomeCard />
        <CounterHomeCard />
        <CounterHomeCard />
        <CounterHomeCard />
        <CounterHomeCard />
      </div>
    </div>
  );
}

export default CounterHome;
