"use client";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import React, { useState } from "react";
import styles from "../../../page.module.css";
import EventSideBar from "@/components/EventSideBar/EventSideBar";
import { useParams } from "next/navigation";

function agentView() {
  const { productId } = useParams();
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
        <EventSideBar
          selectedDate={selectedDate}
          isClient={false}
          productId={productId}
        />
      </div>
    </div>
  );
}

export default agentView;
