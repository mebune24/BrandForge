import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceData, type TabType } from '../data';
import { Printer, PenTool, BadgeCheck, Smartphone, Zap, BarChart3, Building2, Globe, Lock } from 'lucide-react';
import { SectionErrorBoundary } from '../components/error-boundary/SectionErrorBoundary';

const iconMap: Record<string, React.ReactNode> = {
  Printer: <Printer size={32} className="text-blue-accent" />,
  PenTool: <PenTool size={32} className="text-blue-accent" />,
  BadgeCheck: <BadgeCheck size={32} className="text-blue-accent" />,
  Smartphone: <Smartphone size={32} className="text-blue-accent" />,
  Zap: <Zap size={32} className="text-blue-accent" />,
  BarChart3: <BarChart3 size={32} className="text-blue-accent" />,
  Building2: <Building2 size={32} className="text-blue-accent" />,
  Globe: <Globe size={32} className="text-blue-accent" />,
  Lock: <Lock size={32} className="text-blue-accent" />,
};

const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('services');

  return (
    <SectionErrorBoundary sectionName="Services">
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Comprehensive Printing Solutions</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From custom apparel to corporate branding, we deliver quality and precision
              with smart digital workflows.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
              {Object.keys(serviceData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`px-6 py-2 rounded-md transition capitalize font-semibold ${
                    activeTab === tab
                      ? 'bg-dark-blue-primary text-white'
                      : 'text-dark-blue-primary bg-white hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {serviceData[activeTab].map((service, index) => (
                <div
                  key={`${activeTab}-${index}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-center mb-3">
                      {iconMap[service.icon] || service.icon}
                    </div>
                    <h3 className="text-dark-blue-primary text-lg font-semibold">{service.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/products" className="bg-blue-accent text-dark-blue-primary px-8 py-3 rounded-md font-semibold hover:bg-blue-400 transition shadow-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </SectionErrorBoundary>
  );
};

export default ServicesPage;
