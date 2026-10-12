import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { FULL_MENU_ITEMS, MENU_CATEGORIES } from '../data/restaurantData';
import { FoodVisual } from '../components/FoodVisual';
import { Flame, Calendar, Info } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { navigate } = useNavigation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = activeCategory === 'all'
    ? FULL_MENU_ITEMS
    : FULL_MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full pt-24 bg-background min-h-screen">
      {/* Header with Striking Culinary Theme */}
      <section className="relative py-20 bg-secondary border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <FoodVisual
            src="/images/hero_steak.svg"
            alt="Redfern grill fire and cast-iron kitchen"
            category="steaks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-copper">
            <Flame className="w-3.5 h-3.5" />
            REDFERN CULINARY
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-foreground">
            Something Delicious Awaits.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Explore a menu inspired by American grill classics and comforting favorites.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-primary/80 font-mono">
            <span>Hardwood Charcoal</span>
            <span>·</span>
            <span>House-Smoked Meats</span>
            <span>·</span>
            <span>From-Scratch Sides</span>
          </div>
        </div>
      </section>

      {/* Menu Categories / Filter Bar */}
      <section className="sticky top-[69px] z-30 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            <Button variant="restaurant" size="natural"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-normalr rounded transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-primary text-background shadow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              All Offerings ({FULL_MENU_ITEMS.length})
            </Button>

            {MENU_CATEGORIES.map((cat) => {
              const count = FULL_MENU_ITEMS.filter((i) => i.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <Button variant="restaurant" size="natural"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-normalr rounded transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-primary text-background shadow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {cat.label} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Concept Disclaimer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded bg-card border border-foreground/[0.05] flex items-start sm:items-center gap-3 text-xs text-muted-foreground">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong>Proposed Menu Concept:</strong> Dishes and proposed sample pricing listed below reflect the culinary development preview. Ingredients and final pricing will be certified prior to guest service.
          </p>
        </div>
      </div>

      {/* Menu Dishes Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded border border-foreground/[0.06] overflow-hidden hover:border-copper/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <FoodVisual
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      title={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 text-[10px] uppercase font-mono tracking-normalr px-2 py-0.5 bg-background/85 border border-foreground/10 rounded text-muted-foreground">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      {item.proposedPrice && (
                        <div className="text-right shrink-0">
                          <span className="text-sm font-mono text-primary tabular-nums font-semibold">
                            {item.proposedPrice}
                          </span>
                          <span className="block text-[9px] text-muted-foreground/60 uppercase font-mono">
                            Proposed
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground/90 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-foreground/[0.04] flex items-center justify-between text-[11px] text-muted-foreground/60">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-copper" />
                    Hardwood Prepared
                  </span>
                  <Button variant="restaurant" size="natural"
                    onClick={() => navigate('/reservations')}
                    className="text-primary hover:text-foreground transition-colors font-medium"
                  >
                    Reserve Table →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Reservation CTA */}
      <section className="py-20 bg-secondary border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-copper">
            <Calendar className="w-4 h-4" />
            EXPERIENCE OUR GRILL
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
            Ready to Taste the Redfern Difference?
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance and let our kitchen prepare an unforgettable meal for you and your guests.
          </p>

          <div className="pt-2">
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/reservations')}
              className="px-8 py-3.5 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Book a Table
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
