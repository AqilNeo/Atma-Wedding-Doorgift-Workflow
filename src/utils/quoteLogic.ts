import {
  BOTTLE_SIZES,
  CORE_SCENT_PYRAMIDS,
  CURATED_SUB_OPTIONS,
  PACKAGING_OPTIONS,
  type BottleSizeId,
  type CoreScentNote,
  type CuratedSubType,
  type DistributionMethodId,
  type FragranceConceptType,
  type PackagingStyleId,
  type PrePackedHandlerId,
} from '../data/catalog';

export interface ConfiguratorState {
  coupleNames: string;
  weddingDate: string;
  venueLocation: string;
  guestCount: number;
  budgetPerGuestMYR: number;
  fragranceConcept: FragranceConceptType;
  designerBrandPreference: string;
  curatedSubType: CuratedSubType;
  bespokeCoreNote: CoreScentNote;
  bottleSize: BottleSizeId;
  packagingStyle: PackagingStyleId;
  distributionMethod: DistributionMethodId;
  prePackedHandler: PrePackedHandlerId;
}

export interface QuoteEstimate {
  unitPriceMYR: number;
  subtotalFavorsMYR: number;
  serviceFeeMYR: number;
  estimatedTotalMYR: number;
  discountPercent: number;
  withinBudget: boolean;
  effectivePerGuestMYR: number;
}

export interface B2BFormInput {
  contactName: string;
  companyName: string;
  email: string;
  whatsappNumber: string;
  monthlyEvents: string;
  notes: string;
}

export interface B2BFormValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof B2BFormInput, string>>;
}

export const WHATSAPP_BUSINESS_NUMBER = '60123456789';

export function getVolumeDiscountPercent(guestCount: number): number {
  if (guestCount >= 500) return 15;
  if (guestCount >= 300) return 10;
  if (guestCount >= 150) return 5;
  return 0;
}

export function calculateQuoteEstimate(state: ConfiguratorState): QuoteEstimate {
  const safeGuests = Math.max(20, Math.min(2000, Math.round(state.guestCount || 0)));
  const bottle = BOTTLE_SIZES.find((b) => b.id === state.bottleSize) ?? BOTTLE_SIZES[0];
  const packaging =
    PACKAGING_OPTIONS.find((p) => p.id === state.packagingStyle) ?? PACKAGING_OPTIONS[0];

  const conceptPremium =
    state.fragranceConcept === 'designer_decant'
      ? 6
      : state.curatedSubType === 'bespoke_self_custom'
        ? 3
        : state.curatedSubType === 'ready_custom'
          ? 1.5
          : 0;

  const rawUnit = bottle.basePriceMYR + packaging.addOnMYR + conceptPremium;
  const discountPercent = getVolumeDiscountPercent(safeGuests);
  const unitPriceMYR = Number((rawUnit * (1 - discountPercent / 100)).toFixed(2));
  const subtotalFavorsMYR = Math.round(unitPriceMYR * safeGuests);

  let serviceFeeMYR = 0;
  if (state.distributionMethod === 'live_bar') {
    serviceFeeMYR = 950;
  } else if (state.prePackedHandler === 'atma_staff') {
    serviceFeeMYR = 350;
  }

  const estimatedTotalMYR = subtotalFavorsMYR + serviceFeeMYR;
  const effectivePerGuestMYR = Number((estimatedTotalMYR / safeGuests).toFixed(2));
  const withinBudget =
    state.budgetPerGuestMYR <= 0 ? true : unitPriceMYR <= state.budgetPerGuestMYR;

  return {
    unitPriceMYR,
    subtotalFavorsMYR,
    serviceFeeMYR,
    estimatedTotalMYR,
    discountPercent,
    withinBudget,
    effectivePerGuestMYR,
  };
}

export function formatWhatsAppInquiry(state: ConfiguratorState): string {
  const estimate = calculateQuoteEstimate(state);
  const bottle = BOTTLE_SIZES.find((b) => b.id === state.bottleSize) ?? BOTTLE_SIZES[0];
  const packaging =
    PACKAGING_OPTIONS.find((p) => p.id === state.packagingStyle) ?? PACKAGING_OPTIONS[0];
  const curatedSub =
    CURATED_SUB_OPTIONS.find((c) => c.id === state.curatedSubType) ?? CURATED_SUB_OPTIONS[0];

  const couple = state.coupleNames.trim() || 'To Be Confirmed';
  const date = state.weddingDate.trim() || 'Flexible / TBC';
  const venue = state.venueLocation.trim() || 'To Be Confirmed';

  let fragranceLine = '';
  if (state.fragranceConcept === 'designer_decant') {
    const brand = state.designerBrandPreference.trim() || 'To be discussed with ATMA';
    fragranceLine = `Designer Decant Series (Preference: ${brand})`;
  } else if (state.curatedSubType === 'bespoke_self_custom') {
    const pyramid = CORE_SCENT_PYRAMIDS[state.bespokeCoreNote];
    fragranceLine = `ATMA Curated — ${curatedSub.title} (Core Note: ${state.bespokeCoreNote} / ${pyramid.profileTitle})`;
  } else {
    fragranceLine = `ATMA Curated — ${curatedSub.title}`;
  }

  const distributionLine =
    state.distributionMethod === 'live_bar'
      ? 'Live Bespoke Perfume Bar (Fully staffed & managed by ATMA)'
      : `Pre-Packed Doorgifts (${
          state.prePackedHandler === 'atma_staff'
            ? 'Staffed by ATMA'
            : 'Handled by Wedding Organizer'
        })`;

  const lines = [
    `Hello ATMA° Team! We would like to inquire about a custom Wedding Doorgift Perfume quote:`,
    ``,
    `*1. Event Details & Budget*`,
    `• Couple: ${couple}`,
    `• Wedding Date: ${date}`,
    `• Venue / Location: ${venue}`,
    `• Estimated Guests: ${state.guestCount} bottles`,
    `• Target Budget / Guest: RM ${state.budgetPerGuestMYR}`,
    ``,
    `*2. Fragrance Concept*`,
    `• Selection: ${fragranceLine}`,
    ``,
    `*3. Bottle Size*`,
    `• Volume: ${bottle.label} (${bottle.subtitle})`,
    ``,
    `*4. Packaging & Stationery*`,
    `• Style: ${packaging.name}`,
    ``,
    `*5. Distribution Method*`,
    `• Setup: ${distributionLine}`,
    ``,
    `*Estimated Summary*`,
    `• Est. Unit Rate: RM ${estimate.unitPriceMYR.toFixed(2)} / bottle${
      estimate.discountPercent > 0 ? ` (${estimate.discountPercent}% volume tier)` : ''
    }`,
    `• Est. Total: RM ${estimate.estimatedTotalMYR.toLocaleString()}`,
    ``,
    `Looking forward to arranging our scent consultation and sample approval!`,
  ];

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string, phoneNumber = WHATSAPP_BUSINESS_NUMBER): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function validateB2BForm(input: B2BFormInput): B2BFormValidationResult {
  const errors: Partial<Record<keyof B2BFormInput, string>> = {};

  if (!input.contactName.trim()) {
    errors.contactName = 'Please enter your name.';
  }
  if (!input.companyName.trim()) {
    errors.companyName = 'Please enter your planning studio or venue name.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email.trim() || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please enter a valid work email address.';
  }
  const digitsOnly = input.whatsappNumber.replace(/\D/g, '');
  if (digitsOnly.length < 8) {
    errors.whatsappNumber = 'Please enter a valid WhatsApp or phone number.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
