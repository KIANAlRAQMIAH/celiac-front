import React from 'react';
import MainPageCard from './MainPageCard';
import { formLayoutProps } from '../../types/type';
const FormLayout = (props: formLayoutProps) => {
    return (
        <>
            {props.title && <h2 className="text-[24px] font-[500] text-[#373837]">{props.title}</h2>}
            <div className="flex flex-col gap-[24px] bg-white shadow-formBox  rounded-[16px] p-[12px]">{props.children}</div>
        </>
    );
};

export default FormLayout;
