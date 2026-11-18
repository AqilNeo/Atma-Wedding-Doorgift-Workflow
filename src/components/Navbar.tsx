import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'configurator', label: 'Configurator' },
  { id: 'packaging-showcase', label: 'Packaging' },
  { id: 'perfume-bar', label: 'Perfume Bar' },
  { id: 'b2b-partners', label: 'For Planners' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#1E1E1E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1E1E1E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C715E]"
        >
          atma°
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="text-sm font-medium text-[#1E1E1E]/75 hover:text-[#1E1E1E] transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C715E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('configurator')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide text-[#F9F6F0] bg-[#5C715E] hover:bg-[#475849] transition-colors duration-150 rounded-md whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C715E]"
          >
            Build Doorgift
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#1E1E1E] hover:bg-[#F2EDE3] rounded-md transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#F9F6F0] border-t border-[#1E1E1E]/10 px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="block py-3 px-3 text-base font-medium text-[#1E1E1E] hover:bg-[#F2EDE3] rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleLinkClick('configurator')}
              className="w-full py-3 px-4 text-sm font-semibold text-[#F9F6F0] bg-[#5C715E] hover:bg-[#475849] rounded-md transition-colors cursor-pointer"
            >
              Build Doorgift
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
