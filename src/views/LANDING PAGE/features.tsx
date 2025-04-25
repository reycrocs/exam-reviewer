import {
  BookOpen,
  Clock,
  Smartphone,
  LightbulbIcon,
  Star,
  PencilIcon,
} from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="flex flex-col items-center w-full px-6 py-20 bg-white"
    >
      <div className="w-full max-w-6xl text-center space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight text-gray-900 leading-tight font-black font-lemon">
            Why Choose{" "}
            <span className="font-black">
              PREP<span className="text-green-600">IT</span>
            </span>
            ?
          </h1>
          <p className="text-gray-600 text-md sm:text-lg mx-auto mt-2">
            Trusted by thousands for smarter, faster, and more effective exam
            preparation.{" "}
            <span className="font-black">
              PREP<span className="text-green-600">IT</span>
            </span>{" "}
            helps you build confidence and excel with interactive flashcards and
            real exam simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
            <BookOpen className="text-green-600" size={56} />
            <h3 className="mt-5 font-semibold text-xl text-gray-800">
              Comprehensive Flashcards
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Master key IT concepts with interactive flashcards designed to
              boost your memory and understanding.
            </p>
          </div>

          <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
            <Clock className="text-green-600" size={56} />
            <h3 className="mt-5 font-semibold text-xl text-gray-800">
              Timed Exam Simulations
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Simulate real exam conditions with timed tests and sharpen your
              time management skills.
            </p>
          </div>

          {/* <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
                        <DollarSign className="text-green-600" size={56} />
                        <h3 className="mt-5 font-semibold text-xl text-gray-800">Completely Free</h3>
                        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                            Access all core features without paying a single cent—learn efficiently at no cost.
                        </p>
                    </div> */}
          <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
            <PencilIcon className="text-green-600" size={56} />
            <h3 className="mt-5 font-semibold text-xl text-gray-800">
              Draw, Highlight & Sketch
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Use on-screen tools to sketch diagrams, solve problems, or
              highlight key terms—perfect for iPad and stylus users.
            </p>
          </div>

          <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
            <Smartphone className="text-green-600" size={56} />
            <h3 className="mt-5 font-semibold text-xl text-gray-800">
              Mobile & User-Friendly Design
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Enjoy a responsive, mobile-optimized platform with an intuitive
              interface for smooth, hassle-free learning on any device.
            </p>
          </div>

          <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
            <LightbulbIcon className="text-green-600" size={56} />
            <h3 className="mt-5 font-semibold text-xl text-gray-800">
              Insightful Solutions
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Some questions include explanations to help you grasp the
              reasoning behind correct answers and enhance your learning.
            </p>
          </div>

          <div className="border rounded-2xl p-8 flex flex-col items-center text-center transition-all bg-gray-50">
            <Star className="text-green-600" size={56} />
            <h3 className="mt-5 font-semibold text-xl text-gray-800">
              Real Past Exam Questions
            </h3>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Prepare effectively using actual questions from previous IT
              certification exams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
