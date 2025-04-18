import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../../styles/styles.scss";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import UserMenu from "@/components/UserMenu";
import ProtectedRoute from "@/auth0Config/ProtectedRoute";
import OrganizationSelector from "@/components/OrganizationSelector";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("MainLayout loaded");

  return <DashboardLayout>{children}</DashboardLayout>;

  // return (
  //   <ProtectedRoute>
  //     {" "}
  //     {/* ✅ Auth guard here */}
  //     <div className="h-screen flex">
  //       {/* arbitrary value */}
  //       {/* LEFT  */}
  //       {/* w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] md:p-4 relative */}
  //       <div className=" xl:w-72 md:p-1 relative">
  //         {/* <Link
  //           href="/"
  //           className="flex items-center justify-center lg:justify-start gap-2"
  //         >
  //           <Image src="/logo.png" alt="app-logo" width={32} height={32} />
  //           <span className="hidden lg:block">Reward Point System</span>
  //         </Link> */}
  //         {/*TODO Organizations Dropdown Will be added Here  */}
  //         {/* <OrganizationSelector /> */}
  //         {/* <Menu /> */}
  //         {/* <div>
  //           <button
  //             onClick={() => setIsSidebarCollapsed((prev) => !prev)}
  //             className="absolute top-4 right-2 z-50 bg-gray-100 p-2 rounded-md hover:bg-gray-200 lg:hidden"
  //           >
  //             {isSidebarCollapsed ? "➡️" : "⬅️"}
  //           </button>
  //         </div> */}
  //         {/* <div className="absolute bottom-0 left-0 w-full">
  //           <UserMenu />
  //         </div> */}
  //       </div>

  //       <div
  //         className={`relative bg-white border-r transition-all duration-300 ease-in-out 
  //   ${isSidebarCollapsed ? "w-20" : "w-72"} 
  //   hidden md:block`}
  //       >
  //         {/* Toggle button (visible only on larger screens) */}
  //         <button
  //           onClick={() => setIsSidebarCollapsed((prev) => !prev)}
  //           className="absolute top-4 right-2 z-50 bg-gray-100 p-1 rounded hover:bg-gray-200"
  //         >
  //           {isSidebarCollapsed ? "➡️" : "⬅️"}
  //         </button>
  //         <Link
  //           href="/"
  //           className="flex items-center justify-center lg:justify-start gap-2 p-4"
  //         >
  //           <Image src="/logo.png" alt="app-logo" width={32} height={32} />
  //           {!isSidebarCollapsed && (
  //             <span className="hidden lg:block">Reward Point System</span>
  //           )}
  //         </Link>
  //         <Menu isCollapsed={isSidebarCollapsed} /> {/* Pass this to child */}
  //         <div className="absolute bottom-0 left-0 w-full">
  //           <UserMenu />
  //         </div>
  //       </div>

  //       {/* RIGHT */}
  //       <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-auto bg-white border-l-2 px-8 pt-8">
  //         {/* <Navbar/> */}
  //         {children}
  //       </div>
  //     </div>
  //   </ProtectedRoute>
  // );
}
