import React from 'react';
import { aboutFeatures, aboutImages } from '../data';

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
              {aboutFeatures.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2">
                  <span className="text-blue-accent">✓</span>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {aboutImages.slice(0, 2).map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg shadow-lg h-48 w-full object-cover"
                />
              ))}
            </div>
            <div className="space-y-4 mt-8">
              {aboutImages.slice(2, 4).map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg shadow-lg h-48 w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
