
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

type CustomDataInputProps = {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
};

const CustomDataInput: React.FC<CustomDataInputProps> = ({ label, value, onChange }) => {
    // Custom input component
    const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
        <div className="relative ">
            <input
                type="text"
                value={value}
                onClick={onClick}
                readOnly
                className="bg-[#F5F5F5] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <FaCalendarAlt className="absolute top-4.5 ltr:right-3 rtl:left-3   text-[#ecb022] " onClick={onClick} />
        </div>
    );

    return (
        <div className="lg:col-span-12 col-span-12 ">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <DatePicker
                selected={value}
                onChange={onChange}
                customInput={<CustomInput />}
                wrapperClassName="w-full" // Ensures the wrapper takes the full width
            />
        </div>
    );
};

export default CustomDataInput;
