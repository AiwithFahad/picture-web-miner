import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { RESTAURANT_INFO, FAQ_ITEMS } from '../data/restaurantData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!subject.trim()) errs.subject = 'Please provide a subject.';
    if (!message.trim()) errs.message = 'Please enter your message.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setServerError('Online messages are not connected yet. Your message has not been sent.');
  };

  return (
    <div className="w-full pt-24 bg-background min-h-screen">
      {/* Header */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-normal text-copper">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-normal text-foreground">
            We&apos;d Love to Hear From You.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Have questions about private dining, large party reservations, or menu offerings? Send us a note or call our team.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Business Details & Schedule (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-card rounded border border-foreground/[0.08] p-8 space-y-6 shadow-xl">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Restaurant Information
                </h2>

                <div className="space-y-6 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-normalr text-muted-foreground/70 block font-mono">
                        Location
                      </span>
                      <p className="text-foreground font-medium">{RESTAURANT_INFO.location.addressLine1}</p>
                      <p className="text-muted-foreground">{RESTAURANT_INFO.location.cityStateZip}</p>
                      <p className="text-[11px] text-primary/80 font-mono italic">
                        [{RESTAURANT_INFO.location.status}]
                      </p>
                      <div className="pt-2">
                        <a
                          href={RESTAURANT_INFO.location.directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-foreground transition-colors font-medium"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 pt-3 border-t border-foreground/[0.05]">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-normalr text-muted-foreground/70 block font-mono">
                        Telephone
                      </span>
                      <a
                        href={`tel:${RESTAURANT_INFO.contact.phoneRaw}`}
                        className="text-foreground hover:text-primary transition-colors font-mono tabular-nums font-medium"
                      >
                        {RESTAURANT_INFO.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 pt-3 border-t border-foreground/[0.05]">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-normalr text-muted-foreground/70 block font-mono">
                        Email
                      </span>
                      <a
                        href={`mailto:${RESTAURANT_INFO.contact.email}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {RESTAURANT_INFO.contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 pt-3 border-t border-foreground/[0.05]">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="w-full space-y-2">
                      <span className="text-xs uppercase tracking-normalr text-muted-foreground/70 block font-mono">
                        Operating Hours
                      </span>
                      <div className="space-y-1.5 text-xs">
                        {RESTAURANT_INFO.hours.schedule.map((slot, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-muted-foreground">{slot.days}</span>
                            <span className="text-foreground tabular-nums font-mono">{slot.times}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground/60 italic pt-1">
                        {RESTAURANT_INFO.hours.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-card rounded border border-foreground/[0.08] p-8 sm:p-10 shadow-xl space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Send a Message
                  </h2>
                  <p className="text-xs text-muted-foreground font-light mt-1">
                    Please provide your contact information and we will follow up as soon as possible.
                  </p>
                </div>

                {serverError && (
                  <div className="p-4 rounded bg-danger-surface border border-destructive/40 text-xs text-destructive flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <div>{serverError}</div>
                  </div>
                )}

                {submitSuccess && (
                  <div className="p-4 rounded bg-success-surface border border-success/40 text-xs text-success flex items-start gap-2.5 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <div>
                      Thank you! Your message has been received by our host desk. We will respond promptly.
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contactName" className="text-xs font-semibold uppercase tracking-normalr text-foreground">
                        Your Name *
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Thomas Cole"
                        className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-destructive focus:ring-destructive/50'
                            : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contactEmail" className="text-xs font-semibold uppercase tracking-normalr text-foreground">
                        Email Address *
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="thomas@example.com"
                        className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-destructive focus:ring-destructive/50'
                            : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="contactSubject" className="text-xs font-semibold uppercase tracking-normalr text-foreground">
                      Subject *
                    </label>
                    <input
                      id="contactSubject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
                      }}
                      placeholder="e.g. Private Dining Inquiry or Large Party Table"
                      className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 transition-all ${
                        errors.subject
                          ? 'border-destructive focus:ring-destructive/50'
                          : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-destructive mt-1">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contactMessage" className="text-xs font-semibold uppercase tracking-normalr text-foreground">
                      Message *
                    </label>
                    <textarea
                      id="contactMessage"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      placeholder="Tell us about your event, dietary inquiries, or dining questions..."
                      className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? 'border-destructive focus:ring-destructive/50'
                          : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button variant="restaurant" size="natural"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="py-20 bg-secondary border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-copper">
              <HelpCircle className="w-4 h-4" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-normal text-foreground">
              Guest Dining &amp; Reservations FAQ
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Clear information regarding party limits, cancellation terms, and operations.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-card rounded border border-foreground/[0.06] overflow-hidden transition-all"
                >
                  <Button variant="restaurant" size="natural"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-foreground/[0.04] bg-secondary/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
