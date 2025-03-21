import { useState, useEffect } from "react";
import CustomButton from "../Components/CustomButton";
import CustomLinks from "../Components/CustomLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false); // hide on scroll down
      } else {
        setShowNavbar(true); // show on scroll up
      }

      if (window.scrollY > 50) {
        setIsScrolled(true); // trigger color change when not at the top
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`p-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-gray-900 text-white" : "bg-white text-black"} drop-shadow-sm`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <img src={isScrolled ? "/prepit-dark.png" : "/prepit-light.png"} alt="PREP-IT Logo" className="h-8" />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li><CustomLinks href="/#features" text="Features" /></li>
          <li><CustomLinks href="/#about" text="About" /></li>
          <li><CustomLinks href="/#testimonials" text="Testimonials" /></li>
          <CustomButton
            text="Start Demo"
            className={isScrolled 
              ? "bg-white text-gray-900 hover:bg-green-600" 
              : "bg-gray-900 text-white hover:bg-green-600"
            }
            onClick={() => console.log("button clicked")}
          />
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-center">
          <li><CustomLinks href="/#features" text="Features" /></li>
          <li><CustomLinks href="/#about" text="About" /></li>
          <li><CustomLinks href="/#testimonials" text="Testimonials" /></li>
        </ul>
      )}
    </nav>
  );
}
