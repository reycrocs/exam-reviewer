export default function About() {
    return (
        <section className="flex flex-col items-center px-6 py-20 bg-gray-50 space-y-12">
            <div className="w-full max-w-4xl text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    What is <span className="font-black">PREP<span className="text-green-600">IT</span></span>?
                </h2>
                <p className="text-gray-600 text-md sm:text-lg">
                A dynamic platform designed to help you Prepare, Review, Excel, and Pass your IT certification exams with confidence. Whether you are a student or a working professional, PREPIT provides interactive tools, real exam simulations, and expertly curated content to ensure you stay focused, motivated, and fully equipped to succeed.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
                <div className="border rounded-2xl p-6 bg-white flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Empowering individuals globally with high-quality learning tools that simplify IT certification preparation. 
                        We are dedicated to making learning accessible, effective, and engaging for everyone.
                    </p>
                </div>
                <div className="border rounded-2xl p-6 bg-white flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">What We Offer</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        From interactive flashcards and realistic exam simulations to progress tracking, we provide everything you need to succeed—anytime, anywhere.
                    </p>
                </div>
            </div>
        </section>
    );
}
