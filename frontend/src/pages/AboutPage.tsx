import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">
              Bridging Custom Apparel with <span className="text-blue-accent">Smart Technology</span>
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              BrandForge Technologies is at the forefront of the printing industry, combining
              traditional craftsmanship with cutting-edge digital workflows. We provide
              high-quality textile printing, embroidery, and corporate branding backed by
              a robust online ordering and tracking system.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-accent">✓</span>
                <span className="text-gray-700">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-accent">✓</span>
                <span className="text-gray-700">Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-accent">✓</span>
                <span className="text-gray-700">Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-accent">✓</span>
                <span className="text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1544717305-996b815c338c?w=400&h=300&fit=crop"
                alt="Printing"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
                alt="Branding"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="https://images.unsplash.com/photo-1598623083058-f5b0e52d96f8?w=400&h=300&fit=crop"
                alt="Textile"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop"
                alt="Workflow"
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
