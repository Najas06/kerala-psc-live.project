import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "lucide-react";
import MobileNav from "./MobileNav";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

//   console.log(user);
  
// console.log("User email:", user?.email);
// console.log("Admin email from env:", process.env.ADMIN_EMAIL);
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        {/* logo */}
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40">
            <img src="/logo.png" alt="logo" className="h-12 w-full" />
          </Link>

          {/* nav links */}
          <ul className="hidden md:flex  items-center gap-x-6 ">
            {LINKS.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-green-600 transition-all"
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>

          {/* authication buttons */}
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: "max-sm:hidden",
                  })}
                >
                  Sign out
                </Link>
                {isAdmin && (
                  <>
                    <Link
                      href="/dashboard"
                      className={buttonVariants({
                        size: "sm",
                      })}
                    >
                      Dashboard ✨
                    </Link>
                  </>
                )}

                {user?.picture ? (
                  <img
                    src={user?.picture}
                    alt="user photo"
                    className="rounded-full object-cover h-10 w-10"
                  />
                ) : (
                  <User className="text-green-600 h-10 w-10" />
                )}
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "secondary",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Login
                </Link>
              </>
            )}
            <div className="md:hidden">
              {/* Show only on medium screens and smaller */}
              <MobileNav user={user} isAdmin={isAdmin} />{" "}
              {/* Pass user and isAdmin */}
            </div>
          </div>
          {/* Mobile Navigation (Hamburger Menu) - Only shown on small screens */}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

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
