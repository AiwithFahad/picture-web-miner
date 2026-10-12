import { Button } from "@/components/ui/button";
import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PageRoute } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  const navLinks: { label: string; path: PageRoute }[] = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About Us', path: '/about' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-footer text-muted-foreground border-t border-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Wordmark & Brand Description */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-normal text-foreground">
              Redfern Table &amp; Grill
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground/90 font-light">
              Classic American comfort food and prime cuts straight from the grill. Built on hospitality, warmth, and the simple joy of gathering around a great meal.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-normalst text-copper font-semibold">
                American Grill Tradition
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-normalr text-foreground font-semibold">
              Explore Redfern
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Button variant="restaurant" size="natural"
                    onClick={() => navigate(link.path)}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-copper rounded py-0.5"
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours of Operation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-normalr text-foreground font-semibold">
              <Clock className="w-3.5 h-3.5 text-copper" />
              Operating Hours
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground/90 font-light">
              {RESTAURANT_INFO.hours.schedule.map((slot, index) => (
                <li key={index} className="flex justify-between gap-4 py-0.5 border-b border-foreground/[0.04]">
                  <span>{slot.days}</span>
                  <span className="text-foreground/80 tabular-nums">{slot.times}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted-foreground/60 italic">
              {RESTAURANT_INFO.hours.note}
            </p>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-normalr text-foreground font-semibold">
              Visit &amp; Inquiries
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground/90">{RESTAURANT_INFO.location.addressLine1}</p>
                  <p className="text-xs text-muted-foreground/80">{RESTAURANT_INFO.location.cityStateZip}</p>
                  <span className="text-[10px] text-primary/70 block mt-0.5">
                    ({RESTAURANT_INFO.location.status})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-copper shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                  className="hover:text-primary transition-colors text-xs tabular-nums"
                >
                  {RESTAURANT_INFO.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-copper shrink-0" />
                <a
                  href={`mailto:${RESTAURANT_INFO.contact.email}`}
                  className="hover:text-primary transition-colors text-xs"
                >
                  {RESTAURANT_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype & Verification Transparency Notice */}
        <div className="py-4 px-5 my-6 rounded bg-secondary border border-foreground/[0.05] text-xs text-muted-foreground/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary shrink-0" />
            <span>
              <strong>Development Environment Notice:</strong> Sample business details, proposed menu prices, and operating hours are prototypes awaiting final restaurant certification.
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground/60 shrink-0">
            Cancellation window: 2 hours prior
          </span>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Redfern Table &amp; Grill. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>American Comfort &amp; Hearth Cooking</span>
            <span>·</span>
            <span>Austin, Texas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
