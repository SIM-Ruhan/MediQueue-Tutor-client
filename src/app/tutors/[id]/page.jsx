import BookingPage from '@/components/BookingPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';


const TutorDetailsPage = async({params}) => {
const {id} = await params;
const {token} = await auth.api.getToken({
    headers: await headers()
})
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/destination/${id}`,{
    headers:{
        authorization: `Bearer ${token}`
    }
});
const tutor = await res.json();

 const currentDate = new Date();
  const sessionDate = new Date(tutor.sessionStartDate);

  const bookingAvailable =
    currentDate >= sessionDate && tutor.totalSlot > 0;
    return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl bg-base-100 p-6 shadow-xl md:p-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-125 overflow-hidden rounded-3xl">
            <Image
              src={tutor.photoUrl}
              alt={tutor.tutorName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content */}
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {tutor.subject}
              </span>

              <span className="rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                {tutor.teachingMode}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold">
              {tutor.tutorName}
            </h1>

            <p className="mt-4 leading-8 text-gray-500">
              {tutor.description}
            </p>

            <div className="mt-8 space-y-4">
              <p>
                🎓 Institution:{" "}
                <span className="font-semibold">
                  {tutor.institution}
                </span>
              </p>

              <p>
                💼 Experience:{" "}
                <span className="font-semibold">
                  {tutor.experience}
                </span>
              </p>

              <p>
                📍 Location:{" "}
                <span className="font-semibold">
                  {tutor.location}
                </span>
              </p>

              <p>
                💰 Hourly Fee:{" "}
                <span className="font-semibold">
                  ৳{tutor.hourlyFee}
                </span>
              </p>

              <p>
                📅 Days:{" "}
                <span className="font-semibold">
                  {tutor.availableDays}
                </span>
              </p>

              <p>
                🕒 Time:{" "}
                <span className="font-semibold">
                  {tutor.availableTime}
                </span>
              </p>

              <p>
                🎯 Available Slots:{" "}
                <span className="font-semibold">
                  {tutor.totalSlot}
                </span>
              </p>

              <p>
                🚀 Session Starts:{" "}
                <span className="font-semibold">
                  {tutor.sessionStartDate}
                </span>
              </p>
            </div>

            {/* Conditions */}
            <div className="mt-8">
              {tutor.totalSlot === 0 && (
                <div className="mb-4 rounded-2xl bg-red-100 p-4 text-red-600">
                  This session is fully booked. You can’t join
                  at the moment.
                </div>
              )}

              {currentDate < sessionDate && (
                <div className="mb-4 rounded-2xl bg-yellow-100 p-4 text-yellow-700">
                  Booking is not available yet for this tutor.
                </div>
              )}
            </div>

            {/* Button */}
            <div
              className={`mt-6 w-full ${
                bookingAvailable
                  ? ""
                  : "btn-disabled"
              }`}
            >
             <BookingPage tutor={tutor}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;