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
interface IFormValues {
    is_saudi: string
    visitor: boolean
    resident: boolean
    name: string
}
const ContactUsForm = () => {
    const form = useForm<IFormValues>({
        initialValues: {
            is_saudi: '0',
            visitor: false,
            resident: false,
            name: '',
        },

        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <div className="">
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
                        <div className="flex gap-[24px] items-center">
                            <div className="w-[50%]">
                                <CustomInputWithIcon
                                    label="رقم الجوال"
                                    placeholder="رقم الجوال"
                                    value=""
                                    {...form.getInputProps('phone')} />
                            </div>
                            <div className="w-[50%]">
                                <TextInput
                                    size="lg"
                                    rightSectionPointerEvents="none"
                                    radius={40}
                                    {...form.getInputProps('email')}
                                    label=" البريد الالكترونى"
                                    placeholder=" ex: someone@gmail.com"
                                />
                            </div>
                        </div>
                        <Textarea
                            label="نص الرسالة"
                            placeholder="اكتب نص الرسالة هنا ..."
                            rows={6}
                            resize="vertical"
                        />
                        <div className="flex flex-col gap-4 ">
                            <Button
                                color="primary"
                                variant="filled"
                                size="lg"
                                type="submit"
                                radius={25}
                                className="font-medium w-max"
                            // onClick={props.openOtp}
                            >
                                ارسال
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ContactUsForm;
