import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyApp</h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/web001" className="hover:text-gray-200">WEB001</a></li>
          <li><a href="/web002" className="hover:text-gray-200">WEB002</a></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-center">
          <li><a href="/" className="hover:text-gray-200">Home</a></li>
          <li><a href="/web001" className="hover:text-gray-200">WEB001</a></li>
          <li><a href="/web002" className="hover:text-gray-200">WEB002</a></li>
        </ul>
      )}
    </nav>
  );
}