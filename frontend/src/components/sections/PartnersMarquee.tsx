import React from 'react';
import { partners } from '../../data';
import { useMarquee } from '../../hooks/useMarquee';

const PartnersMarquee: React.FC = () => {
  const { animationStyle, handleMouseEnter, handleMouseLeave } = useMarquee({
    speed: 30,
    direction: 'left',
    pauseOnHover: true,
  });

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Trusted by Industry Leaders</p>
        </div>
      </div>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex gap-6 animate-marquee whitespace-nowrap"
          style={animationStyle}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center h-24 min-w-[160px]"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
