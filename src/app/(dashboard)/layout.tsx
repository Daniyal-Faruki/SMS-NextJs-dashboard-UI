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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("DashboardLayout loaded")
  return (
    <ProtectedRoute> {/* ✅ Auth guard here */}
      <div className="h-screen flex">
        {/* arbitrary value */}
        {/* LEFT  */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] md:p-4 relative">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start gap-2"
          >
            <Image src="/logo.png" alt="app-logo" width={32} height={32} />
            <span className="hidden lg:block">Reward Point System</span>
          </Link>
          {/*TODO Organizations Dropdown Will be added Here  */}
          <Menu />
          <div className="absolute bottom-0 left-0 w-full">
            <UserMenu />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll bg-white border-l-2 p-8">
          {/* <Navbar/> */}
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
