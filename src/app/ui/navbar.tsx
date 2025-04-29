import Link from "next/link";

export default function Navbar() {
  
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-tight">
          Sprout & Spoon
        </Link>
        <div className="space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/menu">Menu</NavLink>
          <NavLink href="/reservations">Reservations</NavLink>
          <NavLink href="/catering">Catering</NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-blue-100 hover:text-white transition-colors duration-200 font-medium"
    >
      {children}
    </Link>
  );
}
