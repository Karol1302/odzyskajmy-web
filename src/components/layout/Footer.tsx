
import { Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foundation-brown text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Fundacja Odzyskajmy</h2>
            <p className="mb-4">
              Zapewniamy wsparcie, edukację i szanse na lepszą przyszłość
            </p>
          </div>
          
          {/* Contact information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Kontakt</h2>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+48123456789" className="hover:text-foundation-green transition-colors">
                  +48 123 456 789
                </a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:contact@odzyskajmy.org" className="hover:text-foundation-green transition-colors">
                  kontakt@odzyskajmy.pl
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {currentYear} Fundacja Odzyskajmy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
