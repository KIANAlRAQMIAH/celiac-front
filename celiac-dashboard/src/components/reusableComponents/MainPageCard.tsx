

import { MainCardProps } from '../../types/type';
const MainPageCard = (props: MainCardProps) => {
    return <div className="flex flex-col gap-[20px] shadow-formBox w-full  rounded-[20px] p-[16px]  md:p-[28px]">{props.children}</div>;
};

export default MainPageCard;
