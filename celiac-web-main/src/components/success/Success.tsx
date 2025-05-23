import React from "react";
import "./success.css";
export const Success = () => {
  return (
    <div className="h-[100vh] flex justify-center flex-col gap-7 items-center">
      <svg
        className="ft-green-tick"
        xmlns="http://www.w3.org/2000/svg"
        height="100"
        width="100"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22" />
        <path
          className="tick"
          fill="none"
          stroke="#FFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M14 27l5.917 4.917L34 17"
        />
      </svg>

      <p className="text-[#219a00] font-semibold text-[20px]">
        تمت عملية الحجز بنجاح
      </p>
    </div>
  );
};
