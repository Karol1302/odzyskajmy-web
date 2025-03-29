import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import CookieSettingsButton from '@/components/CookieSettingsButton';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
      <ScrollToTopButton />
      <CookieSettingsButton />
    </div>
  );
};

export default PageLayout;
