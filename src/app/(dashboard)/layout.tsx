import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../../styles/styles.scss";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/sidebar/Menu";
import Navbar from "@/components/unUsed/Navbar";
import UserMenu from "@/components/sidebar/UserMenu";
import ProtectedRoute from "@/auth0Config/ProtectedRoute";
import OrganizationSelector from "@/components/sidebar/OrganizationSelector";
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

  return <DashboardLayout>{children}</DashboardLayout>;

}
