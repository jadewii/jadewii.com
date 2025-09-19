// Stripe Payment Links for each product
// Replace these with your actual payment links from Stripe Dashboard

export const PAYMENT_LINKS = {
  // Albums - Electronic
  'honey': 'https://buy.stripe.com/test_xxx_honey',
  'wabi-sabi': 'https://buy.stripe.com/test_xxx_wabi',
  'white-lotus': 'https://buy.stripe.com/test_xxx_white',
  'common-side-effects': 'https://buy.stripe.com/test_xxx_common',
  'artificially-unfavored': 'https://buy.stripe.com/test_xxx_artificial',
  'a-bit-of-red-in-the-blue': 'https://buy.stripe.com/test_xxx_red',
  'battle-of-wolves': 'https://buy.stripe.com/test_xxx_battle',
  'charlies-doomed-christmas': 'https://buy.stripe.com/test_xxx_charlies',
  'dan-da-damned': 'https://buy.stripe.com/test_xxx_dan',
  'drone-sightings': 'https://buy.stripe.com/test_xxx_drone',
  'enlightened-ape': 'https://buy.stripe.com/test_xxx_enlightened',
  'how-the-grinch-chilled-christmas': 'https://buy.stripe.com/test_xxx_grinch',
  'kame-house-session-one': 'https://buy.stripe.com/test_xxx_kame',

  // Drum Kits
  'boombap-drumbreaks-vol-1': 'https://buy.stripe.com/test_xxx_boombap',

  // Add more as you create them in Stripe
};

// Map product IDs to their Stripe Price IDs (for the PRODUCT_MAP in claim endpoint)
export const STRIPE_PRICE_IDS = {
  'honey': 'price_honey',
  'wabi-sabi': 'price_wabi_sabi',
  'white-lotus': 'price_white_lotus',
  'common-side-effects': 'price_common_side_effects',
  'artificially-unfavored': 'price_artificially_unfavored',
  'a-bit-of-red-in-the-blue': 'price_a_bit_of_red_in_the_blue',
  'battle-of-wolves': 'price_battle_of_wolves',
  'charlies-doomed-christmas': 'price_charlies_doomed_christmas',
  'dan-da-damned': 'price_dan_da_damned',
  'drone-sightings': 'price_drone_sightings',
  'enlightened-ape': 'price_enlightened_ape',
  'how-the-grinch-chilled-christmas': 'price_how_the_grinch_chilled_christmas',
  'kame-house-session-one': 'price_kame_house_session_one',
  'boombap-drumbreaks-vol-1': 'price_boombap_drumbreaks_vol1',
};