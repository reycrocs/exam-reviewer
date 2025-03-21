import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 px-6 py-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">PREP<span className="text-green-500">IT</span></h3>
                    <p className="text-sm leading-relaxed">
                        Prepare, Review, Excel, and Pass your IT certification exams with confidence. Your trusted study companion.
                    </p>
                </div>

                <div>
                    <h4 className="text-md font-semibold text-white mb-3">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-500">About</a></li>
                        <li><a href="#" className="hover:text-green-500">Features</a></li>
                        <li><a href="#" className="hover:text-green-500">Testimonials</a></li>
                        <li><a href="#" className="hover:text-green-500">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-md font-semibold text-white mb-3">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-500">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-green-500">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-green-500">Cookie Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-md font-semibold text-white mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="hover:text-green-500"><Facebook /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-green-500"><Twitter /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-green-500"><Linkedin /></a>
                        <a href="#" aria-label="Email" className="hover:text-green-500"><Mail /></a>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} PREPIT. All rights reserved.
            </div>
        </footer>
    );
}
