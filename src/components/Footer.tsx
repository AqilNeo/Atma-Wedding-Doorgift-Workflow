interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#1E1E1E] text-[#F9F6F0] pt-12 pb-24 sm:pt-16 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#F9F6F0]/15">
          <div className="md:col-span-5">
            <span className="font-editorial text-3xl font-medium tracking-tight text-[#F9F6F0]">
              atma°
            </span>
            <p className="text-sm text-[#F9F6F0]/70 mt-3 max-w-sm leading-relaxed">
              Boutique botanical perfumery specializing in bespoke wedding doorgift vials,
              personalized stationery, and live apothecary scent bars.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C5A059] font-semibold">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-[#F9F6F0]/80">
              <li>
                <a
                  href="#configurator"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('configurator');
                  }}
                  className="hover:text-[#F9F6F0] transition-colors"
                >
                  Doorgift & Quote Configurator
                </a>
              </li>
              <li>
                <a
                  href="#packaging-showcase"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('packaging-showcase');
                  }}
                  className="hover:text-[#F9F6F0] transition-colors"
                >
                  Packaging & Stationery Styles
                </a>
              </li>
              <li>
                <a
                  href="#perfume-bar"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('perfume-bar');
                  }}
                  className="hover:text-[#F9F6F0] transition-colors"
                >
                  Live Bespoke Perfume Bar
                </a>
              </li>
              <li>
                <a
                  href="#b2b-partners"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('b2b-partners');
                  }}
                  className="hover:text-[#F9F6F0] transition-colors"
                >
                  B2B Partner Program
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C5A059] font-semibold">
              Atelier Inquiries
            </p>
            <p className="text-sm text-[#F9F6F0]/80">concierge@atma-perfumery.com</p>
            <p className="text-sm text-[#F9F6F0]/70">Kuala Lumpur · Malaysia</p>
            <p className="text-xs text-[#F9F6F0]/55 pt-1">
              By appointment for private scent discovery & sample sign-off.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#F9F6F0]/55">
          <p>© {new Date().getFullYear()} atma° Wedding Doorgift Perfume. All rights reserved.</p>
          <p>Hand-compounded botanical favors · 5ml · 10ml · 20ml</p>
        </div>
      </div>
    </footer>
  );
}
