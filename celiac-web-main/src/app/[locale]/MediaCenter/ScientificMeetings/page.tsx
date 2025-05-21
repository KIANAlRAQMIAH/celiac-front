import Breadcrumb from "@/components/Breadcrumb";
import XVideoCard from "../XPlatformSpaces/_components/XVideoCard";

function ScientificMeetings() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "المركز الاعلامي", link: "/en/MediaCenter" },
        { title: "اللقاءات العلمية", link: "/en/MediaCenter/ScientificMeetings" },
    ];
    return (
        <div className="bg-[#F7F8FA] pb-[40px]">
            <div className="container" >
                <Breadcrumb items={breadcrumbData} />
                <div className="pb-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    <XVideoCard />
                    <XVideoCard />
                    <XVideoCard />
                    <XVideoCard />
                    <XVideoCard />
                    <XVideoCard />
                </div>
            </div>
        </div>
    );
}

export default ScientificMeetings;
