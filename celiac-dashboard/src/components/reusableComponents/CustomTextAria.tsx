
import { CustomTextAriaProps } from '../../types/type';

const CustomTextAria = (props: CustomTextAriaProps) => {
    return (
        <div className="col-span-12">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {props?.label} <span className="bg-custom-gradient bg-clip-text text-transparent font-medium text-[16px]">{props.labelLang}</span>
            </label>

            <textarea
                rows={4}
                name={props?.name}
                id="name"
                onChange={props?.onChange}
                value={props?.value}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={props?.placeholder}
                required={props.required? props.required : false}
            />
        </div>
    );
};

export default CustomTextAria;
