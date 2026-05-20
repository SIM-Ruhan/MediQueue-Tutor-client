"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Find The Perfect Tutor For Your Learning Journey",
    description:
      "Connect with experienced tutors and improve your skills with personalized learning sessions.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Book Sessions Anytime, Anywhere",
    description:
      "Schedule learning sessions easily and manage your bookings with a smooth experience.",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Learn From Skilled & Verified Tutors",
    description:
      "Explore top-rated tutors across different subjects and achieve your academic goals faster.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  

  // Next Slide
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };
  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Previous Slide
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative h-[85vh] min-h-150 w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        fill
        priority
        className="object-cover"
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
        Learn Smarter With MediQueue
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
              {slides[currentSlide].title}
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
              {slides[currentSlide].description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/tutors"
                className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:bg-primary-focus"
              >
                Explore Tutors

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/add-tutor"
                className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LEFT BUTTON - ONLY LARGE DEVICES */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-primary lg:flex"
      >
        <FaChevronLeft size={18} />
      </button>

      {/* RIGHT BUTTON - ONLY LARGE DEVICES */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-primary lg:flex"
      >
        <FaChevronRight size={18} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-10 bg-primary"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;