import TutorFilters from '@/components/TutorFilters'; 
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

export const dynamic = "force-dynamic";
const tutorPage = async ({ searchParams }) => {
  const sParams = await searchParams;
  
  // Extract parameters sent by the TutorFilters component
  const searchTerm = sParams?.searchTerm || "";
  const startDate = sParams?.startDate || "";
  const endDate = sParams?.endDate || "";

  const fetchCourses = async (search, start, end) => {
    // Dynamically build the query string based on active filters
    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (start) query.append('startDate', start);
    if (end) query.append('endDate', end);

    // Fetch data with query string applied
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination?${query.toString()}`, {
      cache: 'no-store' 
    });
    const data = await res.json();
    return data || [];
  };

  const courses = await fetchCourses(searchTerm, startDate, endDate);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold font-serif text-black tracking-wide">
            All Tutors
          </h1>
        </div>

        {/* Filter Section */}
        <Suspense fallback={<div className="text-center py-5">Loading filters...</div>}>
          <TutorFilters />
        </Suspense>

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((tutor) => (
            <div
              key={tutor._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
            >
              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={tutor?.photoUrl}
                  alt={tutor?.tutorName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {tutor.tutorName}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {tutor.subject}
                </p>

                <div className="space-y-2 text-sm text-gray-800 font-medium">
                  <p>Available: {tutor.availableDays} {tutor.availableTime}</p>
                  <p>Session Start Date: {tutor.sessionStartDate}</p>
                  <p>Fee: ৳{tutor.hourlyFee}/hr</p>
                </div>

                {/* Button */}
                <Link
                  href={`/tutors/${tutor._id}`}
                  className="mt-6 flex items-center justify-center w-full rounded-xl bg-[#009688] text-white py-3 font-semibold hover:bg-[#00796b] transition-colors"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default tutorPage;