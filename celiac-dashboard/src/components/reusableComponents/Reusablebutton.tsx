
type ButtonProps = {
    label: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset' | undefined;
};
const ReusableButton = (props: ButtonProps) => {
    return (
        <button
            type={props.type ? `${props.type}` : 'button'}
            className="text-white flex    bg-gradient-to-r from-[#F23F39] to-[#BD0600]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export default ReusableButton;
