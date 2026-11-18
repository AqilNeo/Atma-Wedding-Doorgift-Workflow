import { Clock, Maximize2, Sparkles, Users } from 'lucide-react';
import { LAB_CRAFT_IMAGE, LIVE_BAR_IMAGE } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface LivePerfumeBarProps {
  onSelectLiveBarInBuilder: () => void;
}

const GUEST_STEPS = [
  {
    step: '01',
    title: 'Choose Your Scent',
    description:
      'Guests browse 12 apothecary glass scent columns featuring the couple’s signature curation, testing blotter strips with our scent ambassadors.',
  },
  {
    step: '02',
    title: 'Select Your Bottle',
    description:
      'Guests pick their allocated 5ml, 10ml, or 20ml crystal-clear glass atomizer alongside a personalized wedding wish card.',
  },
  {
    step: '03',
    title: 'Freshly Dispensed For You',
    description:
      'Our uniformed perfumer freshly dispenses the chosen fragrance straight from the glass column, seals the atomizer, and presents it at the bar.',
  },
];

const PLANNER_SPECS = [
  {
    icon: Maximize2,
    label: 'Venue Footprint',
    value: '2.4m × 1.5m space',
    detail: 'Fits indoor foyers & garden pavilions',
  },
  {
    icon: Clock,
    label: 'Load-In & Setup',
    value: '90 minutes prior',
    detail: 'Zero power outlet required',
  },
  {
    icon: Users,
    label: 'Ideal Guest Flow',
    value: '80–250 guests',
    detail: 'Recommended for intimate receptions',
  },
  {
    icon: Sparkles,
    label: 'On-Site Staffing',
    value: '2 ATMA Perfumers',
    detail: 'Full dispensing & crowd engagement',
  },
];

export function LivePerfumeBar({ onSelectLiveBarInBuilder }: LivePerfumeBarProps) {
  return (
    <section
      id="perfume-bar"
      className="scroll-mt-20 py-14 sm:py-24 bg-[#F2EDE3]/70 border-y border-[#1E1E1E]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Visual Column */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="relative rounded-lg overflow-hidden border border-[#1E1E1E]/12 bg-[#F9F6F0] aspect-[4/3] lg:aspect-auto lg:flex-1 min-h-[340px]">
              <SafeImage
                src={LIVE_BAR_IMAGE}
                alt="ATMA Apothecary Live Perfume Bar featuring 12 glass scent dispenser columns and custom couple signage"
                fallbackTitle="ATMA Live Perfume Bar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary Lab Craft Detail Strip */}
            <div className="flex items-center gap-3.5 sm:grid sm:grid-cols-12 sm:gap-4 bg-[#F9F6F0] border border-[#1E1E1E]/10 rounded-lg p-3.5 sm:p-4">
              <div className="w-24 h-24 sm:w-full sm:h-auto sm:aspect-[4/3] sm:col-span-4 shrink-0 rounded overflow-hidden bg-[#F2EDE3]">
                <SafeImage
                  src={LAB_CRAFT_IMAGE}
                  alt="ATMA perfumer compounding botanical fragrance oils on analytical lab scale"
                  fallbackTitle="Scent Compounding Lab"
                  className="w-full h-full object-cover object-[50%_78%]"
                />
              </div>
              <div className="min-w-0 flex-1 sm:col-span-8">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#5C715E] font-semibold">
                  Small-Batch Formulation
                </p>
                <p className="font-editorial text-lg sm:text-xl text-[#1E1E1E] mt-0.5">
                  Precision-Weighed Botanical Oils
                </p>
                <p className="text-xs sm:text-sm text-[#1E1E1E]/70 mt-1 leading-relaxed">
                  Every custom batch is compounded in our studio with calibrated pipettes and aged
                  before sample sign-off.
                </p>
              </div>
            </div>
          </div>

          {/* Right Experience & Planner Specs Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.14em] uppercase text-[#5C715E] font-semibold mb-3">
                The Live Experience
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] font-medium text-[#1E1E1E] text-balance mb-4">
                The Apothecary Dispenser Bar
              </h2>
              <p className="text-base text-[#1E1E1E]/75 leading-relaxed mb-8">
                Transform your wedding favor table into a memorable sensory ritual. Our signature
                white-and-gold apothecary bar displays 12 crystal scent columns, glassware funnels,
                and personalized stationery.
              </p>

              {/* 3-Step Guest Experience */}
              <div className="space-y-5 mb-8">
                {GUEST_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 pb-5 border-b border-[#1E1E1E]/10 last:border-b-0 last:pb-0"
                  >
                    <span className="font-editorial text-2xl font-semibold text-[#C5A059] tabular-nums shrink-0 leading-none pt-0.5">
                      {item.step}.
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-[#1E1E1E] font-sans">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#1E1E1E]/70 leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue & Planner Setup Highlights */}
            <div className="bg-[#F9F6F0] border border-[#1E1E1E]/10 rounded-lg p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1E1E1E]/10">
                <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-[#1E1E1E]">
                  Setup Highlights for Wedding Planners
                </h3>
                <span className="text-xs text-[#5C715E] font-medium">
                  Intimate Weddings Recommended
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {PLANNER_SPECS.map((spec) => {
                  const Icon = spec.icon;
                  return (
                    <div key={spec.label} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-[#5C715E] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-xs text-[#1E1E1E]/60">{spec.label}</p>
                        <p className="text-sm font-semibold text-[#1E1E1E] tabular-nums">
                          {spec.value}
                        </p>
                        <p className="text-xs text-[#1E1E1E]/65">{spec.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onSelectLiveBarInBuilder}
                className="w-full py-3 px-5 text-sm font-semibold text-[#F9F6F0] bg-[#1E1E1E] hover:bg-[#333333] transition-colors rounded-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
              >
                Select Live Perfume Bar in Configurator
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
