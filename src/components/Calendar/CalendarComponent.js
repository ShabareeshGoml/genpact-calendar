"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
function CalendarComponent({ onDaySelection, eventToSend, onEventSelect }) {
  const handleSelect = ({ start }) => {
    let startDate = moment(start).format("YYYY-MM-DD");
    onDaySelection(startDate);
    console.log(startDate, "start");
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        selectable
        resizable
        onSelectEvent={(e) => onEventSelect(e)}
        events={eventToSend}
        views={["month"]}
        defaultDate={new Date()}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90dvh" }}
        onSelectSlot={handleSelect}
        length={1}
        // toolbar={false}
      />
    </div>
  );
}

export default CalendarComponent;
