import { MenuItem, HeroSlide } from '../types';

export const RESTAURANT_INFO = {
  name: 'Redfern Table & Grill',
  shortName: 'Redfern',
  tagline: 'Good Food. Great Company.',
  eyebrow: 'American Table & Grill',
  
  // Clearly labeled development placeholders per prompt guidelines
  location: {
    status: 'Development Prototype' as const,
    isVerified: false,
    addressLine1: '742 Redfern Boulevard',
    cityStateZip: 'Austin, TX 78701',
    directionsUrl: 'https://maps.google.com/?q=Redfern+Table+and+Grill+Austin+TX',
    note: 'Sample location placeholder for prototype demonstration',
  },
  
  contact: {
    isVerified: false,
    phone: '(512) 555-0198',
    phoneRaw: '+15125550198',
    email: 'hello@redferntablegrill.com',
    reservationsEmail: 'reservations@redferntablegrill.com',
    note: 'Sample contact information for preview environment',
  },
  
  hours: {
    isVerified: false,
    schedule: [
      { days: 'Monday – Thursday', times: '4:00 PM – 10:00 PM' },
      { days: 'Friday', times: '4:00 PM – 11:00 PM' },
      { days: 'Saturday', times: '11:30 AM – 11:00 PM' },
      { days: 'Sunday', times: '11:30 AM – 9:00 PM' },
    ],
    note: 'Operating schedule subject to official restaurant confirmation',
  },

  cancellationPolicy: 'Reservations may be cancelled at no charge up to two hours prior to your scheduled reservation time.',
  
  partySizeLimit: 8,
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'SIGNATURE AMERICAN FLAVOR',
    headline: 'Good Food. Great Company.',
    description: 'From perfectly grilled favorites to classic comfort food, discover the flavors that bring everyone to the table.',
    primaryCtaText: 'Explore Our Menu',
    primaryCtaLink: '/menu',
    secondaryCtaText: 'Book a Table',
    secondaryCtaLink: '/reservations',
    image: '/images/hero_burger.jpg',
    imageAlt: 'Handcrafted gourmet cheeseburger with melted cheddar, toasted brioche bun, and crisp fries',
  },
  {
    id: 2,
    eyebrow: 'FRESH OFF THE GRILL',
    headline: 'Made for the Love of the Grill.',
    description: 'Enjoy bold flavors, satisfying classics, and the unmistakable taste of food fresh off the grill.',
    primaryCtaText: 'Discover Our Menu',
    primaryCtaLink: '/menu',
    secondaryCtaText: 'Reserve Your Table',
    secondaryCtaLink: '/reservations',
    image: '/images/hero_steak.jpg',
    imageAlt: 'Sizzling grilled ribeye steak with char marks, herb butter, and roasted vegetables',
  },
  {
    id: 3,
    eyebrow: 'GATHER AROUND THE TABLE',
    headline: 'Your Table Is Waiting.',
    description: 'Make every meal a little more memorable with comforting favorites and a welcoming atmosphere.',
    primaryCtaText: 'Make a Reservation',
    primaryCtaLink: '/reservations',
    secondaryCtaText: 'Meet Redfern',
    secondaryCtaLink: '/about',
    image: '/images/hero_bbq.jpg',
    imageAlt: 'Slow-smoked American BBQ platter with tender ribs, grilled chicken, and warm sides',
  },
];

export const BRAND_VALUES = [
  {
    title: 'Made for memorable meals.',
    description: 'Every plate is prepared with honest care, generous portions, and flavors that invite conversation.',
  },
  {
    title: 'Inspired by American grill classics.',
    description: 'From prime cuts over hardwood flame to slow-smoked barbecue and scratch-made sides.',
  },
  {
    title: 'A welcoming place to gather.',
    description: 'Whether it is a lively family dinner, casual weeknight, or date night, our room is built for warmth.',
  },
];

export const EXPERIENCE_FEATURES = [
  {
    id: 'feature-1',
    title: 'Classic American Grill',
    description: 'Familiar favorites, bold flavors, and satisfying grill classics.',
    detail: 'Hardwood flame cooking and timeless seasoning that honor the heritage of the American smokehouse.',
  },
  {
    id: 'feature-2',
    title: 'A Place to Gather',
    description: 'An inviting dining concept for casual meals, celebrations, and time together.',
    detail: 'Spacious booths, warm lighting, and a convivial atmosphere designed to make every guest feel right at home.',
  },
  {
    id: 'feature-3',
    title: 'Made for Every Occasion',
    description: 'A comfortable setting for lunch, dinner, and memorable evenings.',
    detail: 'From relaxed afternoon bites to weekend celebratory feasts, our hospitality adapts to your rhythm.',
  },
];

export const SIGNATURE_HIGHLIGHTS: MenuItem[] = [
  {
    id: 'highlight-1',
    name: 'Classic Cheeseburger',
    category: 'burgers',
    description: 'Prime ground chuck patty grilled over open flame, aged cheddar, lettuce, heirloom tomato, and house grill sauce on toasted brioche.',
    isPriceVerified: false,
    proposedPrice: '$18',
    image: '/images/burger.jpg',
    dietary: ['Signature'],
  },
  {
    id: 'highlight-2',
    name: 'Grilled Ribeye Steak',
    category: 'steaks',
    description: 'Thick-cut hand-trimmed ribeye with rosemary-garlic butter baste, charred over hardwood coals and served with roasted garlic.',
    isPriceVerified: false,
    proposedPrice: '$38',
    image: '/images/ribeye.jpg',
    dietary: ['Chef Special'],
  },
  {
    id: 'highlight-3',
    name: 'BBQ Baby Back Ribs',
    category: 'steaks',
    description: 'Slow-smoked over hickory till fall-off-the-bone tender, glazed with our signature copper honey BBQ sauce.',
    isPriceVerified: false,
    proposedPrice: '$32',
    image: '/images/ribs.jpg',
    dietary: ['House Smoked'],
  },
  {
    id: 'highlight-4',
    name: 'New York Cheesecake',
    category: 'desserts',
    description: 'Velvety baked cream cheesecake with buttery graham cracker crust and macerated fresh bourbon berry compote.',
    isPriceVerified: false,
    proposedPrice: '$12',
    image: '/images/cheesecake.jpg',
    dietary: ['House Dessert'],
  },
];

export const GUEST_FAVORITES: MenuItem[] = [
  {
    id: 'fav-1',
    name: 'BBQ Bacon Burger',
    category: 'burgers',
    description: 'Thick beef patty basted in tangy copper BBQ glaze, thick-cut applewood smoked bacon, crispy fried onions, and sharp cheddar.',
    isPriceVerified: false,
    proposedPrice: '$20',
    image: '/images/bbq_burger.jpg',
    dietary: ['Fan Favorite'],
  },
  {
    id: 'fav-2',
    name: 'New York Strip Steak',
    category: 'steaks',
    description: '12-ounce center-cut strip with bold marbling, coarse cracked pepper rub, charred shallots, and herb compound butter.',
    isPriceVerified: false,
    proposedPrice: '$36',
    image: '/images/ny_strip.jpg',
    dietary: ['Hardwood Grilled'],
  },
  {
    id: 'fav-3',
    name: 'Loaded French Fries',
    category: 'appetizers',
    description: 'Golden hand-cut russet fries smothered in melted Monterey Jack, crisp smoked bacon bits, scallions, and house ranch drizzle.',
    isPriceVerified: false,
    proposedPrice: '$14',
    image: '/images/loaded_fries.jpg',
    dietary: ['Sharable'],
  },
];

export const FULL_MENU_ITEMS: MenuItem[] = [
  // Burgers & Sandwiches
  {
    id: 'b-1',
    name: 'Classic Cheeseburger',
    category: 'burgers',
    description: 'Prime ground chuck patty grilled over open flame, aged cheddar, lettuce, heirloom tomato, and house grill sauce on toasted brioche.',
    isPriceVerified: false,
    proposedPrice: '$18',
    image: '/images/burger.jpg',
  },
  {
    id: 'b-2',
    name: 'BBQ Bacon Burger',
    category: 'burgers',
    description: 'Thick beef patty basted in tangy copper BBQ glaze, thick-cut applewood smoked bacon, crispy fried onions, and sharp cheddar.',
    isPriceVerified: false,
    proposedPrice: '$20',
    image: '/images/bbq_burger.jpg',
  },
  {
    id: 'b-3',
    name: 'Grilled Chicken Sandwich',
    category: 'burgers',
    description: 'Herb-marinated chicken breast charred over coals, creamy avocado, crisp butter lettuce, and garlic aioli on toasted sourdough.',
    isPriceVerified: false,
    proposedPrice: '$17',
    image: '/images/chicken_sandwich.jpg',
  },
  {
    id: 'b-4',
    name: 'Pulled Pork Sandwich',
    category: 'burgers',
    description: 'Slow-smoked pork shoulder shredded warm, tangy Carolina slaw, sweet pickles, and toasted potato roll.',
    isPriceVerified: false,
    proposedPrice: '$18',
    image: '/images/pulled_pork.jpg',
  },

  // Steaks & Grill Favorites
  {
    id: 's-1',
    name: 'Grilled Ribeye Steak',
    category: 'steaks',
    description: 'Thick-cut hand-trimmed ribeye with rosemary-garlic butter baste, charred over hardwood coals and served with roasted garlic.',
    isPriceVerified: false,
    proposedPrice: '$38',
    image: '/images/ribeye.jpg',
  },
  {
    id: 's-2',
    name: 'New York Strip Steak',
    category: 'steaks',
    description: '12-ounce center-cut strip with bold marbling, coarse cracked pepper rub, charred shallots, and herb compound butter.',
    isPriceVerified: false,
    proposedPrice: '$36',
    image: '/images/ny_strip.jpg',
  },
  {
    id: 's-3',
    name: 'Grilled Chicken Breast',
    category: 'steaks',
    description: 'Tender double-breast marinated in citrus and fresh thyme, flame-grilled and basted with light honey mustard glaze.',
    isPriceVerified: false,
    proposedPrice: '$24',
    image: '/images/grilled_chicken.jpg',
  },
  {
    id: 's-4',
    name: 'BBQ Baby Back Ribs',
    category: 'steaks',
    description: 'Slow-smoked over hickory till fall-off-the-bone tender, glazed with our signature copper honey BBQ sauce.',
    isPriceVerified: false,
    proposedPrice: '$32',
    image: '/images/ribs.jpg',
  },

  // Appetizers & Sides
  {
    id: 'a-1',
    name: 'Loaded French Fries',
    category: 'appetizers',
    description: 'Golden hand-cut russet fries smothered in melted Monterey Jack, crisp smoked bacon bits, scallions, and house ranch drizzle.',
    isPriceVerified: false,
    proposedPrice: '$14',
    image: '/images/loaded_fries.jpg',
  },
  {
    id: 'a-2',
    name: 'Onion Rings',
    category: 'appetizers',
    description: 'Thick sweet yellow onion rings double-battered in craft beer batter, served with smoked paprika dipping sauce.',
    isPriceVerified: false,
    proposedPrice: '$11',
    image: '/images/onion_rings.jpg',
  },
  {
    id: 'a-3',
    name: 'Mozzarella Sticks',
    category: 'appetizers',
    description: 'Crispy herb-crusted whole milk mozzarella batons fried golden, served with slow-simmered San Marzano marinara.',
    isPriceVerified: false,
    proposedPrice: '$12',
    image: '/images/mozzarella_sticks.jpg',
  },
  {
    id: 'a-4',
    name: 'Mac and Cheese',
    category: 'appetizers',
    description: 'Cavatappi pasta folded in rich four-cheese fondue with sharp white cheddar and toasted sourdough breadcrumbs.',
    isPriceVerified: false,
    proposedPrice: '$10',
    image: '/images/mac_cheese.jpg',
  },
  {
    id: 'a-5',
    name: 'Coleslaw',
    category: 'appetizers',
    description: 'Crisp green and purple cabbage tossed in a light buttermilk and apple cider vinaigrette dressing.',
    isPriceVerified: false,
    proposedPrice: '$6',
    image: '/images/coleslaw.jpg',
  },
  {
    id: 'a-6',
    name: 'Baked Potato',
    category: 'appetizers',
    description: 'Jumbo Idaho potato salt-crusted and baked tender, served with whipped butter, sour cream, chives, and bacon.',
    isPriceVerified: false,
    proposedPrice: '$8',
    image: '/images/baked_potato.jpg',
  },

  // Salads
  {
    id: 'sl-1',
    name: 'Classic Caesar Salad',
    category: 'salads',
    description: 'Crisp romaine hearts, shaved aged Parmesan Reggiano, herb-buttered garlic croutons, and house lemon-anchovy dressing.',
    isPriceVerified: false,
    proposedPrice: '$14',
    image: '/images/caesar.jpg',
  },
  {
    id: 'sl-2',
    name: 'Grilled Chicken Salad',
    category: 'salads',
    description: 'Charred sliced chicken breast over mixed farm greens, cherry tomatoes, cucumbers, pickled red onion, and balsamic glaze.',
    isPriceVerified: false,
    proposedPrice: '$18',
    image: '/images/chicken_salad.jpg',
  },
  {
    id: 'sl-3',
    name: 'Garden Salad',
    category: 'salads',
    description: 'Tender artisan lettuces, shaved carrots, radishes, English cucumber, and light shallot herb vinaigrette.',
    isPriceVerified: false,
    proposedPrice: '$10',
    image: '/images/garden_salad.jpg',
  },

  // Desserts
  {
    id: 'd-1',
    name: 'New York Cheesecake',
    category: 'desserts',
    description: 'Velvety baked cream cheesecake with buttery graham cracker crust and macerated fresh bourbon berry compote.',
    isPriceVerified: false,
    proposedPrice: '$12',
    image: '/images/cheesecake.jpg',
  },
  {
    id: 'd-2',
    name: 'Chocolate Brownie',
    category: 'desserts',
    description: 'Warm fudge brownie with dark Valrhona cocoa chunks, served with Madagascar vanilla bean ice cream and warm fudge drizzle.',
    isPriceVerified: false,
    proposedPrice: '$11',
    image: '/images/brownie.jpg',
  },
  {
    id: 'd-3',
    name: 'Apple Pie',
    category: 'desserts',
    description: 'Spiced Honeycrisp apples baked in flaky all-butter crust, dusted with cinnamon sugar and served warm with bourbon caramel.',
    isPriceVerified: false,
    proposedPrice: '$10',
    image: '/images/apple_pie.jpg',
  },
];

export const MENU_CATEGORIES = [
  { id: 'burgers', label: 'Burgers & Sandwiches' },
  { id: 'steaks', label: 'Steaks & Grill Favorites' },
  { id: 'appetizers', label: 'Appetizers & Sides' },
  { id: 'salads', label: 'Salads' },
  { id: 'desserts', label: 'Desserts' },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'What is your maximum online reservation party size?',
    answer: 'Our standard reservation system accommodates up to 8 guests. For parties of 9 or more, please contact our team directly so we can ensure dedicated table arrangement and staffing.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'Redfern Table & Grill is open Monday through Thursday 4:00 PM – 10:00 PM, Friday 4:00 PM – 11:00 PM, Saturday 11:30 AM – 11:00 PM, and Sunday 11:30 AM – 9:00 PM. Note that these are developmental schedule placeholders subject to restaurant verification.',
  },
  {
    question: 'What is the table cancellation policy?',
    answer: 'Table reservations may be cancelled without penalty up to two hours before your scheduled arrival time. This allows our host stand to release the table to waiting guests.',
  },
  {
    question: 'How do I get in touch for special dining inquiries?',
    answer: 'You can reach us through our contact form on this website, email hello@redferntablegrill.com, or call (512) 555-0198 during normal operating hours.',
  },
];
