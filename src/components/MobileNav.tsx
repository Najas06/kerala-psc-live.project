// components/MobileNav.tsx
"use client";

import { useState } from "react";
import { Menu, User as UserIcon } from "lucide-react"; // Alias User from lucide-react to UserIcon
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Assuming you have shadcn/ui Sheet component
import { Button, buttonVariants } from "@/components/ui/button"; // Assuming you have shadcn/ui Button
import { User } from "next-auth"; // This User is the type from NextAuth.js
import { signInAction, signOutAction } from "@/lib/actions";
import Image from "next/image";

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
  user?: User | undefined; // Now this 'User' correctly refers to the NextAuth.js User type
  isAdmin?: boolean | null; // isAdmin status (pass from server component)
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
             
               <form
                action={signOutAction}
              >
                <Button
                className={buttonVariants({
                  variant: "ghost",
                  className: "w-full text-center",
                })}
                onClick={() => setIsOpen(false)}
              >
                Sign out
              </Button>
              </form>
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
                {user?.image ? (
                  <Image
                    width={40}
                    height={40}
                    src={user.image} // user.image can be used directly after user?.image check
                    alt="user photo"
                    className="rounded-full object-cover h-10 w-10"
                  />
                ) : (
                  <UserIcon className="text-green-600 h-10 w-10" />
                )}
                {/* Add a check for user.email as it's optional in NextAuth.js User type */}
                {user.email && (
                  <span className="font-medium text-gray-800">
                    {user.email}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
               <form
                action={signInAction}
              >
                <Button
                className={buttonVariants({
                  variant: "default",
                  className: "w-full text-center",
                })}
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Button>
              </form>
              {/* <Link
                href="/api/auth/login"
                className={buttonVariants({
                  className: "w-full",
                })}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link> */}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
