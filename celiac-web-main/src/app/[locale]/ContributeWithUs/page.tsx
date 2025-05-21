import Breadcrumb from "@/components/Breadcrumb";
import CommittesCards from "../aboutUs/Committees/_components/CommittesCards";
import MediaCenterCards from "../MediaCenter/_components/mediaCenterCards";
import ContributeWithUs from "./_components/contributeWithCards";

function MediaCenter() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "ساهم معنا", link: "/en/ContributeWithUs" },
    ];
    return (
        <div className="container w-full mx-auto" >
            <Breadcrumb items={breadcrumbData} />
            <div className="mb-10 ">
                <ContributeWithUs />
            </div>
        </div>
    );
}

export default MediaCenter;
