"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

import CalendarComponent from "@/components/Calendar/CalendarComponent";
import EventSideBar from "@/components/EventSideBar/EventSideBar";
import Login from "./login/page";

export default function Home() {
  const [selectedDate, setselectedDate] = useState(null);
  const onDaySelection = (date) => {
    setselectedDate(date);
  };

  return <Login />;
}
