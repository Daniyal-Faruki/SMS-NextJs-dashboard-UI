// DashboardLayout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Menu from "@/components/Menu";
import UserMenu from "@/components/UserMenu";
import ProtectedRoute from "@/auth0Config/ProtectedRoute";
import OrganizationSelector from "./OrganizationSelector";
import useIsMobile from "@/hooks/useIsMobile";

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
        <div
          className={`relative bg-white border-r transition-all duration-300 ease-in-out flex flex-col
          ${isSidebarCollapsed ? "w-20" : "w-72"} ${ (!isSidebarCollapsed && isMobile) ? "!w-full" : "" }`}
        >
          <button
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            className="bg-gray-200 m-2 p-3 rounded hover:bg-gray-300"
          >
            {isSidebarCollapsed ? "➡️" : "⬅️"}
          </button>
          <OrganizationSelector />
          <Menu isCollapsed={isSidebarCollapsed} />
          <div className="absolute bottom-0 left-0 w-full">
            <UserMenu />
          </div>
        </div>

        {/* Right */}
        {(isSidebarCollapsed && isMobile) || !isMobile ? (
          <div className="w-full overflow-auto bg-white border-l-2 px-8 pt-8">
            {children}
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
}
