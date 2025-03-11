
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
              <span className="font-medium text-lg">Accountly</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Modern accounting for modern businesses.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/tax-services" className="text-gray-600 hover:text-black transition-colors">Tax Services</Link></li>
              <li><Link to="/financial-advisory" className="text-gray-600 hover:text-black transition-colors">Financial Advisory</Link></li>
              <li><Link to="/services/accounting" className="text-gray-600 hover:text-black transition-colors">Accounting</Link></li>
              <li><Link to="/services/audit" className="text-gray-600 hover:text-black transition-colors">Audit Services</Link></li>
              <li><Link to="/services/compliance" className="text-gray-600 hover:text-black transition-colors">Compliance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-black transition-colors">Blog</Link></li>
              <li><Link to="/tools/tax-calculator" className="text-gray-600 hover:text-black transition-colors">Tax Calculator</Link></li>
              <li><Link to="/resources/guides" className="text-gray-600 hover:text-black transition-colors">Guides</Link></li>
              <li><Link to="/resources/webinars" className="text-gray-600 hover:text-black transition-colors">Webinars</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-500 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Accountly. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-black transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-black transition-colors text-sm">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-500 hover:text-black transition-colors text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
