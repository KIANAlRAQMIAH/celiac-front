import Breadcrumb from "@/components/Breadcrumb";
import XVideoCard from "./_components/XVideoCard";

function XPlatformSpaces() {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "المركز الاعلامي", link: "/en/MediaCenter" },
        { title: "مساحات منصة X", link: "/en/MediaCenter/XPlatformSpaces" },
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

export default XPlatformSpaces;
