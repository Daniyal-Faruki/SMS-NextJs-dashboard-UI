import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../providers/AuthProvider";
import { OrganizationProvider } from "@/context/OrganizationContext";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reward Point System - RPS",
  description: "Next.js - RPS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <OrganizationProvider>{children}</OrganizationProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
