import Hero from "./hero";
import Features from "./features";
import Testimonials from "./testimonials";
import About from "./about";
import Navbar from "../Common/Layout/Navbar";
import Footer from "../Common/Layout/Footer";
export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Testimonials />
            <Footer />
        </>
    );
}
