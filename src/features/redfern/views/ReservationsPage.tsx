import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationRecord } from '../types';
import {
  Calendar,
  Clock,
  Users,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Headphones,
  Info,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  const { navigate } = useNavigation();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationRecord | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(false);

  // Calculate today's date formatted as YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Helper to format US phone number input nicely: (XXX) XXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = raw;
    if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }
    setPhone(formatted);
    if (errors['phone']) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors['fullName'] = 'Full name is required.';
    }

    const digits = phone.replace(/\D/g, '');
    if (!digits) {
      newErrors['phone'] = 'Telephone number is required.';
    } else if (digits.length !== 10) {
      newErrors['phone'] = 'Please provide a valid 10-digit US phone number.';
    }

    if (!date) {
      newErrors['date'] = 'Reservation date is required.';
    } else {
      const selected = new Date(date + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors['date'] = 'Reservation date cannot be in the past.';
      }
    }

    if (!time) {
      newErrors['time'] = 'Preferred dining time is required.';
    }

    const partySize = parseInt(guests, 10);
    if (isNaN(partySize) || partySize < 1) {
      newErrors['guests'] = 'Party size must be at least 1 guest.';
    } else if (partySize > 8) {
      newErrors['guests'] =
        'Online reservations accommodate up to 8 guests. For larger parties, please contact our team directly at (512) 555-0198.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setServerError('Online reservations are not connected yet. No reservation has been submitted.');
  };

  const timeOptions = [
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '18:30', label: '6:30 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '19:30', label: '7:30 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '20:30', label: '8:30 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '21:30', label: '9:30 PM' },
  ];

  const triggerVoiceAgent = () => { setShowVoiceModal(false); setServerError('The virtual receptionist is not connected yet.'); };

  return (
    <div className="w-full pt-24 bg-background min-h-screen">
      {/* Hero Header */}
      <section className="py-16 bg-secondary border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-normal text-copper">
            <Calendar className="w-3.5 h-3.5" />
            TABLE RESERVATIONS
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-normal text-foreground">
            Let&apos;s Save You a Seat.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Tell us a little about your visit, and we&apos;ll help arrange your table.
          </p>

          {/* Optional Voice Receptionist Action */}
          <div className="pt-2">
            <Button variant="restaurant" size="natural"
              onClick={() => setShowVoiceModal(true)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-normalr font-semibold text-primary hover:text-foreground px-4 py-2 bg-accent hover:bg-accent border border-copper/30 rounded transition-colors"
            >
              <Headphones className="w-4 h-4 text-copper" />
              <span>Talk to Our Virtual Receptionist</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Reservation Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Backend Connectivity Status banner */}
          {backendOnline === false && (
            <div className="mb-8 p-4 rounded bg-danger-surface border border-destructive/30 text-xs text-destructive flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <strong>Reservation System Offline:</strong> Online booking is not connected yet. No reservations can be submitted.
              </div>
            </div>
          )}

          {/* SUCCESS STATE */}
          {confirmedReservation ? (
            <div className="bg-card rounded border border-copper/40 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-success-surface border border-success/40 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-normal text-primary">
                  RESERVATION CONFIRMED
                </span>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Your Table is Reserved!
                </h2>
                <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
                  We look forward to welcoming you to Redfern Table &amp; Grill. A confirmation code has been generated below.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-input-surface p-6 rounded border border-foreground/[0.08] text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                <div className="flex justify-between pb-2 border-b border-foreground/[0.05]">
                  <span className="text-muted-foreground">Confirmation Code:</span>
                  <span className="text-primary font-bold">{confirmedReservation.confirmationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guest Name:</span>
                  <span className="text-foreground">{confirmedReservation.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="text-foreground">{confirmedReservation.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="text-foreground">{confirmedReservation.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Party Size:</span>
                  <span className="text-foreground">{confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground">{confirmedReservation.phone}</span>
                </div>
              </div>

              {/* Cancellation Policy reminder */}
              <div className="p-4 rounded bg-accent border border-copper/20 text-xs text-muted-foreground max-w-md mx-auto text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  <strong>Cancellation Policy:</strong> You may cancel or modify this reservation at no charge up to two hours prior to your scheduled time by calling (512) 555-0198.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Button variant="restaurant" size="natural"
                  onClick={() => {
                    setConfirmedReservation(null);
                    setFullName('');
                    setPhone('');
                    setSpecialRequests('');
                  }}
                  className="px-6 py-3 text-xs uppercase tracking-normalr font-semibold text-background bg-primary hover:bg-copper hover:text-foreground rounded-sm transition-colors"
                >
                  Book Another Table
                </Button>
                <Button variant="restaurant" size="natural"
                  onClick={() => navigate('/menu')}
                  className="px-6 py-3 text-xs uppercase tracking-normalr font-semibold text-foreground bg-accent hover:bg-accent border border-foreground/10 rounded-sm transition-colors"
                >
                  Browse Menu
                </Button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <div className="bg-card rounded border border-foreground/[0.08] p-8 sm:p-10 shadow-2xl space-y-8">
              {/* Form Intro */}
              <div className="space-y-2 border-b border-foreground/[0.06] pb-6">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Reservation Request
                </h2>
                <p className="text-xs text-muted-foreground font-light">
                  All five primary fields are required. Same-day and advance requests accepted.
                </p>
              </div>

              {/* Server Error Alert */}
              {serverError && (
                <div className="p-4 rounded bg-danger-surface border border-destructive/40 text-xs text-destructive flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>{serverError}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-normalr text-foreground flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-copper" />
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors['fullName']) setErrors((prev) => ({ ...prev, fullName: '' }));
                    }}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 transition-all ${
                      errors['fullName']
                        ? 'border-destructive focus:ring-destructive/50'
                        : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                    }`}
                  />
                  {errors['fullName'] && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors['fullName']}
                    </p>
                  )}
                </div>

                {/* 2. Phone Number (US Format) */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-normalr text-foreground flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-copper" />
                    Telephone (US Number) *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(512) 555-0123"
                    className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground placeholder-muted-foreground/40 font-mono focus:outline-none focus:ring-2 transition-all ${
                      errors['phone']
                        ? 'border-destructive focus:ring-destructive/50'
                        : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                    }`}
                  />
                  {errors['phone'] ? (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors['phone']}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground/60">
                      Contact number for your reservation request.
                    </p>
                  )}
                </div>

                {/* Date and Time row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* 3. Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="date" className="text-xs font-semibold uppercase tracking-normalr text-foreground flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-copper" />
                      Reservation Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      min={todayStr}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        if (errors['date']) setErrors((prev) => ({ ...prev, date: '' }));
                      }}
                      className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground font-mono focus:outline-none focus:ring-2 transition-all ${
                        errors['date']
                          ? 'border-destructive focus:ring-destructive/50'
                          : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                      }`}
                    />
                    {errors['date'] && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors['date']}
                      </p>
                    )}
                  </div>

                  {/* 4. Preferred Time */}
                  <div className="space-y-1.5">
                    <label htmlFor="time" className="text-xs font-semibold uppercase tracking-normalr text-foreground flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-copper" />
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      required
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        if (errors['time']) setErrors((prev) => ({ ...prev, time: '' }));
                      }}
                      className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground font-mono focus:outline-none focus:ring-2 transition-all ${
                        errors['time']
                          ? 'border-destructive focus:ring-destructive/50'
                          : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                      }`}
                    >
                      {timeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-card">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors['time'] && (
                      <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors['time']}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5. Guests (1-8 max standard) */}
                <div className="space-y-1.5">
                  <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-normalr text-foreground flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-copper" />
                    Number of Guests *
                  </label>
                  <select
                    id="guests"
                    required
                    value={guests}
                    onChange={(e) => {
                      setGuests(e.target.value);
                      if (errors['guests']) setErrors((prev) => ({ ...prev, guests: '' }));
                    }}
                    className={`w-full px-4 py-3 bg-input-surface border rounded text-sm text-foreground font-mono focus:outline-none focus:ring-2 transition-all ${
                      errors['guests']
                        ? 'border-destructive focus:ring-destructive/50'
                        : 'border-foreground/10 focus:border-copper focus:ring-copper/30'
                    }`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num} className="bg-card">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                    <option value="9" className="bg-card">
                      9+ Guests (Large Party / Direct Call)
                    </option>
                  </select>

                  {/* Over 8 Guests Warning */}
                  {parseInt(guests, 10) > 8 && (
                    <div className="p-3 mt-2 rounded bg-accent border border-copper/40 text-xs text-primary flex items-start gap-2">
                      <Info className="w-4 h-4 text-copper shrink-0 mt-0.5" />
                      <p>
                        For parties of 9 or more, our hosts coordinate custom table placement and dedicated service. Please call our host stand at{' '}
                        <a href="tel:+15125550198" className="underline font-semibold">
                          (512) 555-0198
                        </a>{' '}
                        or send a note via our Contact page.
                      </p>
                    </div>
                  )}

                  {errors['guests'] && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors['guests']}
                    </p>
                  )}
                </div>

                {/* Optional Special Requests */}
                <div className="space-y-1.5">
                  <label htmlFor="specialRequests" className="text-xs font-semibold uppercase tracking-normalr text-muted-foreground">
                    Special Dining Notes (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Seating preferences, anniversary or birthday notes, or dietary preferences..."
                    className="w-full px-4 py-3 bg-input-surface border border-foreground/10 rounded text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/30 transition-all resize-none"
                  />
                </div>

                {/* Cancellation Policy Disclosure */}
                <div className="p-4 rounded bg-input-surface border border-foreground/[0.05] text-xs text-muted-foreground space-y-1">
                  <span className="text-primary font-semibold block font-mono uppercase text-[10px] tracking-normalr">
                    Cancellation Policy
                  </span>
                  <p>
                    {RESTAURANT_INFO.cancellationPolicy}
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Button variant="restaurant" size="natural"
                    type="submit"
                    disabled={isSubmitting || parseInt(guests, 10) > 8}
                    className="w-full py-4 text-xs uppercase tracking-normalst font-semibold text-background bg-primary hover:bg-copper hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-sm transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Securing Table Reservation...
                      </span>
                    ) : (
                      'Confirm Table Reservation'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ElevenLabs Virtual Receptionist Modal */}
      {showVoiceModal && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowVoiceModal(false)}
        >
          <div
            className="bg-card border border-foreground/15 rounded-lg max-w-md w-full p-6 space-y-5 shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Virtual Voice Receptionist
                </h3>
              </div>
              <Button variant="restaurant" size="natural"
                onClick={() => setShowVoiceModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </Button>
            </div>

            <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
              <p>
                The virtual receptionist is not connected yet.
              </p>
              <div className="p-3 bg-input-surface rounded border border-foreground/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-success font-semibold text-[11px]">
                    Status: Not connected
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-mono">
                    
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground/80">
                  Speak directly with our virtual hostess using your microphone to check availability, ask about dietary options, or reserve a table hands-free.
                </p>
                <p className="text-[10px] text-primary/80 italic">
                  Note: Allow microphone permissions when prompted by your browser to enable live voice conversation.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <Button variant="restaurant" size="natural"
                onClick={() => setShowVoiceModal(false)}
                className="px-4 py-2 text-xs uppercase tracking-normalr font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </Button>
              <Button variant="restaurant" size="natural"
                onClick={triggerVoiceAgent}
                className="px-5 py-2.5 text-xs uppercase tracking-normalr font-semibold text-background bg-primary rounded-sm hover:bg-copper hover:text-foreground transition-colors shadow flex items-center gap-2"
              >
                <Headphones className="w-3.5 h-3.5" />
                Start Voice Conversation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
