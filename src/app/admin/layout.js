"use client";
import React from "react";
// import "./globals.css";
import CustomHeader from "./header.js";
import Sidebar from "./sidebar.js";
import MarkShift from "./markshift/page.js";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import "./dashboard.css";

export default function Layout({ children }) {
  const pathname = usePathname();
  // let isAdmin = pathname?.includes("admin/");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {" "}
        <CustomHeader />
        <div className="admin-hero-container">
          <Sidebar />
          <div className="admin-main-content-layout-container">{children}</div>
        </div>
      </div>
    </Suspense>
  );
}
