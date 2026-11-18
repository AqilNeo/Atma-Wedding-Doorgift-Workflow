import { useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Info,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  BOTTLE_SIZES,
  CORE_SCENT_PYRAMIDS,
  CURATED_SUB_OPTIONS,
  DESIGNER_DECANT_EXAMPLES,
  PACKAGING_OPTIONS,
  type CoreScentNote,
} from '../data/catalog';
import {
  calculateQuoteEstimate,
  formatWhatsAppInquiry,
  type ConfiguratorState,
} from '../utils/quoteLogic';
import { SafeImage } from './SafeImage';
import { WhatsAppInquiryModal } from './WhatsAppInquiryModal';

interface DoorgiftConfiguratorProps {
  state: ConfiguratorState;
  onChange: (updater: (prev: ConfiguratorState) => ConfiguratorState) => void;
  onReset: () => void;
}

const CORE_NOTES: CoreScentNote[] = ['Floral', 'Woody', 'Citrus', 'Musky', 'Spicy'];

export function DoorgiftConfigurator({ state, onChange, onReset }: DoorgiftConfiguratorProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);

  const estimate = calculateQuoteEstimate(state);
  const selectedBottle = BOTTLE_SIZES.find((b) => b.id === state.bottleSize) ?? BOTTLE_SIZES[0];
  const selectedPackaging =
    PACKAGING_OPTIONS.find((p) => p.id === state.packagingStyle) ?? PACKAGING_OPTIONS[0];
  const selectedCuratedSub =
    CURATED_SUB_OPTIONS.find((c) => c.id === state.curatedSubType) ?? CURATED_SUB_OPTIONS[0];
  const activePyramid = CORE_SCENT_PYRAMIDS[state.bespokeCoreNote];
  const formattedWhatsApp = formatWhatsAppInquiry(state);

  const updateField = <K extends keyof ConfiguratorState>(key: K, value: ConfiguratorState[K]) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  const jumpToStep = (stepNumber: number, elementId: string) => {
    setActiveStep(stepNumber);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="configurator" className="py-16 sm:py-24 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Step Quick-Nav */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-[#1E1E1E]/10">
          <div>
            <p className="text-xs tracking-[0.14em] uppercase text-[#5C715E] font-semibold mb-2">
              Bespoke Doorgift Studio
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] font-medium text-[#1E1E1E] text-balance">
              Interactive Doorgift &amp; Quote Builder
            </h2>
            <p className="text-sm sm:text-base text-[#1E1E1E]/75 mt-2 max-w-2xl">
              Configure your event count, scent direction, glass atomizer volume, botanical
              stationery, and distribution style. Your estimate updates live on the right.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Configurator Steps"
            className="flex flex-wrap items-center gap-1.5 bg-[#F2EDE3] p-1.5 rounded-lg border border-[#1E1E1E]/10"
          >
            {[
              { step: 1, label: '01 Event', target: 'step-1' },
              { step: 2, label: '02 Scent', target: 'step-2' },
              { step: 3, label: '03 Bottle', target: 'step-3' },
              { step: 4, label: '04 Packaging', target: 'packaging-showcase' },
              { step: 5, label: '05 Service', target: 'step-5' },
            ].map((tab) => (
              <button
                key={tab.step}
                type="button"
                role="tab"
                aria-selected={activeStep === tab.step}
                onClick={() => jumpToStep(tab.step, tab.target)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeStep === tab.step
                    ? 'bg-white text-[#1E1E1E] shadow-xs'
                    : 'text-[#1E1E1E]/65 hover:text-[#1E1E1E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Configurator + Sticky Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 7 Columns: All 5 Interactive Steps */}
          <div className="lg:col-span-7 space-y-8">
            {/* STEP 1: Event Details & Budget */}
            <div
              id="step-1"
              onFocus={() => setActiveStep(1)}
              className="scroll-mt-24 bg-white border border-[#1E1E1E]/12 rounded-lg p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-[#1E1E1E]/10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C5A059]">
                    Step 01
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-[1.75rem] font-medium text-[#1E1E1E] mt-0.5">
                    Event Details &amp; Budget
                  </h3>
                </div>
                <span className="text-xs text-[#1E1E1E]/55">Customer Consultation</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="couple-names"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                  >
                    Couple Names
                  </label>
                  <input
                    id="couple-names"
                    type="text"
                    value={state.coupleNames}
                    onChange={(e) => updateField('coupleNames', e.target.value)}
                    placeholder="e.g., Den & Nisya"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wedding-date"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                  >
                    Wedding Date
                  </label>
                  <input
                    id="wedding-date"
                    type="date"
                    value={state.weddingDate}
                    onChange={(e) => updateField('weddingDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="venue-location"
                    className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                  >
                    Venue / Location
                  </label>
                  <input
                    id="venue-location"
                    type="text"
                    value={state.venueLocation}
                    onChange={(e) => updateField('venueLocation', e.target.value)}
                    placeholder="e.g., Glasshouse Seputeh, Kuala Lumpur"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] placeholder:text-[#1E1E1E]/40 focus:outline-none focus:border-[#5C715E] focus:ring-1 focus:ring-[#5C715E]"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <label
                      htmlFor="guest-count-input"
                      className="text-xs font-semibold text-[#1E1E1E]"
                    >
                      Estimated Guest Count
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="guest-count-input"
                        aria-label="Estimated Guest Count Number"
                        type="number"
                        min={20}
                        max={2000}
                        step={10}
                        value={state.guestCount}
                        onChange={(e) =>
                          updateField('guestCount', Math.max(20, Number(e.target.value) || 20))
                        }
                        className="w-24 px-2.5 py-1.5 text-sm font-semibold text-right tabular-nums bg-[#F9F6F0] border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] focus:outline-none focus:border-[#5C715E]"
                      />
                      <span className="text-xs text-[#1E1E1E]/65">guests</span>
                    </div>
                  </div>
                  <input
                    id="guest-count-slider"
                    aria-label="Estimated Guest Count Slider"
                    type="range"
                    min={20}
                    max={1000}
                    step={10}
                    value={Math.min(1000, state.guestCount)}
                    onChange={(e) => updateField('guestCount', Number(e.target.value))}
                    className="w-full atma-slider"
                  />
                  <div className="flex justify-between text-[11px] text-[#1E1E1E]/55 tabular-nums mt-1.5">
                    <span>20 intimate</span>
                    <span>150+ (5% off)</span>
                    <span>300+ (10% off)</span>
                    <span>500+ (15% off)</span>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <label
                        htmlFor="budget-per-guest"
                        className="block text-xs font-semibold text-[#1E1E1E]"
                      >
                        Target Budget per Guest (MYR)
                      </label>
                      <p className="text-xs text-[#1E1E1E]/60 mt-0.5">
                        Used to benchmark unit rates across bottle sizes and packaging.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-medium text-[#1E1E1E]/70">RM</span>
                      <input
                        id="budget-per-guest"
                        type="number"
                        min={10}
                        max={100}
                        value={state.budgetPerGuestMYR}
                        onChange={(e) =>
                          updateField(
                            'budgetPerGuestMYR',
                            Math.max(0, Number(e.target.value) || 0)
                          )
                        }
                        className="w-24 px-3 py-2 text-sm font-semibold tabular-nums bg-[#F9F6F0]/60 border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] focus:outline-none focus:border-[#5C715E]"
                      />
                      <span className="text-xs text-[#1E1E1E]/60">/ bottle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2: Fragrance Concept */}
            <div
              id="step-2"
              onClick={() => setActiveStep(2)}
              className="scroll-mt-24 bg-white border border-[#1E1E1E]/12 rounded-lg p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-[#1E1E1E]/10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C5A059]">
                    Step 02
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-[1.75rem] font-medium text-[#1E1E1E] mt-0.5">
                    Fragrance Concept
                  </h3>
                </div>
                <span className="text-xs text-[#1E1E1E]/55">Sample Approval Included</span>
              </div>

              {/* Primary Option A vs Option B */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  aria-pressed={state.fragranceConcept === 'designer_decant'}
                  onClick={() => updateField('fragranceConcept', 'designer_decant')}
                  className={`text-left p-5 rounded-lg border transition-all duration-150 cursor-pointer ${
                    state.fragranceConcept === 'designer_decant'
                      ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                      : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs uppercase tracking-[0.1em] font-semibold text-[#5C715E]">
                      Option A
                    </span>
                    {state.fragranceConcept === 'designer_decant' && (
                      <Check className="w-4 h-4 text-[#5C715E]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="font-editorial text-xl font-medium text-[#1E1E1E]">
                    Designer Decant Series
                  </p>
                  <p className="text-xs text-[#1E1E1E]/70 leading-relaxed mt-1.5">
                    Authentic designer or niche perfumes meticulously decanted into sealed ATMA
                    glass spray vials.
                  </p>
                </button>

                <button
                  type="button"
                  aria-pressed={state.fragranceConcept === 'atma_curated'}
                  onClick={() => updateField('fragranceConcept', 'atma_curated')}
                  className={`text-left p-5 rounded-lg border transition-all duration-150 cursor-pointer ${
                    state.fragranceConcept === 'atma_curated'
                      ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                      : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs uppercase tracking-[0.1em] font-semibold text-[#5C715E]">
                      Option B
                    </span>
                    {state.fragranceConcept === 'atma_curated' && (
                      <Check className="w-4 h-4 text-[#5C715E]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="font-editorial text-xl font-medium text-[#1E1E1E]">
                    ATMA Curated Series
                  </p>
                  <p className="text-xs text-[#1E1E1E]/70 leading-relaxed mt-1.5">
                    Three house tiers: Inspired Collection, Designer Ready-Custom, or custom
                    one-note co-creation.
                  </p>
                </button>
              </div>

              {/* Conditional Sub-panel for Option A: Designer Decant */}
              {state.fragranceConcept === 'designer_decant' && (
                <div className="bg-[#F9F6F0] border border-[#1E1E1E]/10 rounded-lg p-5 space-y-4">
                  <div>
                    <label
                      htmlFor="designer-brand-input"
                      className="block text-xs font-semibold text-[#1E1E1E] mb-1.5"
                    >
                      Preferred Designer or Niche Perfume Brand
                    </label>
                    <input
                      id="designer-brand-input"
                      type="text"
                      value={state.designerBrandPreference}
                      onChange={(e) => updateField('designerBrandPreference', e.target.value)}
                      placeholder="e.g., Jo Malone English Pear & Freesia, Diptyque..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#1E1E1E]/20 rounded-md text-[#1E1E1E] focus:outline-none focus:border-[#5C715E]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {DESIGNER_DECANT_EXAMPLES.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => updateField('designerBrandPreference', brand)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors cursor-pointer ${
                          state.designerBrandPreference === brand
                            ? 'bg-[#5C715E] text-[#F9F6F0] border-[#5C715E]'
                            : 'bg-white text-[#1E1E1E]/80 border-[#1E1E1E]/15 hover:border-[#1E1E1E]/40'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditional Sub-panel for Option B: ATMA Curated Series */}
              {state.fragranceConcept === 'atma_curated' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1E1E1E]/65 mb-3">
                      Select Curated Direction
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {CURATED_SUB_OPTIONS.map((sub) => {
                        const isSelected = state.curatedSubType === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => updateField('curatedSubType', sub.id)}
                            className={`text-left p-4 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                                : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] uppercase tracking-[0.08em] text-[#5C715E] font-semibold">
                                  {sub.tagline}
                                </span>
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-[#5C715E] shrink-0" />
                                )}
                              </div>
                              <p className="font-editorial text-lg font-medium text-[#1E1E1E] mt-1">
                                {sub.title}
                              </p>
                              <p className="text-xs text-[#1E1E1E]/70 leading-relaxed mt-1.5">
                                {sub.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bespoke Self-Custom: 1 Core Note Selection + ATMA Breakdown */}
                  {state.curatedSubType === 'bespoke_self_custom' && (
                    <div className="bg-[#F9F6F0] border border-[#1E1E1E]/12 rounded-lg p-5 space-y-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5C715E]">
                            Bespoke Scent Discovery
                          </p>
                          <p className="text-sm font-medium text-[#1E1E1E] mt-0.5">
                            Pick 1 favorite core note — ATMA breaks down the ideal blend:
                          </p>
                        </div>
                        <span className="text-xs text-[#1E1E1E]/60">
                          Includes consultation &amp; sign-off
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {CORE_NOTES.map((note) => {
                          const active = state.bespokeCoreNote === note;
                          return (
                            <button
                              key={note}
                              type="button"
                              aria-pressed={active}
                              onClick={() => updateField('bespokeCoreNote', note)}
                              className={`px-4 py-2 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                                active
                                  ? 'bg-[#5C715E] text-[#F9F6F0] border-[#5C715E]'
                                  : 'bg-white text-[#1E1E1E] border-[#1E1E1E]/20 hover:border-[#1E1E1E]/45'
                              }`}
                            >
                              {note}
                            </button>
                          );
                        })}
                      </div>

                      {/* ATMA Curated Note Breakdown */}
                      <div className="bg-white border border-[#1E1E1E]/10 rounded-md p-4 space-y-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2.5 border-b border-[#1E1E1E]/10">
                          <h4 className="font-editorial text-xl font-medium text-[#1E1E1E]">
                            {activePyramid.profileTitle}
                          </h4>
                          <span className="text-xs text-[#5C715E] font-medium">
                            Core Direction: {activePyramid.note}
                          </span>
                        </div>

                        <p className="text-xs text-[#1E1E1E]/75 leading-relaxed">
                          {activePyramid.moodDescription}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-[#1E1E1E]/55 font-semibold">
                              Top Notes
                            </p>
                            <p className="text-xs text-[#1E1E1E] mt-0.5">
                              {activePyramid.topNotes}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-[#1E1E1E]/55 font-semibold">
                              Heart Notes
                            </p>
                            <p className="text-xs text-[#1E1E1E] mt-0.5">
                              {activePyramid.heartNotes}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.1em] text-[#1E1E1E]/55 font-semibold">
                              Base Notes
                            </p>
                            <p className="text-xs text-[#1E1E1E] mt-0.5">
                              {activePyramid.baseNotes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* STEP 3: Bottle Size */}
            <div
              id="step-3"
              onClick={() => setActiveStep(3)}
              className="scroll-mt-24 bg-white border border-[#1E1E1E]/12 rounded-lg p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-[#1E1E1E]/10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C5A059]">
                    Step 03
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-[1.75rem] font-medium text-[#1E1E1E] mt-0.5">
                    Bottle Size
                  </h3>
                </div>
                <span className="text-xs text-[#1E1E1E]/55">Clear Glass Atomizers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BOTTLE_SIZES.map((bottle) => {
                  const isSelected = state.bottleSize === bottle.id;
                  return (
                    <button
                      key={bottle.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => updateField('bottleSize', bottle.id)}
                      className={`text-left p-5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                          : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 min-h-[20px]">
                          {bottle.recommended ? (
                            <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#5C715E]">
                              Most Popular · Recommended
                            </span>
                          ) : (
                            <span className="text-[11px] uppercase tracking-[0.08em] text-[#1E1E1E]/50">
                              Glass Spray
                            </span>
                          )}
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#5C715E] shrink-0" aria-hidden="true" />
                          )}
                        </div>

                        <p className="font-editorial text-3xl font-medium text-[#1E1E1E] tabular-nums">
                          {bottle.label}
                        </p>
                        <p className="text-sm font-medium text-[#1E1E1E] mt-0.5">
                          {bottle.subtitle}
                        </p>
                        <p className="text-xs text-[#1E1E1E]/65 mt-1">{bottle.dimensions}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#1E1E1E]/10 flex items-baseline justify-between">
                        <span className="text-xs text-[#1E1E1E]/65">{bottle.sprayCount}</span>
                        <span className="text-sm font-semibold text-[#1E1E1E] tabular-nums">
                          from RM {bottle.basePriceMYR}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Packaging & Stationery Style */}
            <div
              id="packaging-showcase"
              onClick={() => setActiveStep(4)}
              className="scroll-mt-24 bg-white border border-[#1E1E1E]/12 rounded-lg p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-[#1E1E1E]/10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C5A059]">
                    Step 04
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-[1.75rem] font-medium text-[#1E1E1E] mt-0.5">
                    Packaging &amp; Stationery Style
                  </h3>
                </div>
                <span className="text-xs text-[#1E1E1E]/55">Custom Couple Monogram</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {PACKAGING_OPTIONS.map((pkg, idx) => {
                  const isSelected = state.packagingStyle === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => updateField('packagingStyle', pkg.id)}
                      className={`group text-left rounded-lg border overflow-hidden transition-all duration-150 cursor-pointer flex flex-col ${
                        idx === 4 ? 'sm:col-span-2 sm:grid sm:grid-cols-12' : ''
                      } ${
                        isSelected
                          ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                          : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden bg-[#F2EDE3] ${
                          idx === 4
                            ? 'aspect-[4/5] sm:aspect-auto sm:col-span-5 sm:min-h-[220px]'
                            : 'aspect-[4/5] w-full'
                        }`}
                      >
                        <SafeImage
                          src={pkg.image}
                          alt={pkg.imageAlt}
                          fallbackTitle={pkg.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>

                      <div
                        className={`p-4 sm:p-5 flex flex-col justify-between flex-1 ${
                          idx === 4 ? 'sm:col-span-7' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-editorial text-xl font-medium text-[#1E1E1E]">
                              {pkg.name}
                            </p>
                            {isSelected && (
                              <Check
                                className="w-4 h-4 text-[#5C715E] shrink-0 mt-1"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <p className="text-xs text-[#1E1E1E]/70 leading-relaxed mt-1.5">
                            {pkg.shortDesc}
                          </p>
                        </div>

                        <div className="pt-3 mt-4 border-t border-[#1E1E1E]/10 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-[#5C715E] font-medium">
                            {pkg.bestFor}
                          </span>
                          <span className="text-xs font-semibold text-[#1E1E1E] tabular-nums shrink-0">
                            +RM {pkg.addOnMYR.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: Distribution Method */}
            <div
              id="step-5"
              onClick={() => setActiveStep(5)}
              className="scroll-mt-24 bg-white border border-[#1E1E1E]/12 rounded-lg p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-[#1E1E1E]/10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C5A059]">
                    Step 05
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-[1.75rem] font-medium text-[#1E1E1E] mt-0.5">
                    Distribution Method
                  </h3>
                </div>
                <span className="text-xs text-[#1E1E1E]/55">Guest Experience Flow</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  aria-pressed={state.distributionMethod === 'pre_packed'}
                  onClick={() => updateField('distributionMethod', 'pre_packed')}
                  className={`text-left p-5 rounded-lg border transition-all duration-150 cursor-pointer ${
                    state.distributionMethod === 'pre_packed'
                      ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                      : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#5C715E]">
                      Ready-to-Place Favors
                    </span>
                    {state.distributionMethod === 'pre_packed' && (
                      <Check className="w-4 h-4 text-[#5C715E]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="font-editorial text-xl font-medium text-[#1E1E1E]">
                    Pre-Packed Doorgifts
                  </p>
                  <p className="text-xs text-[#1E1E1E]/70 leading-relaxed mt-1.5">
                    Sealed, labeled, and assembled ahead of your ceremony for seamless table settings
                    or reception welcome hand-outs.
                  </p>
                </button>

                <button
                  type="button"
                  aria-pressed={state.distributionMethod === 'live_bar'}
                  onClick={() => updateField('distributionMethod', 'live_bar')}
                  className={`text-left p-5 rounded-lg border transition-all duration-150 cursor-pointer ${
                    state.distributionMethod === 'live_bar'
                      ? 'bg-[#F9F6F0] border-[#5C715E] ring-1 ring-[#5C715E]'
                      : 'bg-white border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs uppercase tracking-[0.08em] font-semibold text-[#C5A059]">
                      On-Site Dispenser Counter
                    </span>
                    {state.distributionMethod === 'live_bar' && (
                      <Check className="w-4 h-4 text-[#5C715E]" aria-hidden="true" />
                    )}
                  </div>
                  <p className="font-editorial text-xl font-medium text-[#1E1E1E]">
                    Live Bespoke Perfume Bar
                  </p>
                  <p className="text-xs text-[#1E1E1E]/70 leading-relaxed mt-1.5">
                    Our apothecary glass-column counter where guests choose a scent and watch it
                    freshly dispensed into their bottle.
                  </p>
                </button>
              </div>

              {/* Conditional Sub-option for Pre-Packed */}
              {state.distributionMethod === 'pre_packed' && (
                <div className="mt-5 bg-[#F9F6F0] border border-[#1E1E1E]/10 rounded-lg p-5">
                  <p className="text-xs font-semibold text-[#1E1E1E] mb-3">
                    Select Pre-Packed Handover &amp; Staffing Preference
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-pressed={state.prePackedHandler === 'wedding_organizer'}
                      onClick={() => updateField('prePackedHandler', 'wedding_organizer')}
                      className={`text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                        state.prePackedHandler === 'wedding_organizer'
                          ? 'bg-white border-[#5C715E] ring-1 ring-[#5C715E]'
                          : 'bg-white/60 border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#1E1E1E]">
                          Handled by Wedding Organizer
                        </span>
                        {state.prePackedHandler === 'wedding_organizer' && (
                          <Check className="w-4 h-4 text-[#5C715E]" />
                        )}
                      </div>
                      <p className="text-xs text-[#1E1E1E]/65 mt-1">
                        Delivered boxed &amp; ready for your planner or venue team (+RM 0).
                      </p>
                    </button>

                    <button
                      type="button"
                      aria-pressed={state.prePackedHandler === 'atma_staff'}
                      onClick={() => updateField('prePackedHandler', 'atma_staff')}
                      className={`text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                        state.prePackedHandler === 'atma_staff'
                          ? 'bg-white border-[#5C715E] ring-1 ring-[#5C715E]'
                          : 'bg-white/60 border-[#1E1E1E]/15 hover:border-[#1E1E1E]/35'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#1E1E1E]">
                          Staffed by ATMA
                        </span>
                        {state.prePackedHandler === 'atma_staff' && (
                          <Check className="w-4 h-4 text-[#5C715E]" />
                        )}
                      </div>
                      <p className="text-xs text-[#1E1E1E]/65 mt-1">
                        Dedicated ATMA attendants manage favor table display &amp; handover (+RM 350).
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Helpful Recommendation Note for Live Bespoke Perfume Bar */}
              {state.distributionMethod === 'live_bar' && (
                <div
                  role="note"
                  className="mt-5 bg-[#5C715E]/10 border border-[#5C715E]/30 rounded-lg p-4 flex items-start gap-3"
                >
                  <Info className="w-4 h-4 text-[#5C715E] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-xs sm:text-sm text-[#1E1E1E] leading-relaxed">
                    <span className="font-semibold text-[#5C715E]">
                      Recommended for intimate weddings
                    </span>{' '}
                    to ensure smooth guest flow without congestion; fully staffed and managed by
                    ATMA (+RM 950 bar setup &amp; 2 perfumers).
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Sticky Live Summary Card */}
          <aside
            id="live-summary"
            className="lg:col-span-5 lg:sticky lg:top-24 scroll-mt-24"
            aria-label="Live Doorgift Summary"
          >
            <div className="bg-white border border-[#1E1E1E]/15 rounded-lg overflow-hidden shadow-xs">
              {/* Summary Header with Packaging Thumbnail */}
              <div className="p-6 bg-[#F2EDE3]/70 border-b border-[#1E1E1E]/10 flex items-center gap-4">
                <div className="w-16 h-20 rounded overflow-hidden border border-[#1E1E1E]/12 bg-[#F9F6F0] shrink-0">
                  <SafeImage
                    src={selectedPackaging.image}
                    alt={selectedPackaging.imageAlt}
                    fallbackTitle={selectedPackaging.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#5C715E] font-semibold">
                    Live Specification
                  </p>
                  <h3 className="font-editorial text-2xl font-medium text-[#1E1E1E] truncate">
                    {state.coupleNames.trim() || 'Your Celebration'}
                  </h3>
                  <p className="text-xs text-[#1E1E1E]/70 truncate">
                    {state.weddingDate || 'Date TBC'} · {state.venueLocation.trim() || 'Venue TBC'}
                  </p>
                </div>
              </div>

              {/* Specification Rows */}
              <div className="p-6 space-y-4">
                <dl className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-[#1E1E1E]/8">
                    <dt className="text-[#1E1E1E]/65">Total Quantity</dt>
                    <dd
                      data-testid="summary-quantity"
                      className="font-semibold text-[#1E1E1E] tabular-nums text-right"
                    >
                      {state.guestCount} bottles
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-[#1E1E1E]/8">
                    <dt className="text-[#1E1E1E]/65">Fragrance Concept</dt>
                    <dd
                      data-testid="summary-fragrance"
                      className="font-medium text-[#1E1E1E] text-right max-w-[60%]"
                    >
                      {state.fragranceConcept === 'designer_decant' ? (
                        <>
                          Designer Decant
                          <span className="block text-xs text-[#1E1E1E]/60">
                            {state.designerBrandPreference || 'Custom selection'}
                          </span>
                        </>
                      ) : (
                        <>
                          {selectedCuratedSub.title}
                          {state.curatedSubType === 'bespoke_self_custom' && (
                            <span className="block text-xs text-[#5C715E]">
                              Core Note: {state.bespokeCoreNote}
                            </span>
                          )}
                        </>
                      )}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-[#1E1E1E]/8">
                    <dt className="text-[#1E1E1E]/65">Bottle Size</dt>
                    <dd
                      data-testid="summary-bottle"
                      className="font-medium text-[#1E1E1E] tabular-nums text-right"
                    >
                      {selectedBottle.label} · {selectedBottle.subtitle}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-[#1E1E1E]/8">
                    <dt className="text-[#1E1E1E]/65">Packaging</dt>
                    <dd
                      data-testid="summary-packaging"
                      className="font-medium text-[#1E1E1E] text-right"
                    >
                      {selectedPackaging.name}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-[#1E1E1E]/8">
                    <dt className="text-[#1E1E1E]/65">Distribution</dt>
                    <dd
                      data-testid="summary-distribution"
                      className="font-medium text-[#1E1E1E] text-right max-w-[60%]"
                    >
                      {state.distributionMethod === 'live_bar' ? (
                        'Live Bespoke Perfume Bar'
                      ) : (
                        <>
                          Pre-Packed Doorgifts
                          <span className="block text-xs text-[#1E1E1E]/60">
                            {state.prePackedHandler === 'atma_staff'
                              ? 'Staffed by ATMA'
                              : 'Handled by Wedding Organizer'}
                          </span>
                        </>
                      )}
                    </dd>
                  </div>
                </dl>

                {/* Pricing Breakdown */}
                <div className="bg-[#F9F6F0] rounded-lg p-4 space-y-2 border border-[#1E1E1E]/10">
                  <div className="flex items-center justify-between text-xs text-[#1E1E1E]/75">
                    <span>
                      Unit Rate
                      {estimate.discountPercent > 0 && ` (${estimate.discountPercent}% volume tier)`}
                    </span>
                    <span className="font-semibold text-[#1E1E1E] tabular-nums">
                      RM {estimate.unitPriceMYR.toFixed(2)} / bottle
                    </span>
                  </div>

                  {estimate.serviceFeeMYR > 0 && (
                    <div className="flex items-center justify-between text-xs text-[#1E1E1E]/75">
                      <span>
                        {state.distributionMethod === 'live_bar'
                          ? 'Live Bar Setup & 2 Perfumers'
                          : 'ATMA On-Site Handover Staff'}
                      </span>
                      <span className="font-semibold text-[#1E1E1E] tabular-nums">
                        RM {estimate.serviceFeeMYR.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#1E1E1E]/10 flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-[#1E1E1E]">Estimated Total</span>
                    <span
                      data-testid="summary-total"
                      className="font-editorial text-3xl font-semibold text-[#1E1E1E] tabular-nums"
                    >
                      RM {estimate.estimatedTotalMYR.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Budget Fit Feedback (Icon + Text, never hue-only) */}
                {state.budgetPerGuestMYR > 0 && (
                  <div
                    className={`flex items-center gap-2 text-xs px-3 py-2 rounded-md border ${
                      estimate.withinBudget
                        ? 'bg-[#5C715E]/10 border-[#5C715E]/25 text-[#1E1E1E]'
                        : 'bg-[#C5A059]/12 border-[#C5A059]/40 text-[#1E1E1E]'
                    }`}
                  >
                    {estimate.withinBudget ? (
                      <>
                        <CheckCircle2
                          className="w-4 h-4 text-[#5C715E] shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          Fits your RM {state.budgetPerGuestMYR}/guest target (est. RM{' '}
                          {estimate.unitPriceMYR.toFixed(2)}/bottle).
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle
                          className="w-4 h-4 text-[#9A7835] shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          RM {(estimate.unitPriceMYR - state.budgetPerGuestMYR).toFixed(2)}/bottle
                          above target — consider 5ml or higher volume tier.
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Primary Inquiry Action */}
                <div className="pt-1 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 text-sm font-semibold text-[#F9F6F0] bg-[#5C715E] hover:bg-[#475849] transition-colors rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C715E]"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Send Configuration via WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-xs text-[#1E1E1E]/60 pt-1">
                    <span>Complimentary sample sign-off before production</span>
                    <button
                      type="button"
                      onClick={onReset}
                      className="inline-flex items-center gap-1 text-[#1E1E1E]/70 hover:text-[#1E1E1E] underline-offset-2 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" aria-hidden="true" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Compact Mobile-Only Summary Bar (52px height, total sticky <= 14% of 844px viewport) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#1E1E1E] text-[#F9F6F0] border-t border-[#F9F6F0]/15 px-4 h-[52px] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-[#F9F6F0]/70 truncate">
            {state.guestCount} × {selectedBottle.label} · {selectedPackaging.name}
          </p>
          <p className="text-sm font-semibold tabular-nums leading-tight">
            Est. RM {estimate.estimatedTotalMYR.toLocaleString()}
          </p>
        </div>
        <button
          type="button"
          onClick={() => jumpToStep(5, 'live-summary')}
          className="px-3.5 py-1.5 text-xs font-semibold bg-[#5C715E] hover:bg-[#475849] text-[#F9F6F0] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
        >
          Review &amp; Send
        </button>
      </div>

      <WhatsAppInquiryModal
        isOpen={modalOpen}
        message={formattedWhatsApp}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
