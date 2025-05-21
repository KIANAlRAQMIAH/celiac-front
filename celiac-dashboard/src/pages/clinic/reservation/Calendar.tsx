import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import DateSelectArg from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayjs from 'dayjs';

type CalendarProps = {
    selectedDates: string[];
    setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
    currentMonth: string;
    setCurrentMonth: React.Dispatch<React.SetStateAction<string>>;
};

const Calendar = ({ selectedDates, setSelectedDates, currentMonth, setCurrentMonth }: CalendarProps) => {
    const calendarRef = useRef<FullCalendar>(null);

    // Update the background color of selected dates
    useEffect(() => {
        const calendarEls = document.querySelectorAll('.fc-daygrid-day');

        calendarEls.forEach((el) => {
            const date = el.getAttribute('data-date');
            if (date && selectedDates.includes(date)) {
                el.classList.add('bg-green-500', 'text-white');
            } else {
                el.classList.remove('bg-green-500', 'text-white');
            }
        });
    }, [selectedDates]);

    // Handle date selection
    const handleDateSelect = (info: DateSelectArg) => {
        //@ts-ignore
        const startDate = dayjs(info.startStr);
        //@ts-ignore
        const endDate = dayjs(info.endStr).subtract(1, 'day');
        const dates: string[] = [];

        for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate); date = date.add(1, 'day')) {
            dates.push(date.format('YYYY-MM-DD'));
        }

        const updatedDates = [...selectedDates];

        dates.forEach((date) => {
            if (updatedDates.includes(date)) {
                const index = updatedDates.indexOf(date);
                updatedDates.splice(index, 1);
            } else {
                updatedDates.push(date);
            }
        });

        setSelectedDates(updatedDates);
    };

    // Increment the month (when next button is clicked)
    const handleNext = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.next(); // Move to the next month
            const nextMonth = dayjs(currentMonth).add(1, 'month').format('MM');
            setCurrentMonth(nextMonth);
        }
    };

    // Decrement the month (when previous button is clicked)
    const handlePrev = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.prev(); // Move to the previous month
            const prevMonth = dayjs(currentMonth).subtract(1, 'month').format('MM');
            setCurrentMonth(prevMonth);
        }
    };

    const selectAllDays = () => {
        const startOfMonth = dayjs().startOf('month');
        const endOfMonth = dayjs().endOf('month');
        const allDates: string[] = [];

        for (let date = startOfMonth; date.isBefore(endOfMonth) || date.isSame(endOfMonth); date = date.add(1, 'day')) {
            allDates.push(date.format('YYYY-MM-DD'));
        }

        setSelectedDates(allDates);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <button type="button" onClick={handlePrev} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Previous Month
                </button>
                <button type="button" onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Next Month
                </button>
            </div>

            <FullCalendar
                ref={calendarRef} // Reference the calendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                selectMirror={true}
                //@ts-ignore
                select={handleDateSelect}
                headerToolbar={{
                    left: '', // This removes the built-in "prev" and "next" buttons
                    center: 'title', // Display only the title (current month/year)
                    right: '', // No buttons on the right
                }}
            />

            <div className="mt-4 flex space-x-4">
                <button type="button" onClick={selectAllDays} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Select All Days
                </button>
                <button type="button" onClick={() => setSelectedDates([])} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Unselect All Days
                </button>
            </div>
        </div>
    );
};

export default Calendar;
