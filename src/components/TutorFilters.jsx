"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TutorFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

 
  const applyFilters = (newSearch, newStart, newEnd) => {
    const params = new URLSearchParams();

    if (newSearch) params.set("searchTerm", newSearch);
    if (newStart) params.set("startDate", newStart);
    if (newEnd) params.set("endDate", newEnd);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    applyFilters(value, startDate, endDate);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    applyFilters(search, value, endDate);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    applyFilters(search, startDate, value);
  };

  const resetFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    router.push("?", { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end mb-10 w-full max-w-5xl mx-auto">
      {/* Search Input */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search Tutor</label>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search tutor by name..."
          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Start Date */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-full h-12 px-4 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* End Date */}
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="w-full h-12 px-4 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Reset Button */}
      <div className="flex-1 w-full">
        <button
          onClick={resetFilters}
          className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TutorFilters;