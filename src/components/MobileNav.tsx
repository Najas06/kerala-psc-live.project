// components/MobileNav.tsx
"use client";

import { useState } from "react";
import { Menu, User } from "lucide-react"; // Import Menu and X icons from Lucide
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Assuming you have shadcn/ui Sheet component
import { Button, buttonVariants } from "@/components/ui/button"; // Assuming you have shadcn/ui Button
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

// Define the LINKS array here, or pass it as a prop if it's dynamic
// For simplicity, defining it here for now.
const LINKS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Syllabus",
    href: "/",
  },
  {
    name: "Study Material",
    href: "/",
  },
  {
    name: "Articles",
    href: "/articles",
  },
];

interface MobileNavProps {
  user: KindeUser; // Kinde user object (pass from server component)
  isAdmin: boolean; // isAdmin status (pass from server component)
}

export default function MobileNav({ user, isAdmin }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden" // Only show on medium screens and smaller
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-4/5 sm:w-[300px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 text-lg mt-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className="py-2 text-gray-700 hover:text-green-600 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          {user ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/api/auth/logout"
                className={buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start",
                })}
                onClick={() => setIsOpen(false)}
              >
                Sign out
              </Link>
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    className: "w-full justify-start",
                  })}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard ✨
                </Link>
              )}
              <div className="flex items-center gap-2 mt-2">
                {user?.picture ? (
                  <img
                    src={user?.picture}
                    alt="user photo"
                    className="rounded-full object-cover h-10 w-10"
                  />
                ) : (
                  <User className="text-green-600 h-10 w-10" />
                )}
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/api/auth/register"
                className={buttonVariants({
                  variant: "secondary",
                  className: "w-full",
                })}
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link>
              <Link
                href="/api/auth/login"
                className={buttonVariants({
                  className: "w-full",
                })}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}