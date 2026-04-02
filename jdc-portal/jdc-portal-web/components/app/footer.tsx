import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Java Developer Class</h3>
            <p className="text-sm text-gray-400">
              Empowering students with modern technology skills.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>
                <Link href="/confirm">Confirm Registration</Link>
              </li>
              <li>
                <Link href="/signin">Sign In</Link>
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
    )
}