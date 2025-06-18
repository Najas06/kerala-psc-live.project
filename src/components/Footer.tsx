import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white h-20 py-5 border-t">
      <p className="text-sm text-muted-foreground mt-4 text-center max-w-screen-xl mx-auto">
        <strong>Disclaimer:</strong> We are not affiliated with the Kerala
        Public Service Commission (KPSC) or any government agency. This website
        is an independent platform created to share Kerala PSC job
        notifications, exam updates, and study materials to help job seekers
        stay informed. All information is sourced from official notifications
        and public domains. While we strive to ensure accuracy, we recommend
        verifying the details with the official Kerala PSC website (
        <Link
          href="https://www.keralapsc.gov.in/"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.keralapsc.gov.in/
        </Link>
        ) before applying. We are not responsible for any errors, omissions, or
        actions taken based on this information.
      </p>{" "}
      <p className="my-3 text-center text-black/70 text-sm">
        {" "}
        &copy;
        {` ${new Date().getFullYear()} Kerala PSC Live. All rights reserved`}
      </p>
      <div className="flex items-center justify-evenly text-black/70 text-sm">
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Terms & Conditions</Link>
        <Link href="/">Contact</Link>
      </div>
      <p className="my-3 text-center text-black/70 text-sm">
        Designed with ❤️ by <span className="font-semibold">Najas Nazar</span>
      </p>
    </footer>
  );
};

export default Footer;
