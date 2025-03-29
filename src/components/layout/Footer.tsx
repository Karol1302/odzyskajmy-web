
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foundation-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Odzyskajmy Foundation</h2>
            <p className="mb-4">
              We are dedicated to helping individuals at risk of social exclusion, 
              providing support, education, and opportunities for a better future.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foundation-orange transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foundation-orange transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foundation-orange transition-colors"
                aria-label="Visit our Twitter page"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-foundation-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foundation-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-foundation-orange transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foundation-orange transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+48123456789" className="hover:text-foundation-orange transition-colors">
                  +48 123 456 789
                </a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:contact@odzyskajmy.org" className="hover:text-foundation-orange transition-colors">
                  contact@odzyskajmy.org
                </a>
              </p>
            </div>
            <p className="mt-4 text-sm opacity-80">
              "Contact us, we will do everything to help you."
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>© {currentYear} Odzyskajmy Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
