// DashboardLayout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Menu from "@/components/sidebar/Menu";
import UserMenu from "@/components/sidebar/UserMenu";
import ProtectedRoute from "@/auth0Config/ProtectedRoute";
import OrganizationSelector from "./sidebar/OrganizationSelector";
import useIsMobile from "@/hooks/useIsMobile";
import ChevronLeft from "../assets/icons/chevron-left.svg"
import ChevronRight from "../assets/icons/chevron-right.svg"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <ProtectedRoute>
      <div className="h-screen flex">
        {/* LEFT */}
        <div
          className={`relative bg-white border-r transition-all duration-300 ease-in-out flex flex-col pt-8
  ${isSidebarCollapsed ? "w-20" : isMobile ? "w-full" : "w-72 md:min-w-64"}`}
        >
          <button // fix this toggle position
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            className="absolute bottom-40 -right-4 z-10 rounded-full hover:opacity-50" 
          >
            {isSidebarCollapsed ? 
            <ChevronRight className="w-7" /> : <ChevronLeft className="w-7" />}
          </button>
          <OrganizationSelector />
          <Menu isCollapsed={isSidebarCollapsed} />
          <div className="absolute bottom-0 left-0 w-full">
            <UserMenu isCollapsed={isSidebarCollapsed} />
          </div>
        </div>

        {/* Right */}
        {(isSidebarCollapsed && isMobile) || !isMobile ? (
          <div className="w-full overflow-auto bg-white border-l-2 px-8 pt-8 z-0">
            {children}
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
}
