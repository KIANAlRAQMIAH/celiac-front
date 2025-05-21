import React, { useEffect, useState } from 'react';
import Calendar from '../Calendar';
import { Link } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { useEnableDayesMutation, useGetClincesQuery, useGetClinincDayesByMonthQuery } from '../../../../api/ClinicSlice/reservation';
import Loader from '../../../../components/Loader';
import dayjs from 'dayjs';

type OptionType = {
    value: string;
    label: string;
};

type ClinicType = {
    id: string;
    name: string;
    number_of_doctors: string;
    duration: string;
    start_time: string;
};

const CreateReservation = () => {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [selectedClinic, setSelectedClinic] = useState<ClinicType>({
        id: '',
        name: '',
        number_of_doctors: '',
        duration: '',
        start_time: '',
    });
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('MM'));
    const [clinicId, setClinicId] = useState<string>('');
    const [options, setClinicsOptions] = useState<OptionType[]>([]);
    const [defaultOption, setDefaultOption] = useState<OptionType | null>(null);

    const { data, isLoading, isSuccess } = useGetClincesQuery();
    const { refetch, data: dayesData, isLoading: dayesIsLoading, isSuccess: dayesIsSuccess, isFetching: dayesIsFetching } = useGetClinincDayesByMonthQuery({ currentMonth, clinicId });

    useEffect(() => {
        refetch();
    }, [currentMonth, clinicId, refetch]);

    useEffect(() => {
        if (clinicId && data?.data) {
            const clinic = data.data.find((clinic: ClinicType) => clinic.id === clinicId);
            if (clinic) {
                setSelectedClinic(clinic);
            }
        }
    }, [clinicId, data]);

    useEffect(() => {
        const dates = dayesData?.data?.map((day: any) => day.day_date_gregorian) || [];
        setSelectedDates(dates);
    }, [dayesData]);

    useEffect(() => {
        if (data?.data) {
            const options: OptionType[] = data.data.map((clinic: ClinicType) => ({
                value: clinic.id,
                label: clinic.name,
            }));
            setClinicsOptions(options);
            setDefaultOption(options[0] || null);
            setClinicId(options[0]?.value);
        }
    }, [data]);

    const [enableDayes, { isLoading: enableIsLoading }] = useEnableDayesMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (clinicId) {
            const response = await enableDayes({ dates: selectedDates, clinic_id: clinicId });
            setSelectedDates([]);
        }
    };

    return (
        <>
            {isLoading || enableIsLoading ? (
                <Loader />
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center ">
                                <nav className="flex" aria-label="Breadcrumb">
                                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                        <li className="inline-flex items-center">
                                            <Link to="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                                </svg>
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <div className="flex items-center">
                                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                                <Link to="/clinic/reservation" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                                    The clinic
                                                </Link>
                                            </div>
                                        </li>
                                        <li aria-current="page">
                                            <div className="flex items-center">
                                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"> Book appointments</span>
                                            </div>
                                        </li>
                                    </ol>
                                </nav>

                                <button type="submit" className="bg-[blue] hover:bg-[blue] text-white font-bold py-2 px-4 rounded">
                                    Save Changes
                                </button>
                            </div>
                            <div className="flex justify-between items-center ">
                                <Link to="#" className="text-[24px] font-bold">
                                    Holiday
                                </Link>
                                <div className="relative">
                                    <div className="flex justify-center">
                                        {isSuccess && (
                                            <Select
                                                className="w-[300px] rtl"
                                                onChange={(value: SingleValue<OptionType>) => {
                                                    setClinicId(value ? value?.value : '');
                                                    setDefaultOption(value);
                                                }}
                                                value={defaultOption}
                                                options={options}
                                                isSearchable={false}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 w-full gap-6">
                                <div className="flex flex-col col-span-6 ">
                                    <label htmlFor="doctors">Number of doctors</label>
                                    <input id="doctors" type="text" disabled placeholder={selectedClinic.number_of_doctors} className="form-input" />
                                </div>
                                <div className="flex flex-col col-span-6  ">
                                    <label htmlFor="duration">Detection duration</label>
                                    <input id="duration" disabled type="text" placeholder={selectedClinic.duration} className="form-input" />
                                </div>
                                <div className="flex flex-col col-span-6  ">
                                    <label htmlFor="start_time">Start Time</label>
                                    <input id="start_time" type="text" placeholder={selectedClinic.start_time} disabled className="form-input" />
                                </div>
                            </div>

                            <Calendar currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} setSelectedDates={setSelectedDates} selectedDates={selectedDates} />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default CreateReservation;
