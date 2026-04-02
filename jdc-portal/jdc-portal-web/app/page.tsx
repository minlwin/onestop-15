import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    title: "Welcome to Our School",
    subtitle: "Learn modern technologies with real projects",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Build Your Career",
    subtitle: "Become a professional developer",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Hands-on Learning",
    subtitle: "Practice with real-world scenarios",
  },
];

const courses = [
  { name: "Java Basic", path: "/courses/java-basic" },
  { name: "Full Stack Spring", path: "/courses/fullstack-spring" },
  { name: "One Stop Java", path: "/courses/one-stop-java" },
  { name: "Python Foundation", path: "/courses/python-foundation" },
];

export default function WelcomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={heroSlides[current].image}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {heroSlides[current].title}
              </h1>
              <p className="text-lg md:text-2xl mb-6">
                {heroSlides[current].subtitle}
              </p>
              <div className="flex gap-4">
                <Button onClick={() => (window.location.href = "/courses")}>Browse Courses</Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/signin")}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* COURSES SECTION */}
      <div className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">Our Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-4">{course.name}</h3>
              <Button
                onClick={() => (window.location.href = course.path)}
              >
                View Details
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">School Management</h3>
            <p className="text-sm text-gray-400">
              Empowering students with modern technology skills.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="cursor-pointer" onClick={() => (window.location.href = "/courses")}>
                Courses
              </li>
              <li className="cursor-pointer" onClick={() => (window.location.href = "/signin")}>
                Sign In
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-400">Email: info@school.com</p>
            <p className="text-sm text-gray-400">Phone: +959123456789</p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} School Management System
        </div>
      </footer>
    </div>
  );
}
