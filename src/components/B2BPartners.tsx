import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { B2B_BENEFITS } from '../data/catalog';
import { validateB2BForm, type B2BFormInput } from '../utils/quoteLogic';

const INITIAL_FORM: B2BFormInput = {
  contactName: '',
  companyName: '',
  email: '',
  whatsappNumber: '',
  monthlyEvents: '3–5 weddings / month',
  notes: '',
};

export function B2BPartners() {
  const [form, setForm] = useState<B2BFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof B2BFormInput, string>>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateB2BForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const code = `ATMA-B2B-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(code);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmittedRef(null);
  };

  return (
    <section id="b2b-partners" className="py-16 sm:py-24 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: B2B Value Proposition & 3 Partner Benefits */}
          <div className="lg:col-span-6">
            <p className="text-xs tracking-[0.14em] uppercase text-[#5C715E] font-semibold mb-3">
              For Wedding Planners & Venues
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] font-medium text-[#1E1E1E] text-balance mb-4">
              B2B Partner Collaboration
            </h2>
            <p className="text-base text-[#1E1E1E]/75 leading-relaxed mb-10 max-w-xl">
              Partner with <span className="font-editorial italic text-lg text-[#1E1E1E]">atma°</span>{' '}
              to offer your bridal couples signature fragrance favors and a curated sensory bar with
              preferential trade margins and zero logistical friction.
            </p>

            <div className="space-y-6">
              {B2B_BENEFITS.map((benefit) => (
                <div
                  key={benefit.index}
                  className="bg-[#F2EDE3]/70 border border-[#1E1E1E]/10 rounded-lg p-5 sm:p-6"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-editorial text-2xl font-medium text-[#1E1E1E]">
                      {benefit.index}. {benefit.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#1E1E1E]/75 leading-relaxed mb-3">
                    {benefit.description}
                  </p>
                  <p className="text-xs font-medium text-[#5C715E] tracking-wide">
                    {benefit.metric}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Request B2B Rate Card & Sample Kit Form */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#1E1E1E]/12 rounded-lg p-6 sm:p-8">
              <div className="pb-5 mb-6 border-b border-[#1E1E1E]/10">
                <p className="text-xs uppercase tracking-[0.12em] text-[#C5A059] font-semibold mb-1.5">
                  Trade & Venue Program
                </p>
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1E]">
                  Request B2B Rate Card & Sample Kit
                </h3>
                <p className="text-sm text-[#1E1E1E]/70 mt-1.5">
                  Receive our 2026 wholesale tier sheet and a complimentary 5-vial scent discovery
                  box shipped to your studio.
                </p>
              </div>

              {submittedRef ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-8 px-4 text-center space-y-4 bg-[#F9F6F0] rounded-lg border border-[#5C715E]/25"
                >
                  <CheckCircle2
                    className="w-10 h-10 text-[#5C715E] mx-auto"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-[#5C715E] font-semibold">
                      Request Logged · {submittedRef}
                    </p>
                    <h4 className="font-editorial text-2xl text-[#1E1E1E] mt-1">
                      Thank you, {form.contactName}
                    </h4>
                    <p className="text-sm text-[#1E1E1E]/75 mt-2 max-w-md mx-auto leading-relaxed">
                      Our trade partnerships lead will send the B2B Rate Card to{' '}
                      <span className="font-medium text-[#1E1E1E]">{form.email}</span> and confirm
                      shipping for <span className="font-medium text-[#1E1E1E]">{form.companyName}</span>
                      &apos;s sample kit via WhatsApp.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-[#1E1E1E] border border-[#1E1E1E]/20 hover:bg-[#F2EDE3] rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Partner Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-contact-name"
                        className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="b2b-contact-name"
                        type="text"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        placeholder="e.g., Farah Nadia"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                      />
                      {errors.contactName && (
                        <p className="text-xs text-red-700 mt-1" role="alert">
                          {errors.contactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="b2b-company-name"
                        className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                      >
                        Studio / Venue Name *
                      </label>
                      <input
                        id="b2b-company-name"
                        type="text"
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        placeholder="e.g., Atelier Weddings KL"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                      />
                      {errors.companyName && (
                        <p className="text-xs text-red-700 mt-1" role="alert">
                          {errors.companyName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="b2b-email"
                        className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="b2b-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="studio@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-700 mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="b2b-whatsapp"
                        className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                      >
                        WhatsApp / Contact Number *
                      </label>
                      <input
                        id="b2b-whatsapp"
                        type="tel"
                        value={form.whatsappNumber}
                        onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                        placeholder="+60 12 345 6789"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                      />
                      {errors.whatsappNumber && (
                        <p className="text-xs text-red-700 mt-1" role="alert">
                          {errors.whatsappNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="b2b-volume"
                      className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                    >
                      Average Wedding Volume
                    </label>
                    <select
                      id="b2b-volume"
                      value={form.monthlyEvents}
                      onChange={(e) => setForm({ ...form, monthlyEvents: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                    >
                      <option value="1–2 weddings / month">1–2 weddings / month</option>
                      <option value="3–5 weddings / month">3–5 weddings / month</option>
                      <option value="6+ weddings / month">6+ weddings / month</option>
                      <option value="Venue Exclusive / Hotel">Venue Exclusive / Hotel</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="b2b-notes"
                      className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                    >
                      Preferred Sample Kit Focus or Upcoming Event Dates
                    </label>
                    <textarea
                      id="b2b-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Share your typical guest counts, preferred bottle sizes (5ml–20ml), or delivery address for the sample kit..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-[#F9F6F0] bg-[#5C715E] hover:bg-[#475849] transition-colors rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C715E]"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Request B2B Rate Card & Sample Kit</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
