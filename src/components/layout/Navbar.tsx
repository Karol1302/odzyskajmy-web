
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
      title: isDarkMode ? "Light mode enabled" : "Dark mode enabled",
      description: "Your preference has been saved.",
    });
  };
  
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
    toast({
      title: isHighContrast ? "Standard contrast mode" : "High contrast mode enabled",
      description: "Accessibility setting updated.",
    });
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-foundation-brown"
            aria-label="Go to Odzyskajmy Foundation homepage"
          >
            <span className="hidden sm:inline">Odzyskajmy</span>
            <span>Foundation</span>
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
                    : 'text-gray-700 dark:text-gray-300 hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20'
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
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleHighContrast}
              aria-label={isHighContrast ? "Switch to standard contrast" : "Switch to high contrast mode"}
              title={isHighContrast ? "Switch to standard contrast" : "Switch to high contrast mode"}
              className="hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20"
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
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20"
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
                      : 'text-gray-700 dark:text-gray-300 hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.title}
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-medium px-3 py-2 hover:bg-foundation-green-light dark:hover:bg-foundation-green-dark/20"
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
