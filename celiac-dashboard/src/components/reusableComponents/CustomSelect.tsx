import React from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { customSelectProps } from '../../types/type';

const CustomSelect = (props: customSelectProps) => {
  
  const customStyles = {
    container: (provided:any) => ({
      ...provided,
      borderColor: 'transparent', // Adjust the border color as needed
      borderWidth: .5,
      borderRadius: 4,
    }),
    control: (provided:any, state:any) => ({
      ...provided,
      borderColor: '#d1d5db', // This will affect the border color of the control
      '&:hover': {
        borderColor: '#d1d5db', // Ensure the border color remains red on hover
      },
      boxShadow: 'none', // Remove any default box-shadow
    }),
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#F23F39' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    menu: (provided:any) => ({
      ...provided,
      borderColor: 'red', // Optional: If you want to set a border color for the dropdown menu
    }),
    // Add more styles here if needed
  };
  const handleSelectChange = (
    newValue: SingleValue<{ value: any; label: string }>,
    actionMeta: ActionMeta<{ value: any; label: string }>
  ) => {
    const selectedValue = newValue ? newValue.value : 0; // Extract the value or set an empty string if null
    props.onChange(selectedValue); // Pass the selected value (or empty string) back to the parent
  };
    return <>

<div className="relative ">
<label htmlFor="" className=" text-[16px]  font-[500]   pb-1 ">                {props.label}
</label>


            <Select  defaultValue={props?.options[0]} className="select_styles" options={props?.options} isSearchable={false} onChange={handleSelectChange}  styles={customStyles} />
        </div>
    </>



};

export default CustomSelect;
