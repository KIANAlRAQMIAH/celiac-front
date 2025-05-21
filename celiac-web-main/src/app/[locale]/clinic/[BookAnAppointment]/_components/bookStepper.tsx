"use client";
import { Button, Divider, Group, Radio, Stepper } from "@mantine/core";
import { useEffect, useState } from "react";
import MajorsCard from "./MajorsCard";
import Image from "next/image";
import ic6 from "../../../../../../public/ic6.png";
import { DatePicker, DateValue } from "@mantine/dates";
import Map from "@/components/ContactUs-Home/Map";
import AppointmentMap from "./appointmentMap";
import AppointmentFrom from "./appointmentFrom";
import AppointmentForm from "./appointmentFrom";
import ic1 from "../../../../../../public/ic1.png";
import calendar from "../../../../../../public/calendar.png";
import {
  useAvailableDayTimeMutation,
  useGetAllClinicsQuery,
} from "@/api/Clinic/ClinicApiSlice";
import { useUpdateReservationMutation } from "@/api/profileApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type selectedClinic = {
  clinicName: string;
  clinicAddress: string;
  clinic_id: string;
  doctors: number;
  time: number;
};

type Props = {
  BookAnAppointment: string;
};

const BookStepper = ({ BookAnAppointment }: Props) => {
  const [active, setActive] = useState(0);
  const { clinicData } = useSelector((state: RootState) => state.Model);
  useEffect(() => { console.log(clinicData.clinic), [clinicData] });
  const [selectedClinicData, setSelectedClinicData] = useState<selectedClinic>({
    clinicName: "",
    clinicAddress: "",
    clinic_id: "",
    doctors: 0,
    time: 0,
  });
  const [date, setDate] = useState<DateValue>(new Date());
  const [stepTwoData, setStepTwoData] = useState({
    type: "",
    dayTime: "",
  });

  const [availabletimes, setAvailabletimes] = useState([]);
  const [checkData, setCheckData] = useState([]);
  // const [selectedClinicDataTime, setSelectedClinicDataTime] =
  //   useState<selectedClinic>({});

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { data, isLoading: clinicIsLoading } = useGetAllClinicsQuery();

  const handleSeocendStep = () => {
    if (stepTwoData.type === "") {
      alert("من فضلك اختر نوع الكشف");
      return;
    }
    if (stepTwoData.dayTime === "") {
      alert("من فضلك اختر ميعاد الكشف");
      return;
    }
    nextStep();
  };
  const [availableDayTime, { isLoading }] = useAvailableDayTimeMutation();
  const [updateReservation, { isLoading: updateReservationLoading }] = useUpdateReservationMutation();

  const convertDate = (date: Date) => {
    // Original date string
    const originalDateString =
      "Sat Aug 24 2024 23:31:38 GMT+0300 (Eastern European Summer Time)";

    // Create a new Date object
    const convertedDate = new Date(date);

    // Extract the year, month, and day
    const year = convertedDate.getFullYear();
    const month = String(convertedDate.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month, so add 1
    const day = String(convertedDate.getDate()).padStart(2, "0");

    // Format the date in YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };
  useEffect(() => {
    const getData = async () => {
      //@ts-ignore
      const newDate = convertDate(date);
      if (selectedClinicData.clinic_id !== "") {
        const data = await availableDayTime({
          clinic_id: selectedClinicData.clinic_id,
          day_date: newDate,
        });
        //@ts-ignore
        //@ts-ignore
        setAvailabletimes(data?.data?.data[0]?.available_times);
        //@ts-ignore
        setCheckData(data?.data?.data);
      }
    };
    getData();
  }, [selectedClinicData.clinic_id, date, availableDayTime]);
  // }, [selectedClinicData.clinic_id, date]);
  const handleSelectedClinic = (
    id: string,
    clinicName: string,
    clinicAddress: string,
    doctors: number,
    time: number
  ) => {
    setSelectedClinicData({
      clinic_id: id,
      clinicName,
      clinicAddress,
      time,
      doctors,
    });
    nextStep();
  };

  // const handleSelectedDateTime = (
  //   id: string,
  //   clinicName: string,
  //   clinicAddress: string
  // ) => {
  //   setSelectedClinicData({ clinic_id: id, clinicName, clinicAddress });
  //   nextStep();
  // };

  return (
    <div className="py-[20px]">
      <Stepper size="xs" active={active} onStepClick={setActive}>
        <Stepper.Step label="اختر التخصص" description="">
          <div className=" flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[24px] font-bold text-[#001F15]">
                البيانات وتأكيد الحجز
              </h2>
              <p className="text-[#869791] text-[16px] font-[400]">
                اختر التخصص الذي تريد الحجز به من بين التخصصات التالية حتي نقوم
                بتوفير المواعيد المتاحة التى يمكنك الاختيار من بينها
              </p>
            </div>
            {clinicIsLoading ? (
              <div className="flex justify-center items-center h-full">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
                {data?.data?.map((item: any) => (
                  <MajorsCard
                    key={item.id}
                    nextStep={nextStep}
                    handleSelectedClinic={handleSelectedClinic}
                    id={item.id}
                    location={item?.location}
                    name={item?.name}
                    doctors={item?.number_of_doctors}
                    duration={item?.duration}
                  />
                ))}
              </div>
            )}
          </div>
        </Stepper.Step>

        <Stepper.Step label="اختر الوقت المناسب" description="">
          <div className=" flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[24px] font-bold text-[#001F15]">
                الوقت المناسب
              </h2>
              <p className="text-[#869791] text-[16px] font-[400]">
                اختر الوقت المناسب لك من بين الاوقات المتاحة لهذا التخصص , اختر
                اليوم وانتقل الى بياناتك الشخصية لتأكيد الحجز
              </p>
              <div className=" flex justify-start items-center gap-2">
                <Image alt="icon" src={ic6} />
                <p>{selectedClinicData?.clinicAddress}</p>
                <Image alt="icon" src={ic6} />
                <p>{selectedClinicData?.time} دقيقة</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <div className="border-solid border-[1px] border-[#C1D2CC] rounded-[16px] col-span-2 ">
                <div className="flex md:flex-row flex-col   justify-between items-center p-[24px] border-b-solid border-b-[1px] mb-5 border-b-[#C1D2CC]">
                  <p className="text-[#001F15] text-[16px] font-bold">
                    حدد اليوم المناسب لك ثم قم باختيار انسب الاوقات لك
                  </p>
                  <div className="flex justify-center items-center gap-2 ">
                    <Radio
                      // labelPosition="left"
                      label="الكشف من موقع العيادة"
                      color="#019867"
                      value="1"
                      checked={stepTwoData.type === "1"}
                      onClick={() =>
                        setStepTwoData({ ...stepTwoData, type: "1" })
                      }
                    />
                    <Radio
                      // labelPosition="left"
                      label="الكشف عن بعد"
                      color="#019867"
                      value="2"
                      // defaultChecked={stepTwoData.type === "2"}
                      checked={stepTwoData.type === "2"}
                      onClick={() =>
                        setStepTwoData({ ...stepTwoData, type: "2" })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-[24px]">
                  <DatePicker
                    className=" max-w-[100%]"
                    color="red"
                    onChange={(date: DateValue) => setDate(date)}
                  />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#001F15] text-[16px] font-bold">
                      المواعيد المتاحة
                    </p>

                    {isLoading ? (
                      <div className="flex justify-center items-center h-full">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full">
                        {checkData?.length === 0 ? (
                          <div className="flex h-full justify-center items-center">
                            <p className="text-gray-500">
                              لا توجد مواعيد متاحة
                            </p>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
                            {availabletimes?.map((time, index) => (
                              <div
                                key={index}
                                onClick={() =>
                                  setStepTwoData({
                                    ...stepTwoData,
                                    dayTime: time,
                                  })
                                }
                                className={
                                  stepTwoData?.dayTime === time
                                    ? "border-solid hover:shadow-xl bg-[#019867] text-[#FFF] transition cursor-pointer border-[1px] flex justify-center items-center border-[#DEE2E6] rounded-[7px] p-[8px]"
                                    : "border-solid hover:shadow-xl hover:bg-[#019867] hover:text-[#FFF] transition cursor-pointer border-[1px] flex justify-center items-center border-[#DEE2E6] rounded-[7px] p-[8px]"
                                }
                              >
                                <p>{time}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full justify-between gap-[12px]">
                <div className=" flex-grow min-h-[200px]">
                  <AppointmentMap />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[#001F15] text-[16px] font-[600]">
                    {selectedClinicData.clinicName}
                  </p>
                  <p className="text-[#869791] text-[16px] font-[400]">
                    {selectedClinicData.clinicAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <Group justify="center" mt="xl">
                <button
                  className="bg-[#019867] text-[white] px-[4px] py-[8px] w-[219px] rounded-[50px]"
                  onClick={prevStep}
                >
                  رجوع
                </button>
                <button
                  className="bg-[transparent] hover:bg-[#019867] hover:text-[#FFF] transition text-[#019867] border-solid border-[1px] border-[#019867] px-[4px] py-[8px] w-[219px] rounded-[50px]"
                  onClick={handleSeocendStep}
                >
التالي                </button>
              </Group>
            </div>
          </div>
        </Stepper.Step>
        <Stepper.Step label="البيانات وتأكيد الحجز" description="">
          <div className=" flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[4px]">
              <h2 className="text-[24px] font-bold text-[#001F15]">
                البيانات وتأكيد الحجز
              </h2>
              <p className="text-[#869791] text-[16px] font-[400]">
                ادخل البيانات المطلوبة بالاسفل ثم اضغط على زر تأكيد الحجز
                لاستكمال عملية الحجز الخاصة بك
              </p>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <div className="border-solid border-[1px] border-[#C1D2CC] rounded-[16px] col-span-2 ">
                <form>
                  <AppointmentForm
                    prevStep={prevStep}
                    nextStep={nextStep}
                    clinic_id={selectedClinicData?.clinic_id}
                    type={stepTwoData.type}
                    //@ts-ignore
                    scheduled_date={convertDate(date)}
                    scheduled_time={stepTwoData.dayTime}
                    BookAnAppointment={BookAnAppointment}

                  />
                </form>
              </div>
              <div className="flex flex-col w-full justify-between h-max gap-[12px] py-[24px] border-solid border-[1px] border-[#C1D2CC] rounded-[16px]">
                <p className="text-[#869791] text-[14px] font-[600] mx-[24px]">
                  تفاصيل الحجز
                </p>
                <div className="flex w-full gap-4 px-[24px]">
                  <div className="bg-[#0198682a] flex flex-col justify-center items-center  w-[60px] min-w-[60px] min-h-[60px] h-[60px] rounded-[50%]">
                    <Image className="w-[70%]" alt="icon" src={ic1} />
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <h2 className="text-[16px] font-bold text-[#001F15]">
                      {selectedClinicData?.clinicName}
                    </h2>
                    <p className="text-[#869791] text-[16px] font-[400] break-words">
                      {selectedClinicData?.clinicAddress}
                    </p>
                  </div>
                </div>
                <Divider className="my-[20px]" />
                <div className="flex gap-2 items-center mx-[24px]">
                  <Image alt="calendar" src={calendar} />
                  <div className="flex gap-2  items-center">
                    <p className="text-[#869791]">تاريخ الحجز:</p>
                    <p className="text-[#001F15]">
                      {/* @ts-ignore */}
                      {stepTwoData?.dayTime} - {convertDate(date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-start">
                            <Group justify="center" mt="xl">
                                <button className="bg-[#019867] text-[white] px-[4px] py-[8px] w-[219px] rounded-[50px]" onClick={prevStep}>Back</button>
                                <button className="bg-[transparent] hover:bg-[#019867] hover:text-[#FFF] transition text-[#019867] border-solid border-[1px] border-[#019867] px-[4px] py-[8px] w-[219px] rounded-[50px]" onClick={nextStep}>Next step</button>
                            </Group>
                        </div> */}
          </div>
        </Stepper.Step>
        <Stepper.Completed>
        اكتمل، انقر على زر الرجوع للعودة إلى الخطوة السابقة.
        </Stepper.Completed>
      </Stepper>

      {/* <Group justify="center" mt="xl">
                <Button variant="default" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next step</Button>
            </Group> */}
    </div>
  );
};

export default BookStepper;
