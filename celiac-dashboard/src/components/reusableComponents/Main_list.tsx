import { Mainlist } from '../../types/type';
import CustomSelect from './CustomSelect';
const Main_list = (props: Mainlist) => {

    return <div className="flex flex-col gap-[20px]  w-full  rounded-[20px] p-[16px]  md:p-[28px]">

        <h2 className='text-[24px] text-[#373837] font-semibold'>{props.title}</h2>
        <div>
            {props.children}
        </div>
    </div>;
};

export default Main_list;
