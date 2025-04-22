"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useUser } from "../context/UserContext";

const UserMenu = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useUser();

  if (isLoading) return <p>Loading user...</p>; // TODO Loading Spinner etc....!

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer p-3 hover:bg-gray-100 border-t-2"
      >
        <Image
          src={user?.picture} //"/avatar.png"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
        {!isCollapsed && (
          <div>
            <span className="text-sm block">{user?.name}</span>
            <span className="text-xs">{user?.email}</span>
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute bottom-16 left-0 w-full bg-lamaPurpleLight shadow-lg rounded-md z-10">
          <ul className="text-sm text-gray-700 p-2">
            <li
              className={`flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <FiUser className="w-8 h-auto rounded-full border-2 p-1" />
              {!isCollapsed && <span>View Profile</span>}
            </li>
            <li
              className={`flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-red-500 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <FiLogOut className="w-8 h-auto" />
              {!isCollapsed && <span>Logout</span>}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
