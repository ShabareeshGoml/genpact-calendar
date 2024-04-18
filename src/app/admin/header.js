import React from "react";
import "./dashboard.css";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

function CustomHeader({ isSidebarOpen, toggleSidebar }) {
  return (
    <div className="header-hero-container">
      <div className="flex-class-nav">
        <div className="reorder-icon" onClick={toggleSidebar}>
          <IoReorderThreeOutline />
        </div>
        <div className="heading">Appointment Calendar - Admin Portal</div>
      </div>
    </div>
  );
}

export default CustomHeader;
