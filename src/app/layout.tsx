import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const workSans = localFont({
  src: "./fonts/WorkSans-VariableFont_wght.ttf",
  variable: "--font-work-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kerala PSC Live - Jobs Alerts",
  description:
    "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable}`}>
      <body className={` antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
