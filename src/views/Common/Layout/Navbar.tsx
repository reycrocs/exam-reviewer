import { useState } from "react";
import CustomButton from "../Components/CustomButton";
import CustomLinks from "../Components/CustomLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-5">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/prep-it.png" alt="PREP-IT Logo" className="h-8" /> {/* Set height if needed */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li><CustomLinks href="/" text="Features" /></li>
          <li><CustomLinks href="/about" text="About" /></li>
          <li><CustomLinks href="/testimonials" text="Testimonials" /></li>
          <CustomButton
            text="Start Demo"
            onClick={() => console.log("button clicked")}
          />
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-center">
          <li><CustomLinks href="/" text="Features" /></li>
          <li><CustomLinks href="/about" text="About" /></li>
          <li><CustomLinks href="/testimonials" text="Testimonials" /></li>
        </ul>
      )}
    </nav>
  );
}