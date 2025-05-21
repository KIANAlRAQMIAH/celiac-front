import { NumberInput, TextInput } from "@mantine/core";
import React from "react";
import "./style.css";
import Image from "next/image";
import inputImg from "./Group.svg";
import { CustomDropDown } from "@/components/customDropDown";

type CustomInputWithIconProps = {
  label?: string;
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const value = (
  <div className="flex gap-1 ">
    <div className="text-[#001F15]">+966</div>
    <Image src={inputImg} alt="saudiaFlag" width={24} />
  </div>
);

const CustomInputWithIcon = (props: CustomInputWithIconProps) => {
  return (
    <>
      <TextInput
        className="input_container"
        size="lg"
        rightSectionPointerEvents="none"
        onChange={props.handleChange}
        type="number"
        radius={40}
        rightSection={value}
        label={props.label}
        placeholder={props.placeholder}
        // value={props.value}
        name="phone"
      />
    </>
  );
};

export default CustomInputWithIcon;
