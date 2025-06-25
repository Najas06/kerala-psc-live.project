import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { User } from "lucide-react";
import MobileNav from "./MobileNav";
import { auth } from "../../auth";
import SignIn from "./sign-in";
import SignOut from "./sign-out";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;


  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        {/* logo */}
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40">
            <Image width={100} height={40} src="/logo.png" alt="logo" className="h-12 w-22" />
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
            {session?.user ? (
              <>
                <SignOut/>
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

                {session?.user?.image ? (
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image}
                    alt="user photo"
                    className="rounded-full object-cover "
                  />
                ) : (
                  <User className="text-green-600 h-10 w-10" />
                )}
              </>
            ) : (
              <>
               
                <SignIn/>
               
              </>
            )}
            <div className="md:hidden">
              <MobileNav user={session?.user} isAdmin={isAdmin}/>
            </div>
          </div>
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
    href: "/syllabus",
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
