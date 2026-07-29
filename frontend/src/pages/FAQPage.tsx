import React, { useState } from 'react';
import { faqs } from '../data';

const FAQPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-4">
            Find answers to common questions about our printing services and digital workflows.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition flex justify-between items-center"
              >
                <span className="font-semibold text-dark-blue-primary">{faq.question}</span>
                <span
                  className={`text-blue-accent text-2xl transform transition-transform duration-300 ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                >
                  {openFAQ === faq.id ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFAQ === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
