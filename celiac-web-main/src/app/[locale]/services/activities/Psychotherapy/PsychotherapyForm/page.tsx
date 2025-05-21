"use client";
import React from "react";

import {
    Button,
    Checkbox,
    FileInput,
    Group,
    Input,
    PasswordInput,
    Radio,
    Text,
    TextInput,
    Textarea,
} from "@mantine/core";
import { GrUploadOption } from "react-icons/gr";
import { FaCalendar } from "react-icons/fa6";
import { DateInput } from "@mantine/dates";
import { Paper } from "@mantine/core";
import CustomInputWithIcon from "@/components/Auth/CustomnputWithIcon/CustomInputWithIcon";
import { useForm } from '@mantine/form';
import Breadcrumb from "@/components/Breadcrumb";
import { CustomDropDown } from "@/components/customDropDown";
import saudiFlag from '../../../../../../../public/saudiaFlag.png'
import Image from "next/image";
interface IFormValues {
    is_saudi: string
    visitor: boolean
    resident: boolean
    name: string;
    country_code: string
}
const PsychotherapyForm = () => {
    const breadcrumbData = [
        { title: "الرئيسية", link: "/" },
        { title: "الخدمات", link: "/en/services" },
        { title: "الأنشطة", link: "/en/services/activities" },
        { title: "العلاج النفسي", link: "/en/services/activities/Psychotherapy" }
    ];
    const value = (
        <div className="flex justify-center items-center gap-1 ">
            <div className="text-[#001F15]">+966</div>
            <Image src={saudiFlag} alt="saudiaFlag" height={30} width={27} />
        </div>
    );

    const form = useForm<IFormValues>({
        initialValues: {
            is_saudi: '0',
            visitor: false,
            resident: false,
            name: '',
            country_code: '966'
        },

        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const handleSelectedNumber = (countryCode: string) => {
        form.setValues((prev) => ({ ...prev, 'country_code': countryCode }))
    };
    return (
        <div className=" bg-[#F7F8FA] py-[20px]">
            <div className="container">
                <Breadcrumb items={breadcrumbData} />
                <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center  m-auto">
                    <Paper radius={25} shadow="md">
                        <form onSubmit={form.onSubmit((values) => console.log(values))}>
                            <div className="p-[32px]">
                                <div className="gap-[32px]">
                                    <div className="flex flex-col gap-[24px] text-start">
                                        <TextInput
                                            size="lg"
                                            rightSectionPointerEvents="none"
                                            radius={40}
                                            label="الاسم كاملا"
                                            placeholder="ادخل الاسم كاملا"
                                            {...form.getInputProps('name')}
                                        />
                                        {/* <CustomInputWithIcon
                                            label="رقم الجوال"
                                            placeholder="رقم الجوال"
                                            value=""
                                            {...form.getInputProps('phone')} /> */}
                                        <TextInput
                                            type='number'
                                            className="input_container"
                                            size="lg"
                                            radius={40}
                                            placeholder="ادخل رقم الجوال"
                                            value=''
                                            rightSection={<CustomDropDown initShowflagAndNum={value} onSelectNumber={handleSelectedNumber} />}
                                            {...form.getInputProps('phone')}
                                        />
                                        <TextInput
                                            size="lg"
                                            rightSectionPointerEvents="none"
                                            radius={40}
                                            {...form.getInputProps('email')}
                                            label=" البريد الالكترونى"
                                            placeholder=" ex: someone@gmail.com"
                                        />
                                        <div className="flex gap-3">
                                            <Radio.Group>
                                                <Group mt="xs">
                                                    <Radio
                                                        size="xs"
                                                        value='0'
                                                        color="primary"
                                                        onChange={() => { }}
                                                        label=" ذكر "
                                                    />
                                                    <Radio
                                                        color="primary"
                                                        size="xs"
                                                        value='1'
                                                        checked
                                                        onChange={() => { }}
                                                        label="انثي "
                                                    />
                                                </Group>
                                            </Radio.Group>
                                        </div>
                                        <DateInput
                                            size="lg"
                                            rightSectionPointerEvents="none"
                                            radius={40}
                                            label=" تاريخ الميلاد"
                                            placeholder="dd - mm - yy"
                                            rightSection={<FaCalendar />}
                                        />
                                        <div className="flex flex-col gap-4 ">
                                            <Button
                                                color="primary"
                                                variant="filled"
                                                size="lg"
                                                type="submit"
                                                radius={25}
                                                className="font-medium"
                                            // onClick={props.openOtp}
                                            >
                                                ارسال الطلب
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default PsychotherapyForm;
