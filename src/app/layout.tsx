import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../providers/AuthProvider";
import { OrganizationProvider } from "@/context/OrganizationContext";
import { UserProvider } from "@/context/UserContext";
import { Sora } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose the weights you need
  variable: "--font-sora", // optional for CSS usage
});

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={sora.className}>
        <AuthProvider>
          <UserProvider>
            <OrganizationProvider>{children}</OrganizationProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
