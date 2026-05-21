"use client";

import Link from "next/link";
import React from "react";

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-base-100 p-10 text-center shadow-2xl">
        
        {/* Emoji Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-error/10 text-5xl">
          ⚠️
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-extrabold">
          Something Went Wrong
        </h1>

        <p className="mt-4 text-gray-500">
          An unexpected error occurred while loading this page.
        </p>

        {/* Error Message */}
        {error?.message && (
          <div className="mt-6 rounded-2xl bg-base-200 p-4 text-left">
            <p className="wrap-break-word text-sm text-error">
              {error.message}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary rounded-2xl"
          >
             Try Again
          </button>

          <Link
            href="/"
            className="btn btn-outline rounded-2xl"
          >
             Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;