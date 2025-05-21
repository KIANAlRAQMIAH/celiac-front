"use client";
import React from "react";
import {
  Button,
  Group,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import { GrUploadOption } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa6";
import { DateInput } from "@mantine/dates";
import "./style.css";
import { z } from "zod";
import { Paper } from "@mantine/core";
import CustomInputWithIcon from "@/components/Auth/CustomnputWithIcon/CustomInputWithIcon";
import { useForm, zodResolver } from "@mantine/form";
import { useRequestCeliacCardMutation } from "@/api/Clinic/ClinicApiSlice";

const consultationSchema = z.object({
  // full_name: z.string().min(1, "Full name is required"),
  // phone: z.string().min(1, "Phone number is required"),
  // email: z.string().email("Invalid email address"),
  // dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
  //   message: "Invalid date format",
  // }),
  is_saudi: z.boolean(),
  // national_id: z.string().min(1, "National ID is required"),
  // address: z.string().min(1, "Address is required"),
  // gender: z.enum(["0", "1"]),
  // medical_report: z.instanceof(File).optional(),
  // residency_number: z.string().min(1, "Residency number is required"),
});

const CeliacForm = () => {
  const [CeilacCardData, { isLoading: updateReservationLoading }] = useRequestCeliacCardMutation();
  const form = useForm({
    initialValues: {
      full_name: '',
      phone: '',
      email: '',
      dob: new Date(),
      is_saudi: false,
      national_id: '',
      address: '',
      gender: '0',
      medical_report: null,
      residency_number: '',
    },
    validate: zodResolver(consultationSchema),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("phone", e.target.value);
  }

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "dob") {
        const date = new Date(value as string);
        value = date.toISOString().split('.')[0]; // Format to YYYY-MM-DDTHH:MM:SS
      }
      if (key === "is_saudi") {
        value = value === true || value === "true"; // Ensure boolean value
      }// @ts-ignore
      formData.append(key, value);
    });
    CeilacCardData(formData);
  };

  return (
    <div className="">
      <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center m-auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Paper radius={25} shadow="md">
            <div className="p-[32px]">
              <div className="gap-[32px]">
                <div className="flex flex-col gap-[24px] text-start">
                  <TextInput
                    size="lg"
                    rightSectionPointerEvents="none"
                    radius={40}
                    {...form.getInputProps("full_name")}
                    label="الاسم كاملا"
                    placeholder="ادخل الاسم كاملا"
                    error={form.errors.full_name}
                  />
                  <div className="flex gap-[24px] items-center">
                    <div className="w-[50%]">
                      <CustomInputWithIcon
                        label="رقم الجوال"
                        placeholder="رقم الجوال"
                        value={form.values.phone}
                        handleChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="w-[50%]">
                      <TextInput
                        size="lg"
                        {...form.getInputProps("email")}
                        rightSectionPointerEvents="none"
                        radius={40}
                        label=" البريد الالكترونى"
                        placeholder=" ex: someone@gmail.com"
                        error={form.errors.email}
                      />
                    </div>
                  </div>
                  <div className="">
                    <TextInput
                      size="lg"
                      {...form.getInputProps("residency_number")}
                      rightSectionPointerEvents="none"
                      radius={40}
                      label=" رقم الاقامة"
                      placeholder=" ex: someone@gmail.com"
                      error={form.errors.residency_number}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Radio.Group
                      value={form.values.is_saudi ? "saudi" : "resident"}
                      onChange={(value) =>
                        form.setFieldValue("is_saudi", value === "saudi")
                      }
                    >
                      <Group mt="xs">
                        <Radio
                          size="xs"
                          color="primary"
                          value="saudi"
                          label=" سعودي "
                        />
                        <Radio
                          color="primary"
                          size="xs"
                          value="resident"
                          label="مقيم "
                        />
                      </Group>
                    </Radio.Group>
                  </div>

                  <TextInput
                    size="lg"
                    rightSectionPointerEvents="none"
                    radius={40}
                    label=" رقم الهوية"
                    {...form.getInputProps("national_id")}
                    placeholder=" رقم الهوية"
                    error={form.errors.national_id}
                  />
                  <TextInput
                    size="lg"
                    rightSectionPointerEvents="none"
                    radius={40}
                    {...form.getInputProps("address")}
                    label="  مكان الاقامة "
                    placeholder=" اكتب عنوان اقامتك"
                    error={form.errors.address}
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
                          color="primary"
                          value="0"
                          label=" ذكر "
                        />
                        <Radio
                          color="primary"
                          size="xs"
                          value="1"
                          label="انثي "
                        />
                      </Group>
                    </Radio.Group>
                  </div>
                  <DateInput
                    size="lg"
                    rightSectionPointerEvents="none"
                    radius={40}
                    {...form.getInputProps("dob")}
                    label=" تاريخ الميلاد"
                    placeholder="dd - mm - yy"
                    rightSection={<FaCalendar />}
                    error={form.errors.dob}
                  />
                  <div className="relative bg-[#0198670D] overflow-hidden p-[24px] border-dashed border-[1px] border-[#019867] rounded-[15px] flex flex-col justify-center items-center gap-3">
                    <GrUploadOption size={35} color="#019867" />
                    <p className="text-[12px] text-[#45534E] font-[400]">
                      من فضلك ارفق الملف الطبي الخاص بحالة مرضك بالسيلياك
                    </p>
                    <p className="text-[12px] text-[#45534e74] font-[400]">
                      .pdf, png, jpg, jpeg
                    </p>
                    <input
                      type="file"
                      onChange={(event) =>// @ts-ignore
                        form.setFieldValue("medical_report", event.currentTarget.files?.[0] || null)
                      }
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-4 ">
                    <Button
                      color="primary"
                      variant="filled"
                      size="lg"
                      type="submit"
                      radius={25}
                      className="font-medium"
                    >
                      ارسال الطلب
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default CeliacForm;