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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
const featured = tutors.slice(0, 6);
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">Available Tutors</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Learn from experienced tutors across different subjects. Book a session today to upgrade your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((tutor) => (
          <div 
            key={tutor._id} 
            className="card bg-base-100 shadow-xl border transition-all duration-300 hover:shadow-2xl"
          >
            <figure className="h-64 overflow-hidden relative">
              <Image
                src={tutor?.photoUrl}
                alt={tutor?.tutorName}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                unoptimized
              />
            </figure>

            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-bold mb-2">{tutor?.tutorName}</h2>

              <div className="space-y-1 text-gray-600 mb-4">
                <p>
                  <span className="font-semibold text-gray-800">Subject:</span> {tutor?.subject}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Experience:</span> {tutor?.experience} years
                </p>
                <p>
                  <span className="font-semibold text-gray-800">TeachingMode:</span> {tutor?.teachingMode}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t">
                <span className="text-sm text-gray-500">Hourly Rate</span>
                <p className="text-2xl font-bold text-primary text-right">${tutor?.hourlyFee}/<span className="text-gray-600 text-sm">hour</span></p>
              </div>

              <div className="card-actions mt-4">
                {/* Dynamically redirects the user to the tutor details page */}
                <Link 
                  href={`/tutors/${tutor._id}`} 
                  className="btn btn-primary w-full text-white tracking-wide"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href={"/tutors"}>
                    <button className="btn btn-primary text-white py-3 px-12  rounded cursor-pointer hover:bg-green-700 flex w-40 mx-auto font-semibold mt-10">
                      View All
                    </button>
                  </Link>
    </section>
  );
};

export default FeaturesSection;