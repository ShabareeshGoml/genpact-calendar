"use client";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import React from "react";

function agentView() {
  const event = [
    {
      title: "Some Event",
      start: new Date(2024, 3, 4),
      end: new Date(2024, 3, 4),
    },
    {
      title: "Conference",
      start: new Date(),
      end: new Date(),
      desc: "Big conference for important people",
    },
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
      desc: "Pre-meeting meeting, to prepare for the meeting",
    },
  ];

  const onSelectEvent = (e) => {
    console.log(e);
  };
  return (
    <div>
      <CalendarComponent eventToSend={event} onEventSelect={onSelectEvent} />
    </div>
  );
}

export default agentView;
