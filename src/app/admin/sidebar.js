"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";
function Sidebar() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("Mark Shift");
  const handleItemClick = (item) => {
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem === item) {
        return prevSelectedItem; // Keep the item selected if it's already selected
      } else {
        return item; // Select the clicked item if it's not selected
      }
    });
  };
  const onReminderFrequencyMatrixClick = (event) => {
    event.preventDefault();
    console.log("onReminderFrequencyMatrixClick is called");
    router.push(`/admin/reminderfrequencymatrix`, {
      scroll: false,
    });
  };

  const onPendingAppointmentsClick = (event) => {
    event.preventDefault();
    console.log("onPendingAppointmentsClick is called");
    router.push(`/admin/pendingappointments`, {
      scroll: false,
    });
  };

  const onEmailTemplatesClick = (event) => {
    event.preventDefault();
    console.log("onEmailTemplatesClick is called");
    router.push(`/admin/emailtemplates`, {
      scroll: false,
    });
  };

  const onMarkShiftClick = (event) => {
    event.preventDefault();
    console.log("onMarkShiftClick is called");
    router.push(`/admin/markshift`, {
      scroll: false,
    });
  };

  const onAddAgent = (event) => {
    event.preventDefault();
    console.log("onAddAgentAndProductTypeInventoryClick is called");
    router.push(`/admin/addAgent`, {
      scroll: false,
    });
  };

  const onConfigQuestionSetsClick = (event) => {
    event.preventDefault();
    console.log("onConfigQuestionSetsClick is called");
    router.push(`/admin/configquestionsets`, {
      scroll: false,
    });
  };

  const logout = () => {
    router.push(`/`, {
      scroll: false,
    });
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        {/* Sidebar items */}
        <div
          className={
            selectedItem === "Reminder Frequency Matrix" ? "active-item" : ""
          }
          onClick={(e) => {
            handleItemClick("Reminder Frequency Matrix");
            onReminderFrequencyMatrixClick(e);
          }}
        >
          Reminder Frequency Matrix
        </div>
        <div
          className={
            selectedItem === "Pending Appointments" ? "active-item" : ""
          }
          onClick={(e) => {
            handleItemClick("Pending Appointments");
            onPendingAppointmentsClick(e);
          }}
        >
          Pending Appointments
        </div>
        <div
          className={selectedItem === "Email Templates" ? "active-item" : ""}
          onClick={(e) => {
            handleItemClick("Email Templates");
            onEmailTemplatesClick(e);
          }}
        >
          Email Templates
        </div>
        <div
          className={selectedItem === "Mark Shift" ? "active-item" : ""}
          onClick={(e) => {
            onMarkShiftClick(e);
            handleItemClick("Mark Shift");
          }}
        >
          configure Agent Schedule
        </div>
        <div
          className={
            selectedItem === "Add Agent and Product Type Inventory"
              ? "active-item"
              : ""
          }
          onClick={(e) => {
            handleItemClick("Add Agent and Product Type Inventory");
            onAddAgent(e);
          }}
        >
          Add Agent and Product Type Inventory
        </div>
        <div
          className={
            selectedItem === "Config Question Sets" ? "active-item" : ""
          }
          onClick={(e) => {
            handleItemClick("Config Question Sets");
            onConfigQuestionSetsClick(e);
          }}
        >
          Config Question Sets
        </div>
        <div className={""} onClick={logout}>
          Log Out
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
