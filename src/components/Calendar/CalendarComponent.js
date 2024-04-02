"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
function CalendarComponent() {
  const handleSelect = ({ start, end }) => {
    console.log(start, "start");
    console.log(end, "end");
    // const title = window.prompt("New Event name");
    // if (title)
    //   setEventsData([
    //     ...eventsData,
    //     {
    //       start,
    //       end,
    //       title,
    //     },
    //   ]);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        selectable
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90dvh" }}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}

export default CalendarComponent;
