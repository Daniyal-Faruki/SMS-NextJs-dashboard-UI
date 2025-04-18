"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/student.png",
        label: "Employees",
        href: "/employees",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Employee Rewards",
        href: "/employeeRewards",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
    ],
  },
  // {
  //   title: "OTHER",
  //   items: [
  //     {
  //       icon: "/profile.png",
  //       label: "Profile",
  //       href: "/profile",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       icon: "/setting.png",
  //       label: "Settings",
  //       href: "/settings",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //     {
  //       icon: "/logout.png",
  //       label: "Logout",
  //       href: "/logout",
  //       visible: ["admin", "teacher", "student", "parent"],
  //     },
  //   ],
  // },
];

const Menu = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname(); // 👈 Get current path
  const isMobile = useIsMobile();

  return (
    <div className="mt-4 text-sm md:w-fit">
      {menuItems.map((i) => (
        <div className=" gap-2 md:w-fit" key={i.title}>
          
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              const isActive = pathname === item.href; // 👈 check if current route

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 rounded-md md:p-3 md:w-fit mx-2 lg:px-2 hover:bg-cyan-500 hover:text-white ${
                    isActive ? "bg-cyan-500 text-white" : ""
                  } ${ isCollapsed ? "w-fit !p-4" : ""}`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={18}
                    height={18}
                  />
                  {!isCollapsed  && (
                    // className="hidden lg:block"
                    <span >{item.label}</span>
                  )}
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
