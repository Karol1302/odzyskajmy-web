
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/ui/animations/FadeIn";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-foundation-light dark:bg-gray-800">
      <div className="text-center px-4">
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-bold text-foundation-purple mb-4">404</h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            Oops! Page not found
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button size="lg" className="animate-pulse">
              Return to Home
            </Button>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
};

export default NotFound;
