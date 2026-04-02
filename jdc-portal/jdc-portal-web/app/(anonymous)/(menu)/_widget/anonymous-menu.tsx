"use client";

import { useState } from "react";
import Link from "next/link";
import { Coffee, Menu, X } from "lucide-react";

type Course = {
  id: number;
  name: string;
};

export default function AnonymousMenu({ courses }: { courses: Course[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 md:px-16 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl flex items-center gap-2">
          <Coffee />
          Java Developer Class
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {courses.map((course) => (
            <li key={course.id}>
              <Link href={`/courses/${course.id}`}>
                {course.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="mt-4 flex flex-col gap-4 md:hidden">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href={`/courses/${course.id}`}
                onClick={() => setIsOpen(false)}
              >
                {course.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}