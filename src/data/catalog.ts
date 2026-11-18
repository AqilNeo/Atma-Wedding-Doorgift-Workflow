export type FragranceConceptType = 'designer_decant' | 'atma_curated';
export type CuratedSubType = 'inspired' | 'ready_custom' | 'bespoke_self_custom';
export type CoreScentNote = 'Floral' | 'Woody' | 'Citrus' | 'Musky' | 'Spicy';
export type BottleSizeId = '5ml' | '10ml' | '20ml';
export type PackagingStyleId =
  | 'vial_card'
  | 'mounted_wish_card'
  | 'blister_card'
  | 'drawstring_pouch'
  | 'mini_paperbag';
export type DistributionMethodId = 'pre_packed' | 'live_bar';
export type PrePackedHandlerId = 'wedding_organizer' | 'atma_staff';

export interface ScentPyramid {
  note: CoreScentNote;
  profileTitle: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  moodDescription: string;
}

export interface BottleSizeOption {
  id: BottleSizeId;
  label: string;
  subtitle: string;
  sprayCount: string;
  recommended?: boolean;
  basePriceMYR: number;
  dimensions: string;
}

export interface PackagingOption {
  id: PackagingStyleId;
  name: string;
  shortDesc: string;
  bestFor: string;
  image: string;
  imageAlt: string;
  addOnMYR: number;
}

export const CORE_SCENT_PYRAMIDS: Record<CoreScentNote, ScentPyramid> = {
  Floral: {
    note: 'Floral',
    profileTitle: 'White Blossom & Dewy Peony',
    topNotes: 'Italian Bergamot, White Pear, Dewy Green Leaves',
    heartNotes: 'Damask Rose, Peony, Jasmine Sambac',
    baseNotes: 'White Musk, Soft Cashmere Wood',
    moodDescription: 'Romantic, airy, and luminous—crafted for sunlit garden vows and classic receptions.',
  },
  Woody: {
    note: 'Woody',
    profileTitle: 'Velvet Cedar & Santal Mist',
    topNotes: 'Cardamom Pod, Fig Leaf, Crisp Cypress',
    heartNotes: 'Australian Sandalwood, Orris Butter, Violet Leaf',
    baseNotes: 'Atlas Cedarwood, Dry Amber, Vetiver',
    moodDescription: 'Grounded, architectural, and warm—an heirloom unisex signature that lingers cleanly.',
  },
  Citrus: {
    note: 'Citrus',
    profileTitle: 'Amalfi Neroli & Sunlit Verbena',
    topNotes: 'Calabrian Lemon, Yuzu Zest, Mandarin Blossom',
    heartNotes: 'Tunisian Neroli, Verbena, White Tea',
    baseNotes: 'Mineral Ambergris, Sheer Cedar',
    moodDescription: 'Crisp, uplifting, and celebratory—ideal for daytime solemnizations and outdoor soirées.',
  },
  Musky: {
    note: 'Musky',
    profileTitle: 'Second-Skin Silk & Ambrette',
    topNotes: 'Pink Peppercorn, Aldehydic Linen, Bergamot Peel',
    heartNotes: 'Ambrette Seed, Iris, Heliotrope',
    baseNotes: 'Skin Musk, Benzoin Tears, Creamy Tonka',
    moodDescription: 'Intimate, comforting, and refined—designed like crisp cotton stationery on warm skin.',
  },
  Spicy: {
    note: 'Spicy',
    profileTitle: 'Saffron Rose & Smoked Oud',
    topNotes: 'Red Saffron, Pink Pepper, Blood Orange',
    heartNotes: 'Turkish Rose, Clove Bud, Labdanum',
    baseNotes: 'Smoked Agarwood, Patchouli Heart, Vanilla Bean',
    moodDescription: 'Opulent, ceremonial, and unforgettable—tailored for evening banquets and black-tie galas.',
  },
};

export const DESIGNER_DECANT_EXAMPLES = [
  'Jo Malone English Pear & Freesia',
  'Diptyque Eau Rose / Philosykos',
  'Byredo Blanche / Gypsy Water',
  'Maison Francis Kurkdjian Baccarat Rouge 540',
  'Le Labo Santal 33 / Another 13',
  'Custom Designer Request',
];

export const CURATED_SUB_OPTIONS: Array<{
  id: CuratedSubType;
  title: string;
  tagline: string;
  description: string;
  requiresConsultation: boolean;
}> = [
  {
    id: 'inspired',
    title: 'Inspired Collection',
    tagline: 'Beloved Iconic Profiles',
    description:
      'High-concentration interpretations of timeless niche and designer scent DNA formulated for lasting projection.',
    requiresConsultation: false,
  },
  {
    id: 'ready_custom',
    title: 'Designer Ready-Custom',
    tagline: 'ATMA Signature Archives',
    description:
      'Pre-aged house accords composed by our perfumers—balanced for Malaysian humidity and ready for sample sign-off.',
    requiresConsultation: false,
  },
  {
    id: 'bespoke_self_custom',
    title: 'Bespoke Self-Custom',
    tagline: 'Co-Created Signature Scent',
    description:
      'Pick one core scent note below for our perfumers to break down into a custom 3-tier blend, followed by scent discovery and sign-off.',
    requiresConsultation: true,
  },
];

export const BOTTLE_SIZES: BottleSizeOption[] = [
  {
    id: '5ml',
    label: '5ml',
    subtitle: 'Travel Atomizer Vial',
    sprayCount: '~65 sprays',
    recommended: true,
    basePriceMYR: 12,
    dimensions: '14mm × 76mm · Thick clear glass',
  },
  {
    id: '10ml',
    label: '10ml',
    subtitle: 'Signature Pocket Spray',
    sprayCount: '~130 sprays',
    basePriceMYR: 19,
    dimensions: '18mm × 92mm · Thick clear glass',
  },
  {
    id: '20ml',
    label: '20ml',
    subtitle: 'VIP Keepsake Flacon',
    sprayCount: '~260 sprays',
    basePriceMYR: 32,
    dimensions: '24mm × 104mm · Heavyweight glass',
  },
];

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'vial_card',
    name: 'Minimalist Vial Card',
    shortDesc: 'Slotted botanical thank-you card holding the glass spray vial securely in a die-cut band.',
    bestFor: '5ml & 10ml · Clean modern favors',
    image: '/assets/aistudio/wi_83b6ad0f.jpg',
    imageAlt: 'Minimalist Vial Card botanical thank-you stationery with slotted perfume bottle',
    addOnMYR: 2,
  },
  {
    id: 'mounted_wish_card',
    name: 'Mounted Bottle Wish Card',
    shortDesc: 'Flush-mounted glass bottle presented directly beside personalized couple typography on textured cardstock.',
    bestFor: '5ml & 10ml · Classic table place settings',
    image: '/assets/aistudio/Gemini_Generated_Image_d7sfamd7sfamd7sf_ac06efbb.jpg',
    imageAlt: 'Mounted Bottle Wish Card with flush-mounted perfume bottle on botanical cream cardstock',
    addOnMYR: 2.5,
  },
  {
    id: 'blister_card',
    name: 'Pocket-Spray Blister Card',
    shortDesc: 'Clear molded protective blister shell framed over custom wedding stationery for crisp retail-grade protection.',
    bestFor: '5ml & 10ml · High-volume distribution',
    image: '/assets/aistudio/Gemini_Generated_Image_tyrlv0tyrlv0tyrl_dd26700b.jpg',
    imageAlt: 'Pocket-Spray Blister Card with clear molded protective shell over perfume bottle',
    addOnMYR: 3,
  },
  {
    id: 'drawstring_pouch',
    name: 'Drawstring Gift Pouch',
    shortDesc: 'Natural unbleached cotton drawstring pouch stamped with atma° paired with a separate printed botanical wish card.',
    bestFor: '5ml, 10ml & 20ml · Tactile organic warmth',
    image: '/assets/aistudio/Gemini_Generated_Image_138ukz138ukz138u_5712ae97.jpg',
    imageAlt: 'Natural cotton Drawstring Gift Pouch stamped with atma° alongside wish card and bottle',
    addOnMYR: 3.5,
  },
  {
    id: 'mini_paperbag',
    name: 'Boutique Mini Paperbag',
    shortDesc: 'Ivory botanical mini gift bag finished with cream satin ribbon handles and a matching keepsake card.',
    bestFor: '10ml–20ml or VIP entourage sets',
    image: '/assets/aistudio/Gemini_Generated_Image_d7sfamd7sfamd7sfff_a96aa6b9.jpg',
    imageAlt: 'Boutique Mini Paperbag with cream satin ribbon handles, eucalyptus motif, and thank-you card',
    addOnMYR: 4.5,
  },
];

export const LIVE_BAR_IMAGE = '/assets/aistudio/Gemini_Generated_Image_h14ei9h14ei9h14e_cc9db204.jpg';
export const LAB_CRAFT_IMAGE = '/assets/aistudio/WhatsApp_Image_2026-11-18_at_21.01.27_1fe1331f.jpeg';
export const VIAL_CLOSEUP_IMAGE = '/assets/aistudio/WhatsApp_Image_2026-11-18_at_20.46.33_77d01e8d.jpeg';

export const B2B_BENEFITS = [
  {
    index: '01',
    title: 'Turnkey Execution',
    description:
      'From scent discovery and custom stationery proofing to venue load-in and post-event breakdown, our team integrates seamlessly into your wedding day timeline.',
    metric: '90-min setup · Zero planner stress',
  },
  {
    index: '02',
    title: 'Interactive Photo-Op Value',
    description:
      'Our bespoke apothecary dispenser counter becomes an architectural focal point during cocktail hour—giving guests an artisanal sensory ritual worth capturing.',
    metric: '12 glass scent columns · Custom couple signage',
  },
  {
    index: '03',
    title: 'Scalable Packages (5ml–20ml)',
    description:
      'Flexible tiering lets planners assign 5ml favors for grand guest lists while upgrading VIP tables, bridesmaids, and dignitaries to 10ml or 20ml mini paperbag sets.',
    metric: '50 to 1,500+ guests · Dedicated B2B net rates',
  },
];
