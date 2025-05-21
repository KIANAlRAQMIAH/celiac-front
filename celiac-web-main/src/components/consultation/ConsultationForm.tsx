

"use client";
import React from "react";
import "../Auth/CustomnputWithIcon/style.css";
import Image from "next/image";
import inputImg from "../Auth/CustomnputWithIcon/Group.svg";
import {
  Button,
  Group,
  Radio,
  TextInput,
  Textarea,
} from "@mantine/core";
import { FaCalendar } from "react-icons/fa6";
import { DateInput } from "@mantine/dates";
import "./style.css";
import { Paper } from "@mantine/core";
import { useConsultationMutation } from "@/api/Clinic/ClinicApiSlice";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

// Define the Zod schema
const consultationSchema = z.object({
  name: z.string().min(1, { message: "الاسم مطلوب" }),
  phone: z
    .string()
    .nullable()
    .refine((val) => val !== null, {
      message: "رقم الهاتف مطلوب",
    }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  gender: z.enum(["0", "1"], { message: "الجنس مطلوب" }),
  civil_id: z
    .string()
    .length(10, { message: "يجب أن يتكون رقم الهوية من 10 أحرف" }),
  consulting: z.string().min(1, { message: "الاستشارة مطلوبة" }),
  birthdate: z.date(),
  country_code: z.string().min(1, { message: "رمز البلد مطلوب" }),
});

const ConsultationForm = () => {
  const [userData, { data, isSuccess, isLoading, isError, error }] =
    useConsultationMutation();
  const form = useForm({
    initialValues: {
      name: "",
      phone: null,
      email: "",
      gender: "0",
      civil_id: "",
      consulting: "",
      birthdate: new Date(2024, 5, 13),
      country_code: "966",
    },
    validate: zodResolver(consultationSchema),
  });

  const onSubmit = (values: typeof form.values) => {
    userData({
      ...values,
      birthdate: values.birthdate.toISOString().slice(0, 10),
    });
  };

  const value = (
    <div className="flex gap-1 ">
      <div className="text-[#001F15]">+966</div>
      <Image src={inputImg} alt="saudiaFlag" width={24} />
    </div>
  );

  return (
    <div className="bg-[#F7F8FA]">
      <div className="xs:p-[30px] md:p-[40px] ">
        <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center m-auto">
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Paper radius={25}>
              <div className="p-[32px]">
                <h5 className="font-semibold mb-[28px]">استشارة طبية</h5>
                <div className="gap-[32px]">
                  <div className="flex flex-col gap-[32px] text-start">
                    <div className="flex justify-center text-center">
                      <h6 className="w-[80%]">
                        الآن يمكنك طلب استشارة في أي تخصص تريده بكل سهولة وسيصلك الرد في أقرب وقت
                      </h6>
                    </div>
                    <TextInput
                      size="lg"
                      rightSectionPointerEvents="none"
                      radius={40}
                      label="الاسم كاملا"
                      {...form.getInputProps("name")}
                      placeholder="ادخل الاسم كاملا"
                    />
                    <TextInput
                      className="input_container"
                      size="lg"
                      rightSectionPointerEvents="none"
                      {...form.getInputProps("phone")}
                      type="number"
                      radius={40}
                      rightSection={value}
                      label="رقم الجوال"
                      placeholder="رقم الجوال"
                      name="phone"
                    />
                    <TextInput
                      size="lg"
                      rightSectionPointerEvents="none"
                      radius={40}
                      {...form.getInputProps("email")}
                      label="البريد الإلكتروني"
                      placeholder="ex: someone@gmail.com"
                    />
                    <TextInput
                      size="lg"
                      {...form.getInputProps("civil_id")}
                      rightSectionPointerEvents="none"
                      radius={40}
                      label="رقم الهوية"
                      placeholder="رقم الهوية"
                    />
                    <div className="flex gap-3">
                      <Radio.Group
                        value={form.values.gender}
                        onChange={(value) =>
                          form.setFieldValue("gender", value)
                        }
                      >
                        <Group mt="xs">
                          <Radio
                            size="xs"
                            value="0"
                            color="primary"
                            label="ذكر"
                          />
                          <Radio
                            color="primary"
                            size="xs"
                            value="1"
                            label="أنثى"
                          />
                        </Group>
                      </Radio.Group>
                    </div>
                    <DateInput
                      size="lg"
                      rightSectionPointerEvents="none"
                      radius={40}
                      label="تاريخ الميلاد"
                      placeholder="MMMM D, YYYY"
                      {...form.getInputProps("birthdate")}
                      rightSection={<FaCalendar />}
                    />
                    <Textarea
                      label="استشارتك"
                      placeholder="اشرح أو اعرض مشكلتك الصحية"
                      autosize
                      minRows={4}
                      {...form.getInputProps("consulting")}
                    />
                    <div className="flex flex-col gap-4 ">
                      <Button
                        color="primary"
                        variant="filled"
                        size="lg"
                        radius={25}
                        className="font-medium"
                        type="submit"
                      >
                        ارسال
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;