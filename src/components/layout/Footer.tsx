import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foundation-brown text-white py-12">
      <div className="container-custom">
        {/* Zmieniamy na 3 kolumny */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Fundacja ODZYSKAJMY.PL</h2>
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
                <a 
                  href="tel:+48123456789" 
                  className="hover:text-foundation-green transition-colors"
                >
                  +48 505 239 465
                </a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a 
                  href="mailto:kontakt@odzyskajmy.pl" 
                  className="hover:text-foundation-green transition-colors"
                >
                  kontakt@odzyskajmy.pl
                </a>
              </p>
            </div>
          </div>

          {/* New column - "Wesprzyj nas" */}
          <div>
            <h2 className="text-xl font-bold mb-4">Wesprzyj nas</h2>
            <p className="mb-2">
              Każda darowizna pomaga nam rozwijać działalność i wspierać potrzebujących.
            </p>
            <Link to="/donate" className="inline-block mt-2 hover:underline font-semibold">
              Dowiedz się więcej
            </Link>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>© {currentYear} Fundacja ODZYSKAJMY.PL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;