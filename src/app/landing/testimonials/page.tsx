//src/app/landing/testimonials/page.tsx

import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Emily Johnson",
      feedback:
        "StudyAI completely changed the way I learn! The AI recommendations are spot-on.",
      rating: 5,
    },
    {
      name: "Michael Smith",
      feedback:
        "This platform made my studies so much more efficient. Highly recommended!",
      rating: 4,
    },
    {
      name: "Sophia Lee",
      feedback:
        "The personalized study plans helped me stay focused and achieve my goals.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50 text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
        <p className="text-gray-600 mt-2">
          See how StudyAI has helped students improve their learning experience.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <FaQuoteLeft className="text-4xl text-blue-500 mb-3" />
              <p className="text-gray-700">{testimonial.feedback}</p>
              <div className="mt-4 flex justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
