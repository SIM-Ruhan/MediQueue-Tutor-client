"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { PiStudentDuotone } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="mt-40 border-t border-base-300 bg-neutral text-neutral-content">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND INFO */}
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-3xl font-extrabold"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
                <PiStudentDuotone />
              </div>

              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MediQueue
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-content/70">
              MediQueue helps students connect with experienced tutors
              for personalized learning and skill development anytime,
              anywhere.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary hover:text-white"
              >
                <FaFacebookF size={16} />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary hover:text-white"
              >
                <FaTwitter size={16} />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary hover:text-white"
              >
                <FaInstagram size={16} />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary hover:text-white"
              >
                <FaLinkedinIn size={16} />
              </Link>
            </div>
          </div>

          {/* LEARNING SERVICES */}
          <div>
            <h3 className="mb-5 text-xl font-bold">
              Learning Services
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/tutors"
                  className="transition hover:text-primary"
                >
                  Find Tutors
                </Link>
              </li>

              <li>
                <Link
                  href="/add-tutor"
                  className="transition hover:text-primary"
                >
                  Become a Tutor
                </Link>
              </li>

              <li>
                <Link
                  href="/booked-sessions"
                  className="transition hover:text-primary"
                >
                  Book Sessions
                </Link>
              </li>

              <li>
                <Link
                  href="/my-tutors"
                  className="transition hover:text-primary"
                >
                  Manage Tutors
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="transition hover:text-primary"
                >
                  Learning Support
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-5 text-xl font-bold">Quick Links</h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-primary"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="transition hover:text-primary"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-primary"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="transition hover:text-primary"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="transition hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="mb-5 text-xl font-bold">
              Contact Information
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <HiOutlineLocationMarker
                  size={22}
                  className="mt-1 text-primary"
                />

                <p className="text-neutral-content/80">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlinePhone
                  size={20}
                  className="text-primary"
                />

                <p className="text-neutral-content/80">
                  +880 1234-567890
                </p>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineMail
                  size={20}
                  className="text-primary"
                />

                <p className="text-neutral-content/80">
                  support@mediqueue.com
                </p>
              </div>
            </div>

            
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-sm text-neutral-content/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} MediQueue. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="transition hover:text-primary"
            >
              Terms
            </Link>

            <Link
              href="/"
              className="transition hover:text-primary"
            >
              Privacy
            </Link>

            <Link
              href="/"
              className="transition hover:text-primary"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;