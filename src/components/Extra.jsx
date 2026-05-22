"use client";

const whyChooseData = [
  {
    title: "Easy Booking",
    description:
      "Book tutors instantly with a smooth and simple interface.",
  },
  {
    title: "Verified Tutors",
    description:
      "All tutors are verified to ensure quality education.",
  },
  {
    title: "Flexible Scheduling",
    description:
      "Choose time slots that fit your daily routine.",
  },
  {
    title: "Affordable Pricing",
    description:
      "Find tutors that match your budget easily.",
  },
];

const howItWorksData = [
  {
    number: "01",
    title: "Search Tutor",
    description:
      "Browse tutors by subject and availability.",
  },
  {
    number: "02",
    title: "Select Slot",
    description:
      "Choose your preferred date and time.",
  },
  {
    number: "03",
    title: "Book Session",
    description:
      "Confirm booking with one click.",
  },
  {
    number: "04",
    title: "Start Learning",
    description:
      "Join your session and begin learning.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* WHY CHOOSE SECTION */}
        <div>
          <h2 className="text-center text-3xl md:text-5xl font-bold text-black">
            Why Choose MediQueue?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
            {whyChooseData.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[28px] shadow-sm px-8 py-12 text-center hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-black">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-lg leading-relaxed mt-5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-28">
          <h2 className="text-center text-3xl md:text-5xl font-bold text-black">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
            {howItWorksData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-[28px] shadow-sm px-8 py-12 text-center hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-5xl font-bold text-blue-600">
                  {item.number}
                </h3>

                <h4 className="text-2xl font-bold text-black mt-6">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-lg leading-relaxed mt-5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}