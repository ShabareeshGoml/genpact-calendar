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
  };
  // function getFutureDates(date) {
  //   // Check if the input is a valid date object
  //   if (!(date instanceof Date)) {
  //     throw new Error(
  //       "Invalid date input. Please provide a valid Date object."
  //     );
  //   }

  //   const futureDates = [];
  //   for (let i = 0; i < 45; i++) {
  //     // Create a copy of the date object to avoid modifying the original
  //     const newDate = new Date(date.getTime());
  //     // Add the desired number of days (i) to the current date
  //     newDate.setDate(newDate.getDate() + i);
  //     // Push the formatted date string into the futureDates array
  //     futureDates.push(newDate.toLocaleDateString("en-US")); // Adjust format as needed
  //   }

  //   return futureDates;
  // }

  // // Example usage
  // const today = new Date("4/25/2024");
  // const twelveFutureDates = getFutureDates(today);

  // console.log(twelveFutureDates, "twelveFutureDates");

  return (
    <div>
      <Calendar
        localizer={localizer}
        selectable={(e) => {
          console.log(e, "oooo");
        }}
        resizable
        onSelectEvent={(e) => onEventSelect(e)}
        events={eventToSend}
        views={["month"]}
        defaultDate={new Date()}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "81dvh" }}
        onSelectSlot={handleSelect}
        length={1}

        // height={81dvh}
        // toolbar={false}
      />
    </div>
  );
}

export default CalendarComponent;
