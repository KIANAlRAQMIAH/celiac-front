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
import { PiWarningCircle } from "react-icons/pi";
interface IFormValues {
    is_saudi: string
    visitor: boolean
    resident: boolean
    name: string
    student: boolean
}
const MembershipForm = () => {
    const form = useForm<IFormValues>({
        initialValues: {
            is_saudi: '0',
            visitor: false,
            resident: false,
            name: '',
            student: false
        },

        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <div className="">
            <div className="sm:w-[100%] md:w-[603px] lg:w-[703px] text-center     m-auto">
                <Paper radius={25} shadow="md">
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <div className="p-[32px]">
                            <div className="gap-[32px]">
                                <div className="flex flex-col gap-[24px] text-start">
                                    <div className="flex gap-2 rounded-[14px] p-[14px] bg-[#9A9A3A1A] items-center">
                                        <PiWarningCircle color="#9A9A3A" size={20} />
                                        <p className="text-[#001F15] text-[15px] font-[500]">هذه الخدمة متاحة فقط لحاملى الجنسية السعودية .</p>
                                    </div>
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        label="الاسم كاملا"
                                        placeholder="ادخل الاسم كاملا"
                                        {...form.getInputProps('name')}
                                    />
                                    <CustomInputWithIcon
                                        label="رقم الجوال"
                                        placeholder="رقم الجوال"
                                        value=""
                                        {...form.getInputProps('phone')} />
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        {...form.getInputProps('email')}
                                        label=" البريد الالكترونى"
                                        placeholder=" ex: someone@gmail.com"
                                    />
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        label='الجنسية'
                                        placeholder=" سعودى"
                                    />
                                    <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        label='رقم الهوية'
                                        placeholder=" رقم الهوية"
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
                                    <div className="flex gap-3">
                                        <Radio.Group>
                                            <Group mt="xs">
                                                <Radio
                                                    size="xs"
                                                    color="primary"
                                                    value='0'
                                                    {...form.getInputProps('student', { type: 'checkbox' })}
                                                    label=" موظف "
                                                />
                                                <Radio
                                                    value='1'
                                                    color="primary"
                                                    size="xs"

                                                    {...form.getInputProps('student', { type: 'checkbox' })}
                                                    label="طالب "
                                                />
                                            </Group>
                                        </Radio.Group>
                                    </div>

                                    {form.values.student == false && <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        placeholder=" الوظيفة"
                                    />}
                                    {form.values.student == true && <TextInput
                                        size="lg"
                                        rightSectionPointerEvents="none"
                                        radius={40}
                                        placeholder=" ادخل مجال الدراسة"
                                    />}
                                    <Checkbox color="#019867" label='طلب شهادة حضور' />
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
    );
};

export default MembershipForm;
