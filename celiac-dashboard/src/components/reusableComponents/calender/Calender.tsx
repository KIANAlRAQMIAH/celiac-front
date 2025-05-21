import React, { Dispatch, SetStateAction } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaArrowRight } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";



import '../index.css';
import CustomModal from "../CustomModal";





const Calendar = ({events, onView, setModalOpen}:{events:any , onView: (data: any) => void, setModalOpen: Dispatch<SetStateAction<boolean>>}) => {

    const mappedEvents = events?.map((event:any) => ({
        id: event.id,
        title: event.name,
        start: `${event.session_date}T${event.starts_at}`,
        end: `${event.session_date}T${event.ends_at}`,
        extendedProps: {
            sessionType: event.session_type_text,
            desc: event.desc,
            start:event.starts_at,
            end: event.ends_at
        },
    }));
    const renderEventContent = (eventInfo: any) => {
        return (
            <div  className=" mx-auto text-start text-white flex flex-col bg-[#ee8f94] p-2 w-[150px] rounded-[12px] ">
                <div className="bg-[blue] rounded-[8px] w-fit p-1">{eventInfo.event.extendedProps.sessionType}</div>
                <div className="font-semibold">{eventInfo.event.title.slice(0,25)}</div>
                {/* <div className="event-time">{eventInfo.timeText}</div> */}
                <span className="flex gap-2 items-center" > <LuAlarmClock /> {eventInfo.event.extendedProps.start.slice(0,5)} - {eventInfo.event.extendedProps.end.slice(0,5)}</span>

                <div className="flex justify-end">
                <button  onClick={() => {
                    setModalOpen(true)
                    onView(eventInfo?.event?.id)
                } } className="border-[2px] rounded-full w-fit  border-white"><FaArrowRight /></button>
                </div>
            </div>
        );
    };

    return (
        <div className="calendar-wrapper">
{/* {open && (
        <CustomModal openCloseModal={setOpen} title={`${t('tableForms.add')} ${t('tableForms.serviceTitle')}`}>
           <div>
            <h2 className="text-lg font-bold mb-4">{event.name}</h2>
            <div className="mb-3">
                <p className="text-sm text-gray-500">event Type:</p>
                <p className="text-md font-medium">{event.event_type_text}</p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-500">Date:</p>
                <p className="text-md font-medium">{event.event_date}</p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-500">Time:</p>
                <p className="text-md font-medium">
                    {event.starts_at} - {event.ends_at}
                </p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-500">Address:</p>
                <p className="text-md font-medium">{event.address}</p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-500">Max Attendees:</p>
                <p className="text-md font-medium">{event.max_attendees}</p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-500">Description:</p>
                <p className="text-md font-medium">{event.desc}</p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-gray-500">Details:</p>
                <p className="text-md font-medium">{event.details}</p>
            </div>

            <div>
                <p className="text-sm text-gray-500">Status:</p>
                <p className={`text-md font-medium text-${event.active_class}`}>
                    {session.active_status}
                </p>
            </div>
        </div>
        </CustomModal>
      )} */}

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                editable={true}
                selectable={true}
                events={mappedEvents}
                eventContent={renderEventContent} // Custom rendering for events
                dayMaxEventRows={false} // Allow all events to display
                height="auto" // Adjust height to fit all events
            />
        </div>
    );
};

export default Calendar;
