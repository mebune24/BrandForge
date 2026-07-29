import React from 'react';
import { teamMembers } from '../data';

const TeamPage: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-accent font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-4xl font-bold text-dark-blue-primary mt-2">Meet the Experts</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Passionate professionals dedicated to delivering excellence in every project.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden text-center">
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-dark-blue-primary text-xl font-bold">{member.name}</h3>
                <p className="text-blue-accent font-semibold text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
