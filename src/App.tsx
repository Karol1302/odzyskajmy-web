import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectSubscription from "./pages/ProjectSubscription";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CookieSettingsButton from "@/components/CookieSettingsButton";
// Nowa podstrona
import Donate from "./pages/Donate";

// ScrollToTop component to handle automatic scrolling when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const RemoveTrailingSlash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Obsługa tylko dla /projects i /projects/:id
    const projectsRegex = /^\/projects(\/\d+)?\/$/;
    if (projectsRegex.test(location.pathname)) {
      // Usuwa końcowy slash
      const newPath = location.pathname.slice(0, -1) + location.search + location.hash;
      navigate(newPath, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

const queryClient = new QueryClient();

const AppContent = () => (
  <><RemoveTrailingSlash />
    <ScrollToTop />
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/subscribe" element={<ProjectSubscription />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageLayout>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        basename={import.meta.env.BASE_URL}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppContent />
        <CookieSettingsButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;