import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from '@next/third-parties/google'

const workSans = localFont({
  src: "./fonts/WorkSans-VariableFont_wght.ttf",
  variable: "--font-work-sans",
  weight: "100 900",
});

<meta
  name="keywords"
  content="Kerala PSC jobs, PSC notification 2025, SSLC jobs Kerala, 12th pass jobs Kerala, degree government jobs"
/>;

export const metadata: Metadata = {
  title: "Kerala PSC Live - Jobs Notifications & Alerts 2025",
  description:
    "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
  keywords: [
    "Kerala PSC jobs",
    "Kerala PSC notification 2025",
    "10th pass jobs Kerala",
    "12th pass jobs Kerala",
    "Degree jobs Kerala",
    "Post Graduation jobs Kerala",
    "PSC live updates",
    "Kerala Government jobs",
    "PSC alerts",
    "Kerala PSC articles",
    "Degree jobs Kerala",
    "PSC latest news",
    "Kerala PSC Live",
  ],
  openGraph: {
    title: "Kerala PSC Live - Jobs Notifications & Alerts 2025",
    description:
      "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
    url: "www.keralapsclive.com",
    siteName: "Kerala PSC Live",
    images: [
      {
        url: "https://wjgczpg1md.ufs.sh/f/IpV2ESqqMQ4e1MMQUojK2iKBQhkSjOu7wH6rqTpJAaFgeYt0",
        width: 1200,
        height: 630,
        alt: "Kerala PSC Live",
      },
    ],
    type: "website",
  },
  twitter:{
    card:"summary_large_image",
    title:"Kerala PSC Live - Jobs Notifications & Alerts 2025",
    description:
      "Get the latest Kerala PSC Jobs alerts, live notifications, and exam updates in one place. stay a head with PSC Job posts and applications links.",
    images: [
      {
        url: "https://wjgczpg1md.ufs.sh/f/IpV2ESqqMQ4e1MMQUojK2iKBQhkSjOu7wH6rqTpJAaFgeYt0",
        width: 1200,
        height: 630,
        alt: "Kerala PSC Live",
      },
    ],
  },
  alternates:{
    canonical:"https://www.keralapsclive.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "NwpIyGWgLhpWhyhbryD1doDOr-QuRLt_VbhCJN9vOmc",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable}`}>
      <body className={` antialiased bg-slate-50`}>
        <Navbar />
        {children}
        <Footer />
        <Toaster richColors position="top-center" />
        <GoogleTagManager gtmId="GTM-W6Z97SGH"/> 
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
