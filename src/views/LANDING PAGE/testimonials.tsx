import { Quote } from "lucide-react";
import { testimony } from "./testimonials";

export default function Testimonials() {
    return (
        <section id="testimonials" className="flex flex-col items-center px-6 py-20 bg-gray-50 space-y-12">
            <div className="w-full max-w-4xl text-center space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    What Our Users Say
                </h2>
                <p className="text-gray-600 text-md sm:text-lg">
                    Join thousands of students and professionals who trust <span className="font-black">PREP<span className="text-green-600">IT</span></span> to achieve top results in their exams.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {testimony.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-2xl p-6 flex flex-col gap-4 items-start bg-white transition">
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
