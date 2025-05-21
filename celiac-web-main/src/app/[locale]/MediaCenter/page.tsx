import Breadcrumb from "@/components/Breadcrumb";
import CommittesCards from "../aboutUs/Committees/_components/CommittesCards";
import MediaCenterCards from "./_components/mediaCenterCards";

function MediaCenter() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "المركز الاعلامي", link: "/en/MediaCenter" },
    ];
    return (
        <div className="container" >
            <Breadcrumb items={breadcrumbData} />
            <div className="mb-10">
                <MediaCenterCards />

            </div>
        </div>
    );
}

export default MediaCenter;
