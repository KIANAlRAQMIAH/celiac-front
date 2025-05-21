import Image from "next/image";
import React from "react";
import celiacImg from "./Group.png";
import CeliacForm from "@/components/celiacCard/CeliacCardForm";
import frameImg from "./Frame.png";
import Link from "next/link";
import { Paper } from "@mantine/core";

const CeliacCard = () => {
  return (
    <div className="">
      <div className="bg-[#F4F9F7] pb-[80px]">
        <div className="container">
          <div className="grid grid-cols-12  gap-2 p-[60px]">
            <div className="col-span-8 flex flex-col justify-center items-start gap-4">
              <h4 className="text-[#019867] font-semibold"> بطاقه السلياكي</h4>
              <p className="font-medium text-[#4f5352] w-[70%]">
                هي بطاقة نشرف على انشائها حيث يمكن لمريض السلياك من خلالها
                الحصول على الخصومات الكبيرة على المتاجر التى تنتج المنتجات
                الخالية من الجلوتين للمساهمه فى العيش عيشة حرية وخالية من
                المشكلات ..... تقدم بطلب للحصول على بطاقة السلياكي الآن حتي تحصل
                على الخصومات الكبيرة فى اقرب فترة ممكنة وتناول الاطعمة الصحية
                والغير مضرة .
              </p>
            </div>
            <div className="col-span-3">
              <div className="w-[379px] h-[379px] rounded-[50%] bg-[#019867] flex justify-center items-end">
                <Image src={celiacImg.src} width="140" height="358" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  w-[974px] m-auto mb-[60px] relative ">
        <div className="translate-y-[-100px]">
          <Paper shadow="md" radius={10}>
            <div className="flex justify-between p-[24px]">
              <div className="flex flex-col gap-[24px] items-start w-[50%]  ">
                <h5>
                  حرصا منا على سلامتك قمنا بتوفير قائمة بالمتاجر والمختبرات و
                  العيادات التي تدعم بطاقة سلياكي
                </h5>

                <Link
                  href="/"
                  className="bg-[#019867] rounded-[50px] w-auto py-[14px] px-[24px] text-white"
                >
                  اعرض الآن
                </Link>
              </div>
              <div className="">
                <Image src={frameImg.src} width="316" height="168" alt="" />
              </div>
            </div>
          </Paper>
        </div>

        <div className="text-center">
          <h4 className="font-semibold">
            أملئ الفورم الموجودة بالاسفل لطلب الحصول على بطاقة سلياكي
          </h4>
        </div>
        <CeliacForm />
      </div>
    </div>
  );
};

export default CeliacCard;
