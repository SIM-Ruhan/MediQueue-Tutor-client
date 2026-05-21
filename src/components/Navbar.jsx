"use client";

import Image from "next/image";
import Link from "next/link";
import { PiStudentDuotone } from "react-icons/pi";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User, BookOpen } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Tutors", href: "/tutors" },
  ];

  const privateLinks = [
    { name: "Add Tutor", href: "/add-tutor" },
    { name: "My Tutors", href: "/my-tutors" },
    { name: "My Booked Sessions", href: "/booked-sessions" },
  ];

  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const handleLogout = async () => {
    await authClient.signOut();
    setProfileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4 lg:px-8">

        {/* LEFT — Logo */}
        <div className="navbar-start">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="btn btn-ghost mr-2 lg:hidden"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">
              <PiStudentDuotone />
            </div>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MediQueue
            </span>
          </Link>
        </div>

        {/* CENTER — Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-[15px] font-medium transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — Auth */}
        <div className="navbar-end gap-3">
          {user ? (
            /* LOGGED IN — Profile Dropdown */
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-2 py-1 transition hover:shadow-md"
              >
                <Image
                  src={user.image}
                  alt="user"
                  referrerPolicy="no-referrer"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                  unoptimized
                />
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${profileMenu ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Panel */}
              {profileMenu && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">
                  {/* User Info */}
                  <div className="border-b border-base-300 p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                        unoptimized
                      />
                      <div>
                        <h3 className="font-bold">{user.name}</h3>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <div className="p-2">
                    <Link
                      href="/profile"
                      onClick={() => setProfileMenu(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-base-200"
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    <Link
                      href="/booked-sessions"
                      onClick={() => setProfileMenu(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-base-200"
                    >
                      <BookOpen size={18} />
                      My Sessions
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-error transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* NOT LOGGED IN — Login / Register */
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="btn btn-ghost rounded-xl">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary rounded-xl">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-4 py-3 font-medium transition hover:bg-primary hover:text-white"
                  onClick={() => setMobileMenu(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Mobile Auth Buttons */}
            {!user && (
              <>
                <Link
                  href="/login"
                  className="btn btn-outline mt-2 rounded-xl"
                  onClick={() => setMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary rounded-xl"
                  onClick={() => setMobileMenu(false)}
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Logout */}
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline mt-2 rounded-xl"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;