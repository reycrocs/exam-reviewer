import { Quote } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="flex flex-col items-center px-6 py-20 bg-gray-50 space-y-12">
            <div className="w-full max-w-4xl text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    What Our Users Say
                </h2>
                <p className="text-gray-600 text-md sm:text-lg">
                    Join thousands of students and professionals who trust <span className="font-black">PREP<span className="text-green-600">IT</span></span> to achieve top results in their exams.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {[
                    {
                        quote: "PREPIT made studying so much easier! The flashcards and exam simulations helped me pass my certification on the first try.",
                        name: "Alex M.",
                        role: "IT Graduate",
                        image: "https://randomuser.me/api/portraits/men/32.jpg",
                    },
                    {
                        quote: "The platform is super intuitive and mobile-friendly. I was able to practice even while commuting!",
                        name: "Sarah K.",
                        role: "Network Engineer",
                        image: "https://randomuser.me/api/portraits/women/44.jpg",
                    },
                    {
                        quote: "What I love about PREPIT is how real the past exam questions feel. It truly boosted my confidence before the actual exam.",
                        name: "Michael D.",
                        role: "Software Developer",
                        image: "https://randomuser.me/api/portraits/men/45.jpg",
                    },
                ].map((testimonial, idx) => (
                    <div key={idx} className="border rounded-2xl p-6 flex flex-col gap-4 items-start bg-white transition">
                        <Quote size={32} className="text-green-600" />
                        <p className="text-gray-700 text-sm leading-relaxed flex-1">"{testimonial.quote}"</p>
                        <div className="mt-4 flex items-center gap-3">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
