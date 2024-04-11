"use client";
import React, { useEffect, useState } from "react";
import styles from "../../page.module.css";
import CalendarComponent from "@/components/Calendar/CalendarComponent";
import EventSideBar from "@/components/EventSideBar/EventSideBar";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { fetchCustomerDetails } from "@/services/apiServices/bookingAppointment";

function BookAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  useEffect(() => {
    fetchCustomerDetails(customerId).then((e) => {
      console.log(e, "cusDetails");
      setuserDetails(e);
    });
  }, []);

  const [selectedDate, setselectedDate] = useState(null);
  const [userDetails, setuserDetails] = useState({});

  const onDaySelection = (date) => {
    setselectedDate(date);
  };
  console.log(userDetails, "test");
  return (
    <div className={styles.homePageContainer}>
      <div style={{ width: "74%", maxHeight: "82dvh !important" }}>
        <CalendarComponent onDaySelection={(date) => onDaySelection(date)} />
      </div>
      <div style={{ width: "22%", maxHeight: "82dvh !important" }}>
        <EventSideBar
          selectedDate={selectedDate}
          isClient={true}
          productId={productId}
          userInfo={userDetails}
        />
      </div>
    </div>
  );
}

export default BookAppointment;
