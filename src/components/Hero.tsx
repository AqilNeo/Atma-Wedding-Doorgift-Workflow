import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { LIVE_BAR_IMAGE, PACKAGING_OPTIONS } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const featuredPackaging = PACKAGING_OPTIONS[0]; // Minimalist Vial Card
  const secondaryPackaging = PACKAGING_OPTIONS[4]; // Boutique Mini Paperbag

  return (
    <section id="top" className="relative pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-[#1E1E1E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-[13px] tracking-[0.14em] uppercase text-[#5C715E] font-semibold mb-4">
                Botanical Perfumery · Wedding Favors · Live Scent Bar
              </p>

              <h1 className="font-editorial text-[2.5rem] sm:text-[3.35rem] lg:text-[4rem] leading-[1.06] font-medium text-[#1E1E1E] tracking-tight text-balance mb-6">
                Bespoke Scents for Unforgettable Celebrations
              </h1>

              <p className="text-base sm:text-lg text-[#1E1E1E]/75 leading-relaxed max-w-xl mb-8">
                Custom wedding perfume doorgifts and interactive live perfume bars curated by{' '}
                <span className="font-editorial italic text-xl text-[#1E1E1E]">atma°</span>. Crafted
                in clear glass atomizers paired with tailored botanical stationery.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <button
                  type="button"
                  onClick={() => onNavigate('configurator')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#F9F6F0] bg-[#5C715E] hover:bg-[#475849] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C715E]"
                >
                  <span>Customize Your Doorgift</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('b2b-partners')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1E1E1E] bg-transparent border border-[#1E1E1E]/25 hover:border-[#1E1E1E] hover:bg-[#F2EDE3] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
                >
                  <span>B2B Partner Collaboration</span>
                  <ArrowDownRight className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Quiet Unboxed Editorial Metadata */}
            <div className="pt-6 border-t border-[#1E1E1E]/10 grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1E] tabular-nums">
                  5ml–20ml
                </p>
                <p className="text-xs text-[#1E1E1E]/65 mt-0.5">Glass Spray Vials</p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1E] tabular-nums">
                  5 Styles
                </p>
                <p className="text-xs text-[#1E1E1E]/65 mt-0.5">Custom Stationery</p>
              </div>
              <div>
                <p className="font-editorial text-2xl sm:text-3xl font-medium text-[#1E1E1E] tabular-nums">
                  12 Scents
                </p>
                <p className="text-xs text-[#1E1E1E]/65 mt-0.5">Live Apothecary Bar</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Photography Composition */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-3 sm:gap-4 items-stretch sm:min-h-[460px]">
            <div className="col-span-12 sm:col-span-7 relative rounded-lg overflow-hidden border border-[#1E1E1E]/10 bg-[#F2EDE3] aspect-[4/3] sm:aspect-auto">
              <SafeImage
                src={featuredPackaging.image}
                alt={featuredPackaging.imageAlt}
                fallbackTitle={featuredPackaging.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1E1E]/75 via-[#1E1E1E]/30 to-transparent p-4 sm:p-5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#F9F6F0]/85">
                  Botanical Stationery
                </p>
                <p className="font-editorial text-lg sm:text-xl text-[#F9F6F0]">
                  {featuredPackaging.name}
                </p>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-5 grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-4">
              <div className="aspect-square sm:aspect-auto sm:flex-1 relative rounded-lg overflow-hidden border border-[#1E1E1E]/10 bg-[#F2EDE3]">
                <SafeImage
                  src={LIVE_BAR_IMAGE}
                  alt="ATMA Live Bespoke Perfume Bar counter with glass dispenser columns"
                  fallbackTitle="Live Perfume Bar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1E1E]/75 via-[#1E1E1E]/25 to-transparent p-3 sm:p-3.5">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#F9F6F0]/85">
                    Interactive
                  </p>
                  <p className="font-editorial text-base sm:text-lg text-[#F9F6F0]">
                    Live Perfume Bar
                  </p>
                </div>
              </div>

              <div className="aspect-square sm:aspect-auto sm:flex-1 relative rounded-lg overflow-hidden border border-[#1E1E1E]/10 bg-[#F2EDE3]">
                <SafeImage
                  src={secondaryPackaging.image}
                  alt={secondaryPackaging.imageAlt}
                  fallbackTitle={secondaryPackaging.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E1E1E]/75 via-[#1E1E1E]/25 to-transparent p-3 sm:p-3.5">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#F9F6F0]/85">
                    VIP Entourage
                  </p>
                  <p className="font-editorial text-base sm:text-lg text-[#F9F6F0]">
                    {secondaryPackaging.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
