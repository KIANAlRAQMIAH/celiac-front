import React from 'react';
import Select from 'react-select';
import { customSelectProps } from '../../types/type';

const CustomCurrency = (props: customSelectProps) => {
  const customStyles = {
    option: (provided:any, state:any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#F23F39' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
    menu: (provided:any) => ({
      ...provided,
      zIndex: 20, // Ensure this is higher than the label's z-index
    }),
  };
    return <>
    
    <div className="relative">
    <Select
      defaultValue={props.options[0]}
      className="select_styles pt-1"
      options={props.options}
      isSearchable={false}
      styles={customStyles}
    />
        </div>
    </>
        
     

};

export default CustomCurrency;
