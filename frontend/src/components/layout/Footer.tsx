import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useSimulatedAdmin } from '../../hooks/useSimulatedAdmin';
import { footerLinks } from '../../data';

const Footer: React.FC = () => {
  const { openAdminLogin } = useSimulatedAdmin();

  return (
    <footer className="bg-dark-blue-primary text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold">
              BrandForge<span className="text-blue-accent">Tech</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Automated e-commerce printing platform bridging custom apparel
              production with smart digital workflows.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-accent transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-accent transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-accent transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-accent transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}><Link to={link.href} className="hover:text-white transition">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}><Link to={link.href} className="hover:text-white transition">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href === '#' ? (
                    <button onClick={openAdminLogin} className="hover:text-white transition text-left">{link.label}</button>
                  ) : (
                    <Link to={link.href} className="hover:text-white transition">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} BrandForge Technologies. All rights reserved.
          <span className="mx-2">|</span>
          <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link to="#" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
