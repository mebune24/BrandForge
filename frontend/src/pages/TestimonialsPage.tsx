import React from 'react';
import { testimonials } from '../data';

const TestimonialsPage: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">What Our Clients Say</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Real feedback from businesses that trust BrandForge Technologies.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-dark-blue-primary font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
