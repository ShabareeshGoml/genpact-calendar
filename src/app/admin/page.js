"use client";
import React, { useState } from "react";
import "./dashboard.css";
import { IoReorderThreeOutline } from "react-icons/io5";

function CustomHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar is initially open for larger screens
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  return (
    <div className="header-hero-container">
      <div className="flex-class-nav">
        {/* Conditionally render the icon only for mobile screens */}
        <div className="reorder-icon" onClick={toggleSidebar}>
          <IoReorderThreeOutline />
        </div>
        <div className="heading">Genpact Calendar - Admin Portal</div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
        <p 
            className={selectedItem === "Reminder Frequency Matrix" ? "active-item" : ""}
            onClick={() => handleItemClick("Reminder Frequency Matrix")}
          >
            Reminder Frequency Matrix
          </p>
          <p 
            className={selectedItem === "Pending Appointments" ? "active-item" : ""}
            onClick={() => handleItemClick("Pending Appointments")}
          >
            Pending Appointments
          </p>
          <p 
            className={selectedItem === "Email Templates" ? "active-item" : ""}
            onClick={() => handleItemClick("Email Templates")}
          >
            Email Templates
          </p>
          <p 
            className={selectedItem === "Mark Shift" ? "active-item" : ""}
            onClick={() => handleItemClick("Mark Shift")}
          >
            Mark Shift
          </p>
          <p 
            className={selectedItem === "Add Agent and Product Type Inventory" ? "active-item" : ""}
            onClick={() => handleItemClick("Add Agent and Product Type Inventory")}
          >
            Add Agent and Product Type Inventory
          </p>
          <p 
            className={selectedItem === "Config Question Sets" ? "active-item" : ""}
            onClick={() => handleItemClick("Config Question Sets")}
          >
            Config Question Sets
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomHeader;
