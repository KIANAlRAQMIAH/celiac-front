import Breadcrumb from "@/components/Breadcrumb";
import CommittesCards from "./_components/CommittesCards";

function Committees() {
  const breadcrumbData = [
    { title: "الرئيسية", link: "/" },
    { title: "اللجان", link: "#" },
   ];
  return (
    <div className="container" >
      <Breadcrumb items={breadcrumbData} />
      <div className="my-10">
        <CommittesCards />
        
      </div>
    </div>
  );
}

export default Committees;
