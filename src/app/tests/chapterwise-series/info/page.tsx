import React from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming Card components

// Define a placeholder for your theme's color7 if not directly available as a Tailwind class
// For example, if color7 is a custom color in your tailwind.config.js, you'd use 'bg-color7' directly.
// For this example, I'll use a purple shade that often represents 'color7' in similar themes.
const COLOR_PRIMARY = '#7C3AED'; // A shade of purple

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-4 sm:p-8">
      
        <div className="w-full max-w-4xl bg-white shadow-2xl shadow-zinc-900/10 rounded-xl overflow-hidden">
          <div className="space-y-4 p-6 sm:p-8  bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight">
              <span className="block text-yellow-300 drop-shadow-lg">FREE</span> Chapterwise Series
            </h1>
            <p className="text-lg sm:text-xl text-center text-purple-100 font-medium">
              Your Comprehensive Course Completion Program
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* <section className="text-center">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">What is the Chapterwise Series?</h2>
              <p className="text-lg text-zinc-700 leading-relaxed">
                The Chapterwise Series is an intensive, highly structured program designed to help you master your entire course syllabus, chapter by chapter. We focus on in-depth understanding and practical application, ensuring you're fully prepared for your upcoming examinations.
              </p>
            </section> */}

            <section className="grid md:grid-cols-2 gap-8 text-center">
              <div className="bg-zinc-50 p-6 rounded-lg shadow-inner border border-zinc-100">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">Complete Course Coverage</h3>
                <p className="text-lg text-zinc-700">
                  This series is meticulously crafted to cover <strong>almost every single chapter</strong> of your syllabus.
                </p>
              </div>
              <div className="bg-zinc-50 p-6 rounded-lg shadow-inner border border-zinc-100">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3">Duration & Intensity</h3>
                <p className="text-lg text-zinc-700">
                  The entire program spans approximately <strong>one and a half months (6 weeks)</strong>.
                </p>
              </div>
            </section>
            <section className="text-center">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">Who Benefits?</h2>
              <p className="text-lg text-zinc-700 leading-relaxed">
                CEE-UG aspirants for : 
                <span className="font-semibold"> MBBS</span>,
                <span className="font-semibold">BDS</span>,
                <span className="font-semibold">B.Sc. Nursing</span>,
                <span className="font-semibold">Paramedical</span>, and allied programs.
              </p>
            </section>

            <section className="text-center bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4">Why is it FREE?</h2>
              <p className="text-lg text-zinc-700">
                We believe in making quality education accessible. This free series is our commitment to supporting your academic journey and helping you achieve your dreams without financial barriers.
              </p>
            </section>

            <section className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <a
                href="/tests/chapterwise-series/register"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300
                           bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white
                           transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 inline-block text-center"
              >
                Register Now! <span className='text-xs'>it&apos;s free</span>
              </a>
              <a
                href="/tests/chapterwise-series/schedule"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300
                           bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white
                           transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 inline-block text-center"
              >
                View Schedule
              </a>
            </section>
          </div>
        </div>
      
    </div>
  );
};

export default page;
