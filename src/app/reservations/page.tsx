'use client';

import { useState } from 'react';
import { reserveTable } from './actions';

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleReserve(formData: FormData) {
        setIsSubmitting(true);
        const data = await reserveTable(formData);

        if (data.error) {
            alert(data.error);
            setIsSubmitting(false);
            return;
        }

        if (data.success) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        }

        setIsSubmitting(false);
    }

    return (
        <div className="flex flex-col items-center justify-start bg-[#fdf7f2] h-[calc(100vh-4rem)]">
            <div
                className="relative min-h-[50vh] w-full flex items-center justify-center bg-fixed"
                style={{
                    backgroundImage: "url('https://cdn.pixabay.com/photo/2021/07/20/06/04/restaurant-6479818_1280.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="relative tangerine-bold text-5xl sm:text-6xl md:text-8xl text-white text-center px-4">Reservations</h1>
            </div>

            <div className="max-w-7xl w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1px_1fr] gap-12">
                <div>
                    <h2 className="dm-serif-text-regular-italic text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-800 text-center">Book a table</h2>
                    <form action={handleReserve} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-lg border border-[#e6ded3]">
                        <input type="text" id="name" name="name" className="p-3 rounded-lg border border-gray-300 text-base" placeholder='Name' required />
                        <input type="number" id="guests" name="guests" min="1" max="20" className="p-3 border border-gray-300 rounded-md text-base" placeholder='Number of guests' required />
                        <input type="date" id="date" name="date" className="p-3 border border-gray-300 rounded-md text-base" required />
                        <input type="time" id="time" name="time" className="p-3 border border-gray-300 rounded-md text-base" required />
                        <input type="email" id="email" name="email" className="col-span-2 p-3 border border-gray-300 rounded-md text-base" placeholder='Email Address' required />
                        <textarea id="comments" name="comments" className="col-span-2 p-3 border border-gray-300 rounded-md text-base" placeholder="Any other comments you want us to know? (e.g. allergies, birthdays, etc)..." />

                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className={`col-span-2 flex items-center justify-center transition-all duration-300 ease-in-out text-lg font-semibold py-4 rounded-xl
                                text-white bg-black hover:bg-gray-700
                                ${isSubmitting && 'opacity-50 cursor-not-allowed'}
                                ${isSuccess && 'bg-green-600 hover:bg-green-500'}
                            `}
                        >
                            {isSuccess ? '✔ Request Added!' : isSubmitting ? 'Submitting...' : 'Reserve Table'}
                        </button>
                    </form>
                </div>

                <div className="hidden lg:block w-[1px] h-[480px] bg-black"></div>

                <div className="mt-24 w-fullr h-[300px] sm:ml-30 max-w-md p-6 bg-white/70 border border-gray-200 rounded-2xl shadow-lg text-center">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Need Help?</h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        We&apos;re happy to accommodate special requests or answer any questions! Leave a comment in the form or contact us directly.
                    </p>
                    <div className="mt-6 text-gray-700 border-2 p-4 rounded-2xl text-sm sm:text-base">
                        <p><strong>Email:</strong> sproutandspoon@gmail.com</p>
                        <p><strong>Phone:</strong> (123) 456-7890</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
