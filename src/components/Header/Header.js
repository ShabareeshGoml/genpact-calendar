"use client";
import React from "react";
import "./header.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  const agentId = searchParams.get("agent_id");

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
  const customerNav = [
    {
      id: 1,
      name: "Schedule new appointment",
      function: onBookingClick,
    },
    {
      id: 2,
      name: "Booked appointment",
      function: onBookedAppointmentClick,
    },
  ];

  const agentNav = [
    {
      id: 1,
      name: "Booked appointment",
      // function: onBookingClick,
    },
    {
      id: 2,
      name: "Pending appointment",
      // function: onBookedAppointmentClick,
    },
    {
      id: 3,
      name: "Cancelled appointment",
      // function: onBookedAppointmentClick,
    },
  ];
  let selectedNav = pathname?.includes("customer") ? customerNav : agentNav;
  let portlaName = pathname?.includes("customer")
    ? "Customer Portal"
    : "Agent Portal";
  // console.log(pathname, "pathname");

  return (
    <div className="header-hero-container">
      <div className="flex-class-nav">
        <div className="heading">Genpact Calendar - {portlaName}</div>
        <div className="nav-bar">
          {selectedNav?.map((nav) => (
            <span
              className="pointer"
              onClick={nav?.function}
              id={nav?.id}
              key={nav?.id}
            >
              {nav?.name}
            </span>
          ))}
          {/* <span className="pointer" onClick={onBookingClick}>
            Booking
          </span>
          <span className="pointer" onClick={onBookedAppointmentClick}>
            Booked appointment
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
