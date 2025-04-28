import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          Sprout & Spoon
        </div>
        <div>
          <Link href="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
          <Link href="/menu" className="text-gray-300 hover:text-white px-3 py-2">Menu</Link>
          <Link href="/reservations" className="text-gray-300 hover:text-white px-3 py-2">Reservations</Link>
          <Link href="/catering" className="text-gray-300 hover:text-white px-3 py-2">Catering</Link>
        </div>
      </div>
    </nav>
  );
}