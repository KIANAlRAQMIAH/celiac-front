
import Image from "next/image";
import parentLogo from "../../../public/ParentLogo.png";
export default function Loading() {
    return (
      <div className="flex h-screen items-center  justify-center">
       <Image src={parentLogo} width={200} height={600} className="logo-loading" alt="loading image.." />
      </div>
    );
  }