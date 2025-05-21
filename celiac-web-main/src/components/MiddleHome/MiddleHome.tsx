
import AboutHome from "../AboutUsHome";
import ContactUsHome from "../ContactUs-Home/ContactUsHome";
import CounterHome from "../CounterHome/CounterHome";
import ExamplesSituation from "../ExamplesSituationHome/examplesSituation";
import HeaderSwiper from "../HeaderSwiper";
import LatestNewsHome from "../LatestNewsHome/LatestNewsHome";
import PartenersHome from "../PartnersHome/PartenersHome";
import "../MiddleHome.css";
import MiddleHomeCards from "./MiddleHomeCards";
import { fetchHomeServerAction } from "@/utils/actions";
async function MiddleHome() {
  const BannersData = await fetchHomeServerAction();
  return (
    <div>
      <HeaderSwiper data={BannersData?.data} />
      <AboutHome data={BannersData?.data} />
      <CounterHome />
      <MiddleHomeCards />
      <ExamplesSituation data={BannersData?.data} />
      <LatestNewsHome data={BannersData?.data} />
      <PartenersHome />
      <ContactUsHome />
    </div>
  );
}
export default MiddleHome;