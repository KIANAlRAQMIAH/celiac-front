import { useGetCountriesQuery } from "@/api/HomeApiSlice";
import Image from "next/image";
import { useState } from "react";

interface ICountry {
  id: number;
  international_phone: string;
  image: string;
  official_name: string;
}

interface CustomDropDownProps {
  initShowflagAndNum: JSX.Element;
  onSelectNumber: (phoneNumber: string) => void;
}

export function CustomDropDown({ initShowflagAndNum, onSelectNumber }: CustomDropDownProps) {
  const { data: countriesData, isLoading }: any = useGetCountriesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (country: ICountry) => {
    setSelectedCountry(country);
    setIsOpen(false);
    onSelectNumber(country.international_phone);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between w-30 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        onClick={toggleDropdown}
      >
        {selectedCountry ? (
          <div className="flex justify-center items-center " onClick={() => handleOptionClick(selectedCountry)}>
            <span className="p-1 text-black">+{selectedCountry.international_phone}</span>
            <Image
              src={selectedCountry.image}
              alt={selectedCountry.official_name}
              width={24}
              height={24}
            />
          </div>
        ) : (
          <span>{isLoading ? "Loading..." : initShowflagAndNum}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 px-2 z-10 mt-1 w-max max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {countriesData?.data?.map((country: ICountry) => (
            <div
              key={country.id}
              className="flex mt-2 justify-end items-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(country)}
            >
              <span className="text-[#001F15] px-2">
                +{country.international_phone}
              </span>
              <Image
                src={country.image}
                alt={country.official_name}
                width={24}
                height={24}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
