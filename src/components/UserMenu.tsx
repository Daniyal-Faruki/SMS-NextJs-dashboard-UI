"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-2 cursor-pointer p-4 hover:bg-gray-100 rounded-md border-t-2"
      >
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full"
        />
        <div>
          <span className="text-sm hidden lg:block">John Doe</span>
          <span className="text-xs hidden lg:block">
            John_Doe@zintechnologies.com
          </span>
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute bottom-12 left-0 w-48 bg-white shadow-lg rounded-md z-10">
          <ul className="text-sm text-gray-700 p-2">
            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
              <FiUser />
              Profile
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer text-red-500">
              <FiLogOut />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
