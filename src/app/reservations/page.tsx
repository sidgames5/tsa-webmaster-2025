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
        <div className="flex flex-col items-center justify-start bg-[#fdf7f2] justify-center flex-col h-[100vh-4rem)]">
            <div
                className="relative min-h-[50vh] w-full flex items-center justify-center bg-fixed"
                style={{
                    backgroundImage: "url('/images/B6.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="relative tangerine-bold text-7xl md:text-8xl text-white">Reservations</h1>
            </div>
            
            <div className="max-w-7xl w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1px_1fr] gap-12">
                <div> 
                    <h2 className="dm-serif-text-regular-italic text-4xl md:text-5xl mb-6 text-gray-800 text-center">Book a table</h2>
                    <form action={handleReserve} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-lg border border-[#e6ded3]">
                        <input type="text" id="name" name="name" className="p-3 rounded-lg border border-gray-300" placeholder='Name' required />

                        <input type="number" id="guests" name="guests" min="1" max="20" className="p-3 border border-gray-300 rounded-md" placeholder='Number of guests' required />

                        <input type="date" id="date" name="date" className="p-3 border border-gray-300 rounded-md" required />

                        <input type="time" id="time" name="time" className="p-3 border border-gray-300 rounded-md" required />

                        <input type="email" id="email" name="email" className="col-span-2 p-3 border border-gray-300 rounded-md" placeholder='Email Address' required />

                        <input type="comments" id="comments" name="comments" className="col-span-2 p-3 border border-gray-300 rounded-md" placeholder="Any other comments you want us to know ?  (e.g. allergies, birthdays, etc)..." />

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-200 col-span-2"
                            >
                            Reserve Table
                        </button>
                    </form>
                </div>
                <div className="w-[1px] h-[480px] bg-black"></div>
                <div className="mt-24 w-full h-[300px] max-w-md p-6 bg0white/70 border border-gray-200 rounded-2xl shadow-lg text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Need Help?</h2>
                    <p className="text-gray-600">We're happy to acccommodate special requests or answer any questions! Feel free to leave a comment in the form or contact us directly!</p>
                    <div className="mt-6 text-gray-700 border-2 p-2 rounded-2xl">
                        <p><strong>Email:</strong> sproutandspoon@gmail.com</p>
                        <p><strong>Phone:</strong> (123) 456-7890</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
