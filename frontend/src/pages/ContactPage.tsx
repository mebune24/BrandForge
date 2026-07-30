import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    Mail: <Mail size={24} className="text-blue-accent" />,
    Phone: <Phone size={24} className="text-blue-accent" />,
    MapPin: <MapPin size={24} className="text-blue-accent" />,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Get In Touch</h2>
          <p className="text-gray-600 mt-4">
            Have questions? We'd love to hear from you. Our team is ready to help.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="bg-blue-accent/10 p-3 rounded-lg">
                    {iconMap[info.icon]}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-semibold text-dark-blue-primary">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-dark-blue-primary mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark-blue-primary mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-accent"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-dark-blue-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-dark-blue-secondary transition shadow-md"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
