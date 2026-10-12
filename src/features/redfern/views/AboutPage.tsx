import { Button } from "@/components/ui/button";
import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { FoodVisual } from '../components/FoodVisual';
import { Flame, Heart, Users, Sparkles, UtensilsCrossed } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="w-full pt-24 bg-background min-h-screen">
      {/* Hero Header */}
      <section className="relative py-24 bg-secondary border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <FoodVisual
            src="/images/restaurant_interior.svg"
            alt="Warm atmospheric restaurant dining room"
            category="interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/90 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-copper">
            <Heart className="w-3.5 h-3.5" />
            OUR STORY &amp; ETHOS
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-foreground leading-tight text-balance">
            More Than a Meal. A Place to Come Together.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Redfern Table &amp; Grill brings together the rustic power of the American hearth with heartfelt hospitality and timeless comfort.
          </p>
        </div>
      </section>

      {/* 1. Brand Introduction & 2. The Inspiration behind the American Grill */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-normal text-copper">
                THE INSPIRATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
                Inspired by the Enduring Spirit of the American Grill
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                <p>
                  Across America, the table has always been where life unfolds—birthdays celebrated over prime steaks, long-overdue catchups over burgers, and quiet weeknights transformed into comforting rituals.
                </p>
                <p>
                  Redfern Table &amp; Grill was created to celebrate this timeless culinary heritage. We take inspiration from the open hardwood fire, the patient craft of slow smoke, and the deep satisfaction of dishes prepared with honest ingredients and generous spirit.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-primary">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-copper" /> Hardwood Smoke
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-copper" /> Scratch Cooking
                </span>
              </div>
            </div>

            <div className="relative rounded overflow-hidden border border-foreground/[0.08] shadow-2xl">
              <FoodVisual
                src="/images/hero_steak.svg"
                alt="Hardwood flame grill cooking steaks and barbecue"
                category="steaks"
                title="Hearth & Timber Tradition"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Commitment to a Welcoming Atmosphere & 4. Appreciation for Classic Comfort Food */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative rounded overflow-hidden border border-foreground/[0.08] shadow-2xl">
              <FoodVisual
                src="/images/hero_bbq.svg"
                alt="Table gathering with handcrafted comfort dishes"
                category="bbq"
                title="Generous Hospitality"
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-normal text-copper">
                OUR COMMITMENT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
                Comfort Food, Elevated with Care and Warmth
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
                <p>
                  We believe great comfort food doesn’t need pretense or unnecessary complications. It requires deep respect for technique: knowing the exact moment a burger patty reaches its prime sear, letting smoked baby back ribs tenderize gently over hickory wood, and folding four distinct cheeses into freshly boiled macaroni.
                </p>
                <p>
                  Equal to the food is our commitment to warmth. From our host stand to the grill cooks, our team strives to make every visit feel like walking into a beloved neighborhood institution where you are genuinely welcomed.
                </p>
              </div>

              <div className="p-4 bg-card rounded border border-foreground/[0.05] text-xs text-muted-foreground space-y-1">
                <span className="text-primary font-semibold block uppercase tracking-normalr font-mono">
                  The Redfern Hospitality Standard
                </span>
                <p>
                  Attentive without being intrusive. Relaxed without compromising on detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Restaurant Atmosphere & Dining Philosophy */}
      <section className="py-24 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-normal text-copper">
              DINING PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
              Built for Date Nights, Family Feasts, and Everyday Celebrations
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              Our space balances dark charcoal and rich walnut wood tones with ambient copper pendant lighting, creating an inviting backdrop that feels right for any occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-card p-6 rounded border border-foreground/[0.06] space-y-3">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg font-bold text-foreground">Family Friendly</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Generous shared platters, kid-friendly favorites, and comfortable booth seating designed for all generations.
              </p>
            </div>

            <div className="bg-card p-6 rounded border border-foreground/[0.06] space-y-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg font-bold text-foreground">Intimate Evenings</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Cozy corner tables, curated craft beverages, and warm low lighting ideal for conversations that linger.
              </p>
            </div>

            <div className="bg-card p-6 rounded border border-foreground/[0.06] space-y-3">
              <Flame className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg font-bold text-foreground">Hardwood Craft</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                An open grill experience where the sounds, aromas, and energy of the hearth become part of the meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section: Come Dine With Us */}
      <section className="py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-normal text-copper">
            JOIN US AT THE TABLE
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-normal text-foreground">
            Come Dine With Us
          </h2>

          <p className="text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            We would be honored to host you for your next evening out. Book your table in advance and let us take care of the rest.
          </p>

          <div className="pt-2">
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/reservations')}
              className="px-9 py-4 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Come Dine With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
