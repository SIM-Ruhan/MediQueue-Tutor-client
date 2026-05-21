"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeaturesSection = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches exactly 6 tutors using your Vercel URL with the limit operator
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination?limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tutors:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-[#009688]"></span>
      </div>
    );
  }

  const featured = tutors.slice(0, 6);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold font-serif text-black tracking-wide mb-3">
            Available Tutors
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Learn from experienced tutors across different subjects. Book a session today to upgrade your skills.
          </p>
        </div>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((tutor) => (
            <div
              key={tutor._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full">
                <Image
                  src={tutor?.photoUrl}
                  alt={tutor?.tutorName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content Box */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {tutor?.tutorName}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {tutor?.subject}
                </p>

                <div className="space-y-2 text-sm text-gray-800 font-medium mb-6">
                  <p>Available Days: {tutor?.availableDays || "N/A"}</p>
                  <p>Teaching Mode: {tutor?.teachingMode || "N/A"}</p>
                  <p>Fee: ৳{tutor?.hourlyFee}/hr</p>
                </div>

                {/* Button Container aligned to the bottom */}
                <div className="mt-auto">
                  <Link
                    href={`/tutors/${tutor._id}`}
                    className="flex items-center justify-center w-full rounded-xl bg-[#009688] text-white py-3 font-semibold hover:bg-[#00796b] transition-colors"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Wrapper */}
        <div className="mt-12 flex justify-center">
          <Link href="/tutors">
            <button className="rounded-xl bg-[#009688] text-white py-3 px-10 font-semibold hover:bg-[#00796b] transition-colors tracking-wide shadow-md">
              View All
            </button>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturesSection;