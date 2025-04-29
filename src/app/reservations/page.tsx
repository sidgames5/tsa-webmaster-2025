'use client';

import { reserveTable } from './actions';
import { useState } from 'react';

export default function Page() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col gap-8">
      <div
        className="relative min-h-[50vh] w-full flex items-center justify-center align-middle"
        style={{
          backgroundImage: "url('/images/B6.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative tangerine-bold text-8xl text-white">Reservations</h1>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h1 className="dm-serif-text-regular-italic text-5xl">Book a table</h1>
        <form action={reserveTable} className="max-w-[85%] w-full">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label className="text-xl" htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="p-2 border border-gray-300 rounded-md w-full max-w-64" required />

            <label className="text-xl" htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="p-2 border border-gray-300 rounded-md w-full max-w-64" required />

            <label className="text-xl" htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" className="p-2 border border-gray-300 rounded-md w-fit max-w-64" required />

            <label className="text-xl" htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" className="p-2 border border-gray-300 rounded-md w-fit max-w-64" required />

            <label className="text-xl" htmlFor="guests">Number of Guests:</label>
            <input type="number" id="guests" name="guests" min="1" max="20" className="p-2 border border-gray-300 rounded-md w-full max-w-64" required />

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Reserve Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
