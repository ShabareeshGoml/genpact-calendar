"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Genpact-Calendar",
//   description: "Time Slot Booking",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  let isLogin = pathname?.includes("login") || pathname === "/";
  console.log(pathname, "pathname");
  return (
    <html lang="en">
      <body className={inter.className}>
        {!isLogin ? <Header /> : <></>}
        {children}
      </body>
    </html>
  );
}
