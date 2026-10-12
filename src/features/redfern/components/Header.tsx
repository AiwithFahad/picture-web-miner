import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { PageRoute } from '../types';
import { Menu, X, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; path: PageRoute }[] = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About Us', path: '/about' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: PageRoute) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border py-3.5 shadow-xl'
            : 'bg-gradient-to-b from-background/80 via-background/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Restaurant Wordmark */}
          <Button variant="restaurant" size="natural"
            onClick={() => handleLinkClick('/')}
            className="text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-normal text-foreground group-hover:text-primary transition-colors whitespace-nowrap shrink-0">
              Redfern Table &amp; Grill
            </span>
          </Button>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <Button variant="restaurant" size="natural"
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 tracking-normal whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded ${
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-copper rounded-full" />
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <Button variant="restaurant" size="natural"
              onClick={() => handleLinkClick('/reservations')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-normalr font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all duration-200 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap shrink-0 active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book a Table
            </Button>

            {/* Mobile Hamburger Button */}
            <Button variant="restaurant" size="natural"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-background/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-secondary border-l border-border p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <span className="font-serif text-lg font-bold text-foreground">
                  Redfern
                </span>
                <Button variant="restaurant" size="natural"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="mt-8 flex flex-col gap-5 text-base">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.path;
                  return (
                    <Button variant="restaurant" size="natural"
                      key={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className={`text-left py-2 px-1 transition-colors ${
                        isActive
                          ? 'text-primary font-semibold border-l-2 border-copper pl-3'
                          : 'text-foreground/80 hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-border">
              <Button variant="restaurant" size="natural"
                onClick={() => handleLinkClick('/reservations')}
                className="w-full py-3 text-center text-xs uppercase tracking-normalr font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-colors"
              >
                Book a Table
              </Button>
              <p className="text-center text-xs text-muted-foreground/60 mt-4 font-light">
                Table &amp; Grill · American Hospitality
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
