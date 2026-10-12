import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigation } from '../context/NavigationContext';
import {
  HERO_SLIDES,
  BRAND_VALUES,
  SIGNATURE_HIGHLIGHTS,
  EXPERIENCE_FEATURES,
  GUEST_FAVORITES,
  RESTAURANT_INFO,
} from '../data/restaurantData';
import { FoodVisual } from '../components/FoodVisual';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Utensils,
  Wine,
  Users,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useNavigation();

  // --- SECTION 1: Carousel State & Touch Controls ---
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay every 5.5 seconds, pause on hover
  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        nextSlide();
      } else if (distance < -50) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <div className="w-full">
      {/* ============================================================
          SECTION 1: Hero Carousel — Exactly Three Slides
          ============================================================ */}
      <section
        aria-label="Featured Dining Highlights"
        className="restaurant-hero relative w-full bg-background overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide Layers */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          const categoryMap: Record<number, 'burgers' | 'steaks' | 'bbq'> = {
            0: 'burgers',
            1: 'steaks',
            2: 'bbq',
          };

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Visual Background with culinary atmosphere */}
              <FoodVisual
                priority={idx === 0}
                src={slide.image}
                alt={slide.imageAlt}
                category={categoryMap[idx]}
                title={slide.headline}
                className="w-full h-full scale-100 transition-transform duration-[6000ms] ease-out object-cover"
              />

              {/* Scrim Overlay for WCAG AA readability */}
              <div className="absolute inset-0 hero-scrim" />
              

              {/* Content Overlay */}
              <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-left pt-16">
                <div className="max-w-2xl space-y-6">
                  {/* Clean unboxed eyebrow metadata */}
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-primary">
                    <Flame className="w-3.5 h-3.5 text-copper" />
                    <span>{slide.eyebrow}</span>
                    <span aria-hidden="true" className="text-muted-foreground/40">·</span>
                    <span className="text-muted-foreground">Redfern Grill</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-foreground leading-[1.1] text-balance">
                    Redfern Table &amp; Grill
                  </h1>

                  <p className="text-base sm:text-lg text-foreground/85 font-light leading-relaxed max-w-xl text-balance">
                    {slide.headline} {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button variant="restaurant" size="natural"
                      onClick={() => navigate(slide.primaryCtaLink)}
                      className="px-7 py-3.5 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap active:scale-[0.98]"
                    >
                      {slide.primaryCtaText}
                    </Button>
                    <Button variant="restaurant" size="natural"
                      onClick={() => navigate(slide.secondaryCtaLink)}
                      className="px-7 py-3.5 text-xs uppercase tracking-normalst font-semibold text-foreground bg-card/80 hover:bg-border border border-foreground/15 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper whitespace-nowrap active:scale-[0.98]"
                    >
                      {slide.secondaryCtaText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Arrow Controls */}
        <div className="absolute z-30 inset-x-0 bottom-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none">
          {/* Slide Indicators */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {HERO_SLIDES.map((_, i) => (
              <Button variant="restaurant" size="natural"
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  i === currentSlideIndex
                    ? 'w-10 h-1.5 bg-primary rounded-full'
                    : 'w-2.5 h-1.5 bg-foreground/30 hover:bg-foreground/60 rounded-full'
                }`}
              />
            ))}
          </div>

          {/* Left/Right Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <Button variant="restaurant" size="natural"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-3 text-foreground bg-secondary/70 hover:bg-border border border-foreground/10 rounded-sm backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="restaurant" size="natural"
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-3 text-foreground bg-secondary/70 hover:bg-border border border-foreground/10 rounded-sm backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: Welcome to Redfern
          ============================================================ */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Column 1: Restaurant Interior Visual */}
            <div className="relative rounded-lg overflow-hidden border border-foreground/[0.08] shadow-2xl group">
              <FoodVisual
                src="/images/restaurant_interior.svg"
                alt="Welcoming dining room interior of Redfern Table & Grill with warm ambient lighting"
                category="interior"
                title="Warm Welcoming Hospitality"
                className="w-full h-[440px] object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/85 backdrop-blur-md rounded border border-foreground/10 text-xs text-muted-foreground flex items-center justify-between">
                <span>Hardwood Timber &amp; Copper Ambience</span>
                <span className="text-primary font-medium uppercase tracking-normalr">
                  Austin, Texas
                </span>
              </div>
            </div>

            {/* Column 2: Brand Introduction & 3 Values */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-normal text-copper">
                  WELCOME TO REDFERN
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground leading-tight text-balance">
                  A Little More Flavor. A Lot More Togetherness.
                </h2>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed font-light">
                Redfern Table &amp; Grill was conceived around an uncomplicated American truth: the best meals happen when great food meets good people. We pair the rustic traditions of hardwood flame cooking with classic comfort food in a relaxed, thoughtfully crafted atmosphere.
              </p>

              {/* Three Brand Values */}
              <div className="space-y-5 pt-2">
                {BRAND_VALUES.map((val, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent border border-copper/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-mono text-primary">{`0${index + 1}`}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        {val.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button variant="restaurant" size="natural"
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-normalst font-semibold text-foreground bg-accent hover:bg-accent border border-foreground/15 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: Signature Menu Highlights
          ============================================================ */}
      <section className="py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-normal text-copper">
                FROM OUR GRILL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
                Cravings Worth Coming Back For.
              </h2>
            </div>
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/menu')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-normalst font-semibold text-primary hover:text-foreground transition-colors py-1 group shrink-0"
            >
              <span>Explore the Full Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* 4 Responsive Food Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SIGNATURE_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded border border-foreground/[0.06] overflow-hidden flex flex-col justify-between group hover:border-copper/40 transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <FoodVisual
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      title={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 text-[10px] uppercase font-mono tracking-normalr px-2 py-0.5 bg-background/80 border border-foreground/10 rounded text-muted-foreground">
                      {item.dietary?.[0] || 'Menu Highlight'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground/70 tabular-nums">
                        {item.proposedPrice}*
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/85 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-foreground/[0.04] flex items-center justify-between text-[11px] text-muted-foreground/60">
                  <span>*Proposed concept</span>
                  <Button variant="restaurant" size="natural"
                    onClick={() => navigate('/menu')}
                    className="text-primary hover:underline"
                  >
                    View details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground/60 max-w-xl mx-auto italic">
              Proposed menu highlights are conceptual selections crafted for development preview. Final pricing and seasonal availability will be confirmed upon grand opening.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: The Redfern Experience
          ============================================================ */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-normal text-copper">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
              The Redfern Experience
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Crafted around generous hospitality, hardwood embers, and time well spent together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCE_FEATURES.map((feat, idx) => {
              const icons = [
                <Flame key={1} className="w-6 h-6 text-primary" />,
                <Users key={2} className="w-6 h-6 text-primary" />,
                <Wine key={3} className="w-6 h-6 text-primary" />,
              ];

              return (
                <div
                  key={feat.id}
                  className="bg-card p-8 rounded border border-foreground/[0.06] hover:border-foreground/[0.15] transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-background border border-copper/30 flex items-center justify-center">
                      {icons[idx]}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-primary/90 font-medium leading-relaxed">
                      {feat.description}
                    </p>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                      {feat.detail}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-foreground/[0.04] text-[11px] text-muted-foreground/60 uppercase tracking-normalst font-mono">
                    0{idx + 1} // Redfern Standard
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: Guest Favorites
          ============================================================ */}
      <section className="py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-normal text-copper">
              A TASTE TO REMEMBER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
              Made for Your Next Favorite Meal.
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Guest-inspired plates designed with generous heart and wood-grilled perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUEST_FAVORITES.map((dish) => (
              <div
                key={dish.id}
                className="group bg-card rounded border border-foreground/[0.06] overflow-hidden hover:border-copper/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <FoodVisual
                      src={dish.image}
                      alt={dish.name}
                      category={dish.category}
                      title={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 text-[10px] uppercase font-mono tracking-normalr px-2 py-1 bg-background/85 border border-foreground/10 rounded text-primary">
                      {dish.dietary?.[0] || 'Specialty'}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {dish.name}
                      </h3>
                      <span className="text-sm font-mono text-muted-foreground tabular-nums">
                        {dish.proposedPrice}*
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/85 leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button variant="restaurant" size="natural"
                    onClick={() => navigate('/menu')}
                    className="w-full py-2.5 text-xs uppercase tracking-normalr font-semibold text-foreground bg-border hover:bg-accent border border-foreground/10 rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View in Menu</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/menu')}
              className="px-8 py-3.5 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Explore All Dishes
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: Reservations Call to Action
          ============================================================ */}
      <section className="relative py-28 bg-secondary overflow-hidden border-b border-border">
        {/* Background Visual Texture */}
        <div className="absolute inset-0 z-0 opacity-20">
          <FoodVisual
            src="/images/hero_steak.svg"
            alt="Warm ambient dining atmosphere at Redfern Table & Grill"
            category="interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background/90 to-background/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-primary">
            <Calendar className="w-4 h-4 text-copper" />
            YOUR TABLE AWAITS
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-normal text-foreground leading-tight text-balance">
            Good Food Is Better Together.
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Planning a casual dinner or a get-together with friends? Make your next visit part of the plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/reservations')}
              className="px-8 py-4 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap active:scale-[0.98]"
            >
              Reserve a Table
            </Button>
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/contact')}
              className="px-8 py-4 text-xs uppercase tracking-normalst font-semibold text-foreground bg-accent hover:bg-accent border border-foreground/20 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper whitespace-nowrap active:scale-[0.98]"
            >
              Contact Us
            </Button>
          </div>

          <div className="pt-6 text-xs text-muted-foreground/60 flex items-center justify-center gap-4">
            <span>Standard reservations up to 8 guests</span>
            <span>·</span>
            <span>2-hour cancellation notice</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: Location, Hours, and Final CTA
          ============================================================ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-normal text-copper">
              JOIN US IN PERSON
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
              Visit Redfern Table &amp; Grill
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              We look forward to welcoming you to our hearth and table.
            </p>
          </div>

          {/* Three Information Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Block 1: Visit Us */}
            <div className="bg-card p-8 rounded border border-foreground/[0.06] space-y-4">
              <div className="w-10 h-10 rounded bg-background border border-copper/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Visit Us
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="text-foreground font-medium">{RESTAURANT_INFO.location.addressLine1}</p>
                <p>{RESTAURANT_INFO.location.cityStateZip}</p>
                <p className="text-xs text-primary/80 pt-1 font-mono">
                  [{RESTAURANT_INFO.location.status}]
                </p>
              </div>
              <div className="pt-3">
                <a
                  href={RESTAURANT_INFO.location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-normalr font-semibold text-primary hover:text-foreground transition-colors"
                >
                  <span>Get Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Block 2: Opening Hours */}
            <div className="bg-card p-8 rounded border border-foreground/[0.06] space-y-4">
              <div className="w-10 h-10 rounded bg-background border border-copper/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Opening Hours
              </h3>
              <div className="space-y-2 text-xs">
                {RESTAURANT_INFO.hours.schedule.map((slot, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-foreground/[0.04]">
                    <span className="text-muted-foreground">{slot.days}</span>
                    <span className="text-foreground tabular-nums font-mono">{slot.times}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/60 pt-1 italic">
                {RESTAURANT_INFO.hours.note}
              </p>
            </div>

            {/* Block 3: Get in Touch */}
            <div className="bg-card p-8 rounded border border-foreground/[0.06] space-y-4">
              <div className="w-10 h-10 rounded bg-background border border-copper/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Get in Touch
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <span className="text-xs uppercase text-muted-foreground/60 block font-mono">Telephone</span>
                  <a
                    href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                    className="text-foreground hover:text-primary transition-colors tabular-nums font-mono text-sm"
                  >
                    {RESTAURANT_INFO.contact.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs uppercase text-muted-foreground/60 block font-mono">Email</span>
                  <a
                    href={`mailto:${RESTAURANT_INFO.contact.email}`}
                    className="text-foreground hover:text-primary transition-colors text-xs"
                  >
                    {RESTAURANT_INFO.contact.email}
                  </a>
                </div>
                <p className="text-[11px] text-muted-foreground/60 pt-1 italic">
                  {RESTAURANT_INFO.contact.note}
                </p>
              </div>
            </div>
          </div>

          {/* Final Homepage CTA */}
          <div className="text-center pt-6">
            <Button variant="restaurant" size="natural"
              onClick={() => navigate('/contact')}
              className="px-9 py-4 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Plan Your Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
