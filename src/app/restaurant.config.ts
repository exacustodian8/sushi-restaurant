/**
 * EVERYTHING in this file is PLACEHOLDER content for a fictional restaurant.
 * Change it here and the whole site (header, hero, menu, reservations, map, SEO data) follows.
 */

export const RESTAURANT = {
  /** PLACEHOLDER name */
  name: 'Hanare',
  /** PLACEHOLDER descriptor shown next to the name */
  descriptor: 'Sushi Bar',
  tagline: 'Seasonal sushi, quietly made.',
  /** PLACEHOLDER year shown on the seal in the story section */
  established: 2019,
  intro:
    'An intimate counter of fourteen seats where rice, fish and patience are given equal respect. Cut to order, served at the moment it is ready.',
  /** PLACEHOLDER contact details (example.com and 000 numbers are reserved for placeholders) */
  phone: '+351 210 000 000',
  email: 'hello@example.com',
  instagram: '@hanare.placeholder',
  address: {
    street: 'Rua do Exemplo 12',
    postalCode: '1100-000',
    city: 'Lisboa',
    country: 'Portugal',
  },
  /** PLACEHOLDER map spot (a random street in central Lisbon). Change lat/lng to move the map pin. */
  location: { lat: 38.7107, lng: -9.1398 },
  timeZone: 'Europe/Lisbon',
  currency: 'EUR',
  locale: 'en-GB',
  /** most guests per online reservation */
  maxPartySize: 8,
} as const;

/** Opening hours. Keys are weekdays (0 = Sunday ... 6 = Saturday); each entry is [open, close] in 24h time. */
export type Range = readonly [open: string, close: string];
export const HOURS: Record<number, readonly Range[]> = {
  0: [['12:30', '15:00'], ['19:00', '22:30']], // Sunday
  1: [], // Monday: closed
  2: [['19:00', '22:30']],
  3: [['12:30', '15:00'], ['19:00', '22:30']],
  4: [['12:30', '15:00'], ['19:00', '22:30']],
  5: [['12:30', '15:00'], ['19:00', '23:30']],
  6: [['12:30', '15:00'], ['19:00', '23:30']],
};

// ---------------------------------------------------------------------------------------------
// MENU: PLACEHOLDER dishes. Kept to ten items at most (a test enforces it).
// ---------------------------------------------------------------------------------------------

export const CATEGORIES = ['Small plates', 'Sashimi', 'Nigiri', 'Rolls', 'Dessert'] as const;
export type Category = (typeof CATEGORIES)[number];
export type Tag = 'vegetarian' | 'spicy' | 'chef';

export interface MenuItem {
  name: string;
  category: Category;
  description: string;
  price: number;
  tags: readonly Tag[];
}

export const MENU: readonly MenuItem[] = [
  { name: 'Edamame', category: 'Small plates', description: 'Steamed in the pod, finished with smoked sea salt.', price: 6, tags: ['vegetarian'] },
  { name: 'Agedashi tofu', category: 'Small plates', description: 'Silken tofu, light dashi broth, grated daikon, bonito.', price: 9, tags: [] },
  { name: 'Sashimi moriawase', category: 'Sashimi', description: 'The market’s five best cuts of the day, served over shaved ice.', price: 26, tags: ['chef'] },
  { name: 'Hamachi, yuzu & jalapeño', category: 'Sashimi', description: 'Yellowtail, yuzu kosho, green chilli, a drop of citrus ponzu.', price: 19, tags: ['spicy'] },
  { name: 'Nigiri omakase', category: 'Nigiri', description: 'Eight pieces chosen by the chef, from lean to rich.', price: 34, tags: ['chef'] },
  { name: 'Salmon belly', category: 'Nigiri', description: 'Two pieces, lightly torched, with a brush of soy.', price: 9, tags: [] },
  { name: 'Otoro', category: 'Nigiri', description: 'Two pieces of the fattiest tuna, aged three days.', price: 16, tags: [] },
  { name: 'Spicy tuna uramaki', category: 'Rolls', description: 'Hand-chopped tuna, cucumber, toasted sesame, house chilli oil.', price: 13, tags: ['spicy'] },
  { name: 'Vegetable futomaki', category: 'Rolls', description: 'Pickled gourd, shiitake, cucumber and seasonal greens.', price: 12, tags: ['vegetarian'] },
  { name: 'Matcha & black sesame', category: 'Dessert', description: 'Two scoops of house-made ice cream with roasted rice.', price: 8, tags: ['vegetarian'] },
];

// ---------------------------------------------------------------------------------------------
// Photos (Wikimedia Commons, openly licensed). Replace the files in /public/images and update here.
// ---------------------------------------------------------------------------------------------

export interface Photo {
  file: string;
  alt: string;
  author: string;
  license: string;
  source: string;
}

export const PHOTOS: Record<string, Photo> = {
  hero: { file: 'images/hero.jpg', alt: 'Nigiri and maki rolls on a dark slate plate', author: 'Alpha from Melbourne, Australia', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Nigiri_Sushi,_Hosomaki_-_Uta_Sushi_Bar_(5049056668).jpg' },
  sashimi: { file: 'images/sashimi.jpg', alt: 'Slices of salmon and tuna sashimi', author: 'Wilfredor', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Sashimi_of_S%C3%A3o_Paulo.jpg' },
  omakase: { file: 'images/omakase.jpg', alt: 'Nigiri topped with salmon roe and sea urchin', author: 'Yumi Kimura', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Various_sushi,_beautiful_October_night_at_midnight.jpg' },
  tuna: { file: 'images/tuna.jpg', alt: 'Close view of tuna nigiri with chives', author: 'Asok5 from Budapest, Hungary', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Nigiri_Moriawase_(Sushi_Sei)_(42217840971).jpg' },
  platter: { file: 'images/platter.jpg', alt: 'A mixed nigiri platter on a wooden table', author: 'N509FZ', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Shichifuku_Nigiri_Sushi_at_Tsukiji_Tamasushi,_Wing_Takanawa_(20230802203124).jpg' },
  maki: { file: 'images/maki.jpg', alt: 'Assorted maki rolls with soy sauce', author: 'Tim Reckmann from Hamm, Deutschland', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Sushi_(26478755502).jpg' },
  sake: { file: 'images/sake.jpg', alt: 'Nigiri and ramen with bottles of sake', author: 'Junichiro Ozaki', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Ramen_Cooking_Tokyo_-_ramen_sushi_sake_set.jpg' },
  salmon: { file: 'images/salmon.jpg', alt: 'A platter of salmon nigiri and sashimi', author: 'Angelicadlr', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Salmon_Sushi_and_Sashimi_Platter_-_W_Sushi.jpg' },
};

export const GALLERY = ['omakase', 'tuna', 'platter', 'maki', 'sake', 'salmon'] as const;
