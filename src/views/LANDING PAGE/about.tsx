export default function About() {
    return (
        <section id="about" className="flex flex-col items-center px-6 py-20 bg-gray-50 space-y-12">
            <div className="w-full max-w-4xl text-center space-y-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight text-gray-900 leading-tight font-black font-lemon">
                    What is <span className="font-black">PREP<span className="text-green-600">IT</span></span>?
                </h1>
                <p className="text-gray-600 text-md sm:text-lg">
                    A dynamic platform designed to help you <span className="font-black">P</span>repare, <span className="font-black">R</span>eview, <span className="font-black">E</span>xcel, and <span className="font-black">P</span>ass your <span className="font-black text-green-600">IT</span>-related exams and certifications with confidence. Whether you are a student or a working professional, PREPIT provides interactive tools, real exam simulations, and expertly curated content to ensure you stay focused, motivated, and fully equipped to succeed.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-5xl">
                <div className="border rounded-2xl p-6 bg-white flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        Empowering individuals globally with high-quality learning tools that simplify IT exam preparation. 
                        We are dedicated to making learning accessible, effective, and engaging for everyone.
                    </p>
                </div>
                <div className="border rounded-2xl p-6 bg-white flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-gray-800">What We Offer</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        From free interactive flashcards and in-depth explanations to realistic exam simulations that mirror the actual test experience, 
                        we equip you with all the essential tools you need to master concepts and succeed in your IT exams—anytime, anywhere, and at no cost.
                    </p>
                </div>
            </div>
        </section>
    );
}
