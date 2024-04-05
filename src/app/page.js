"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

import CalendarComponent from "@/components/Calendar/CalendarComponent";
import EventSideBar from "@/components/EventSideBar/EventSideBar";

export default function Home() {
  const [selectedDate, setselectedDate] = useState(null);
  const onDaySelection = (date) => {
    setselectedDate(date);
  };

  return (
    <div className={styles.homePageContainer}>
      <div style={{ width: "74%" }}>
        <CalendarComponent onDaySelection={(date) => onDaySelection(date)} />
      </div>
      <div style={{ width: "22%", maxHeight: "99dvh" }}>
        <EventSideBar selectedDate={selectedDate} isClient={true} />
      </div>
    </div>
  );
}
