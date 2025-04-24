import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../../styles/styles.scss";
import DashboardLayout from "@/components/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reward Point System - RPS",
  description: "RPS in Next.js",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return <DashboardLayout>{children}</DashboardLayout>;

}
