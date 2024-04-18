"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Genpact-Calendar",
//   description: "Time Slot Booking",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  let isLogin = pathname?.includes("login") || pathname === "/";
  let isAdmin = pathname?.includes("admin");
  console.log(pathname, "pathname");
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          {!isLogin && !isAdmin ? <Header /> : <></>}
          {children}
        </Suspense>
      </body>
    </html>
  );
}
