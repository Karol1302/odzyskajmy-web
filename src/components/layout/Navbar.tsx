import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: isDarkMode ? "Tryb jasny włączony" : "Tryb ciemny włączony",
      description: "Twoje preferencje zostały zapisane",
    });
  };
  
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
    toast({
      title: isHighContrast ? "Kontrast standardowy" : "Tryb wysokiego kontrastu włączony",
      description: "Zaktualizowano ułatwienia dostępu.",
    });
  };

  // Zamykamy menu mobilne po nawigacji do innej podstrony
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Dodajemy nowy link "Wesprzyj nas" prowadzący do /donate
  const navLinks = [
    { title: 'Strona główna', path: '/' },
    { title: 'O nas', path: '/about' },
    { title: 'Projekty', path: '/projects' },
    { title: 'Kontakt', path: '/contact' },
    { title: 'Wesprzyj nas', path: '/donate' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center" 
            aria-label="Go to Odzyskajmy Foundation homepage"
          >
            <img 
              src={isDarkMode 
                ? import.meta.env.BASE_URL + 'Logo.png' 
                : import.meta.env.BASE_URL + 'Logo2.png'
              }
              alt="Odzyskajmy Foundation Logo" 
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-foundation-brown bg-foundation-light'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20'
                }`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
              title={isDarkMode ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
              className="hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleHighContrast}
              aria-label={isHighContrast 
                ? "Przełącz na standardowy kontrast" 
                : "Przełącz na wysoki kontrast"
              }
              title={isHighContrast 
                ? "Przełącz na standardowy kontrast" 
                : "Przełącz na wysoki kontrast"
              }
              className="hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Tryb jasny" : "Tryb ciemny"}
              className="hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              className="hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-foundation-brown bg-foundation-light'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.title}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-medium px-3 py-2 hover:bg-foundation-brown-light dark:hover:bg-foundation-brown-dark/20"
                onClick={toggleHighContrast}
              >
                <ZoomIn className="h-5 w-5 mr-2" />
                {isHighContrast ? "Standard Contrast" : "High Contrast Mode"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
