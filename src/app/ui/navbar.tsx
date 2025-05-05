"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="bg-gray-900 shadow-md relative"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-tight z-50">
          Sprout & Spoon
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white z-50"
          aria-label="Toggle menu"
        >
          <svg width="23" height="23" viewBox="0 0 23 23">
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="currentColor"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
              animate={isOpen ? "open" : "closed"}
            />
            <motion.path
              d="M 2 9.423 L 20 9.423"
              fill="transparent"
              strokeWidth="3"
              stroke="currentColor"
              strokeLinecap="round"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
              animate={isOpen ? "open" : "closed"}
            />
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="currentColor"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
              animate={isOpen ? "open" : "closed"}
            />
          </svg>
        </button>
      </div>

     
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-gray-900 origin-top z-40"
            initial={{
              clipPath: "circle(30px at 40px 40px)",
            }}
            animate={{
              clipPath: `circle(${(height || 1000) * 2 + 200}px at 40px 40px)`,
              transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
              },
            }}
            exit={{
              clipPath: "circle(30px at 40px 40px)",
              transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 400,
                damping: 40,
              },
            }}
          />
        )}
      </AnimatePresence>

      
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="fixed top-24 left-6 w-[230px] z-50 space-y-5"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: { staggerChildren: 0.07, delayChildren: 0.2 },
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
              },
            }}
          >
            <MobileNavLink href="/menu">Menu</MobileNavLink>
            <MobileNavLink href="/reservations">Reservations</MobileNavLink>
            <MobileNavLink href="/catering">Catering</MobileNavLink>
            <MobileNavLink href="/merch">Merch</MobileNavLink>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
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

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.li
      variants={{
        open: {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 },
          },
        },
        closed: {
          y: 50,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 },
          },
        },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className="text-white text-xl font-medium block py-2"
      >
        {children}
      </Link>
    </motion.li>
  );
}

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [ref]);

  return dimensions;
};


{/* Old Code:
  
    import Link from "next/link";

export default function Navbar() {
  
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-tight">
          Sprout & Spoon
        </Link>
        <div className="space-x-6">
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
  */}