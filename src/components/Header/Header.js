"use client";
import React from "react";
import "./header.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");

  const onBookingClick = () => {
    router.push(
      `/customer/bookAppointment?customer_id=${customerId}&product_id=${productId}`,
      {
        scroll: false,
      }
    );
  };

  const onBookedAppointmentClick = () => {
    router.push(
      `/customer/bookedAppointment?customer_id=${customerId}&product_id=${productId}`,
      {
        scroll: false,
      }
    );
  };
  return (
    <div className="header-hero-container">
      <div className="flex-class-nav">
        <div className="heading">Genpact Calendar</div>
        <div className="nav-bar">
          <span className="pointer" onClick={onBookingClick}>
            Booking
          </span>
          <span className="pointer" onClick={onBookedAppointmentClick}>
            Booked appointment
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
