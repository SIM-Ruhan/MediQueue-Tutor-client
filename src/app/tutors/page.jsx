import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const tutorPage = async() => {
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination`)
const destinations = await res.json();
    return (
         <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold">
            Explore Tutors
          </h1>

          <p className="mt-3 text-gray-500">
            Find the perfect tutor for your learning journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((tutor) => (
            <div
              key={tutor._id}
              className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-72 w-full">
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
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {tutor.tutorName}
                  </h2>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {tutor.subject}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <p>
                    📍 {tutor.location}
                  </p>

                  <p>
                    🎓 {tutor.institution}
                  </p>

                  <p>
                    💰 ৳{tutor.hourlyFee}/hour
                  </p>

                  <p>
                    🕒 {tutor.availableTime}
                  </p>

                  <p>
                    📅 {tutor.availableDays}
                  </p>

                  <p>
                    🎯 Slots Left: {tutor.totalSlot}
                  </p>
                </div>

                {/* Button */}
                <Link
                  href={`/tutors/${tutor._id}`}
                  className="btn btn-primary mt-6 w-full rounded-2xl"
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