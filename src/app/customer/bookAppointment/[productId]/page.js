"use client";
import React, { useState } from "react";
import styles from "../../../page.module.css";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import EventSideBar from "@/components/EventSideBar/EventSideBar";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

function BookAppointment() {
  const router = useRouter();
  const { productId } = useParams();
  const [selectedDate, setselectedDate] = useState(null);
  const onDaySelection = (date) => {
    setselectedDate(date);
  };
  // console.log(productId, selectedDate, "productIdOjj");
  return (
    <div className={styles.homePageContainer}>
      <div style={{ width: "74%" }}>
        <CalendarComponent onDaySelection={(date) => onDaySelection(date)} />
      </div>
      <div style={{ width: "22%", maxHeight: "99dvh" }}>
        <EventSideBar
          selectedDate={selectedDate}
          isClient={true}
          productId={productId}
        />
      </div>
    </div>
  );
}

export default BookAppointment;
