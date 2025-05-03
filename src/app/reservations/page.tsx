'use client';

import { reserveTable } from './actions';

export default function Page() {
    async function handleReserve(formData: FormData) {
        const data = await reserveTable(formData);

        if (data.error) {
            alert(data.error);
        }

        if (data.success) {
            alert(data.message);
        }
    }
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
                <form action={handleReserve} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <input type="text" id="name" name="name" className="p-2 border border-gray-300 rounded-md" placeholder='Name' required />

                    <input type="number" id="guests" name="guests" min="1" max="20" className="p-2 border border-gray-300 rounded-md" placeholder='Number of guests' required />

                    <input type="date" id="date" name="date" className="p-2 border border-gray-300 rounded-md" required />

                    <input type="time" id="time" name="time" className="p-2 border border-gray-300 rounded-md" required />

                    <input type="email" id="email" name="email" className="col-span-2 p-2 border border-gray-300 rounded-md" placeholder='Email Address' required />

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-200 col-span-2"
                    >
                        Reserve Table
                    </button>
                </form>
            </div>
        </div>
    );
}
