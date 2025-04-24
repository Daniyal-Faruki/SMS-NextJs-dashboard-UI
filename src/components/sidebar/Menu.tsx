"use client";
import useIsMobile from "@/hooks/useIsMobile";
// import { role } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import home from "../../assets/icons/HomeNav.svg";
import employees from "../../assets/icons/EmployeesNav.svg";
import employeeRewards from "../../assets/icons/ScorecardsNav.svg"//"../assets/icons/ScorecardsNav.svg";

// Here i can handle routes, by getting roles from auth0.
let role = "org-admin" // "user";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: home,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: employees,
        label: "Employees",
        href: "/employees",
        visible: ["org-admin", "rps-admin", "sys-admin"],
      },
      {
        icon: employeeRewards,
        label: "Employee Rewards",
        href: "/employeeRewards",
        visible: ["org-admin", "rps-admin", "sys-admin", "user"],
      }
    ],
  },
];

const Menu = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname(); // 👈 Get current path
  const isMobile = useIsMobile();
  // console.log("IS_Collapsed: ", isCollapsed);
  return (
    <div className={`mt-4 text-sm ${isCollapsed ? "md:w-fit" : ""}`}>
      {menuItems.map((i) => (
        <div
          className={`gap-2 ${isCollapsed ? "w-fit" : "justify-start"}`} //" gap-2 md:w-fit"
          key={i.title}
        >
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              const isActive = pathname === item.href; // 👈 check if current route

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`group flex items-center gap-4 text-gray-500 py-2 rounded-md md:p-3 mx-2 my-1 px-2 hover:bg-RpsCyan hover:text-white ${
                    isActive ? "bg-RpsCyan text-white" : ""
                  } ${isCollapsed ? "w-fit !p-4" : ""}`}
                >
                  <item.icon
                    className={`w-5 transition-colors ${
                      isActive ? "text-white" : "text-gray-500"
                    } group-hover:text-white`}
                    fill="currentColor"
                  />
                  {!isCollapsed && <span>{item.label}</span>}
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
