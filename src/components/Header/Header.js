"use client";
import React, { useRef, useState } from "react";
import "./header.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const customerId = searchParams.get("customer_id");
  const productId = searchParams.get("product_id");
  const agentId = searchParams.get("agent_id");
  const caseID = searchParams.get("case_id");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    router.push("/");
  };

  const onBookingClick = () => {
    router.push(
      `/customer/bookAppointment?customer_id=${customerId}&product_id=${productId}&case_id=${caseID}`,
      {
        scroll: false,
      }
    );
  };

  const onBookedAppointmentClick = () => {
    router.push(
      `/customer/bookedAppointment?customer_id=${customerId}&product_id=${productId}&case_id=${caseID}`,
      {
        scroll: false,
      }
    );
  };
  const onBookedAgentAppointmentClick = () => {
    router.push(`/agent/appointments?agent_id=${agentId}`, {
      scroll: false,
    });
  };
  const onCanceledAgentAppointmentClick = () => {
    router.push(`/agent/canceledAppointments?agent_id=${agentId}`, {
      scroll: false,
    });
  };
  //agent/canceledAppointments

  const customerNav = [
    {
      id: 1,
      name: "Schedule New Appointment",
      function: onBookingClick,
    },
    {
      id: 2,
      name: "Booked Appointment",
      function: onBookedAppointmentClick,
    },
  ];

  const agentNav = [
    {
      id: 1,
      name: "Booked Appointment",
      function: onBookedAgentAppointmentClick,
    },
    // {
    //   id: 2,
    //   name: "Pending Appointment",
    //   // function: onCanceledAgentAppointmentClick,
    // },
    {
      id: 3,
      name: "Cancelled Appointment",
      function: onCanceledAgentAppointmentClick,
    },
    {
      id: 4,
      name: "Log Out",
      function: logOut,
    },
  ];
  let selectedNav = pathname?.includes("customer") ? customerNav : agentNav;
  let portlaName = pathname?.includes("customer")
    ? "Customer Portal"
    : "Agent Portal";
  let isCustomer = pathname?.includes("customer");
  // console.log(pathname, "pathname");

  return (
    <div className="header-hero-container">
      <div className="flex-class-nav">
        <div className="heading">Appointment Scheduler - {portlaName}</div>
        <div className="nav-bar">
          {/* {selectedNav?.map((nav) => (
              <span
                className="pointer"
                onClick={nav?.function}
                id={nav?.id}
                key={nav?.id}
              >
                {nav?.name}
              </span>
            ))} */}
          <div className="mobile-view-nav-container">
            {isCustomer ? (
              <MenuIcon
                sx={{ cursor: "pointer" }}
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              />
            ) : (
              <div
                className="profile-container"
                onClick={handleClick}
                // size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <PermIdentityIcon sx={{ cursor: "pointer", fontSize: 34 }} />
                <p className="head-name-container">Agent</p>
                <KeyboardArrowDownIcon />
              </div>
            )}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {selectedNav?.map((nav) => (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    nav?.function();
                  }}
                  id={nav?.id}
                >
                  {nav?.name}
                </MenuItem>
              ))}
            </Menu>
          </div>

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
