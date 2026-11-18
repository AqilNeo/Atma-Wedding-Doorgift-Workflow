import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  calculateQuoteEstimate,
  formatWhatsAppInquiry,
  getVolumeDiscountPercent,
  validateB2BForm,
  type ConfiguratorState,
} from './quoteLogic';

const baseState: ConfiguratorState = {
  coupleNames: 'Den & Nisya',
  weddingDate: '2026-12-12',
  venueLocation: 'Glasshouse Seputeh, Kuala Lumpur',
  guestCount: 100,
  budgetPerGuestMYR: 18,
  fragranceConcept: 'atma_curated',
  designerBrandPreference: 'Jo Malone English Pear & Freesia',
  curatedSubType: 'inspired',
  bespokeCoreNote: 'Floral',
  bottleSize: '5ml',
  packagingStyle: 'vial_card',
  distributionMethod: 'pre_packed',
  prePackedHandler: 'wedding_organizer',
};

test('getVolumeDiscountPercent returns expected tier thresholds', () => {
  assert.equal(getVolumeDiscountPercent(80), 0);
  assert.equal(getVolumeDiscountPercent(150), 5);
  assert.equal(getVolumeDiscountPercent(300), 10);
  assert.equal(getVolumeDiscountPercent(500), 15);
});

test('calculateQuoteEstimate computes pricing accurately for standard vs live bar', () => {
  const prePacked = calculateQuoteEstimate(baseState);
  assert.equal(prePacked.unitPriceMYR, 14); // 12 (5ml) + 2 (vial_card) + 0 (inspired)
  assert.equal(prePacked.serviceFeeMYR, 0);
  assert.equal(prePacked.estimatedTotalMYR, 1400);
  assert.equal(prePacked.withinBudget, true);

  const liveBar = calculateQuoteEstimate({
    ...baseState,
    guestCount: 150,
    distributionMethod: 'live_bar',
    curatedSubType: 'bespoke_self_custom',
    bottleSize: '10ml',
  });
  // 19 (10ml) + 2 (vial_card) + 3 (bespoke) = 24 * 0.95 (5% off for 150) = 22.8
  assert.equal(liveBar.discountPercent, 5);
  assert.equal(liveBar.unitPriceMYR, 22.8);
  assert.equal(liveBar.serviceFeeMYR, 950);
  assert.equal(liveBar.estimatedTotalMYR, Math.round(22.8 * 150) + 950);
  assert.equal(liveBar.withinBudget, false);
});

test('formatWhatsAppInquiry includes all 5 steps and encodes cleanly into URL', () => {
  const msg = formatWhatsAppInquiry({
    ...baseState,
    fragranceConcept: 'atma_curated',
    curatedSubType: 'bespoke_self_custom',
    bespokeCoreNote: 'Woody',
    packagingStyle: 'drawstring_pouch',
    distributionMethod: 'live_bar',
  });

  assert.match(msg, /Den & Nisya/);
  assert.match(msg, /100 bottles/);
  assert.match(msg, /Bespoke Self-Custom/);
  assert.match(msg, /Woody/);
  assert.match(msg, /Drawstring Gift Pouch/);
  assert.match(msg, /Live Bespoke Perfume Bar/);

  const url = buildWhatsAppUrl(msg);
  assert.ok(url.startsWith('https://wa.me/'));
  assert.ok(url.includes('Den%20%26%20Nisya'));
});

test('validateB2BForm rejects missing/invalid fields and accepts complete valid data', () => {
  const invalid = validateB2BForm({
    contactName: '',
    companyName: 'Atelier Events',
    email: 'not-an-email',
    whatsappNumber: '123',
    monthlyEvents: '3-5',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.contactName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.whatsappNumber);
  assert.equal(invalid.errors.companyName, undefined);

  const valid = validateB2BForm({
    contactName: 'Farah Nadia',
    companyName: 'Atelier Events KL',
    email: 'farah@atelierevents.my',
    whatsappNumber: '+6012-345 6789',
    monthlyEvents: '3-5 weddings/month',
    notes: 'Interested in 10ml pouch packages',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
