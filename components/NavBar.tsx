"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/politicians", label: "Politicians" },
  { href: "/news", label: "News" },
  { href: "/why-it-matters", label: "Why It Matters" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-dark text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-teal hover:text-teal/80 transition-colors">
          STEMpolitics
        </Link>
        <ul className="flex gap-6 text-sm font-normal">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    isActive
                      ? "text-teal border-b-2 border-teal pb-0.5"
                      : "text-gray-300 hover:text-white transition-colors"
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
