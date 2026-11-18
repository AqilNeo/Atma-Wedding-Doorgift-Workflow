import { useState } from 'react';
import { B2BPartners } from './components/B2BPartners';
import { DoorgiftConfigurator } from './components/DoorgiftConfigurator';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LivePerfumeBar } from './components/LivePerfumeBar';
import { Navbar } from './components/Navbar';
import type { ConfiguratorState } from './utils/quoteLogic';

const INITIAL_CONFIGURATOR_STATE: ConfiguratorState = {
  coupleNames: 'Den & Nisya',
  weddingDate: '2026-12-12',
  venueLocation: 'Kota Samarahan, Sarawak',
  guestCount: 100,
  budgetPerGuestMYR: 18,
  fragranceConcept: 'atma_curated',
  designerBrandPreference: 'Jo Malone English Pear & Freesia',
  curatedSubType: 'bespoke_self_custom',
  bespokeCoreNote: 'Floral',
  bottleSize: '5ml',
  packagingStyle: 'vial_card',
  distributionMethod: 'pre_packed',
  prePackedHandler: 'wedding_organizer',
};

export default function App() {
  const [configState, setConfigState] = useState<ConfiguratorState>(INITIAL_CONFIGURATOR_STATE);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectLiveBarFromShowcase = () => {
    setConfigState((prev) => ({
      ...prev,
      distributionMethod: 'live_bar',
    }));
    scrollToSection('step-5');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#1E1E1E]">
      <Navbar onNavigate={scrollToSection} />
      <main className="flex-1">
        <Hero onNavigate={scrollToSection} />
        <DoorgiftConfigurator
          state={configState}
          onChange={setConfigState}
          onReset={() => setConfigState(INITIAL_CONFIGURATOR_STATE)}
        />
        <LivePerfumeBar onSelectLiveBarInBuilder={handleSelectLiveBarFromShowcase} />
        <B2BPartners />
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
