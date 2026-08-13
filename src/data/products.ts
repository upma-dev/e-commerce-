import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'ocean-breeze-crochet-bag',
    name: 'Ocean Breeze Granny Square Bag',
    tagline: 'Handmade sky blue & warm ivory granny square sling bag',
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 38,
    category: 'Crochet Bags',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Inspired by gentle coastal waves, this iconic granny square sling bag is lovingly crocheted stitch by stitch. Crafted with premium ultra-soft milk cotton yarn in pastel sky blue and butter cream yellow. Features an ergonomic wide shoulder strap and a durable inner lining with magnetic snap closure.',
    shortDescription: 'Signature granny square sling bag handcrafted in pastel sky blue and soft cream milk cotton yarn.',
    colors: [
      { name: 'Sky Blue & Cream', hex: '#87CEEB' },
      { name: 'Sage & Butter', hex: '#C5D5C1' },
      { name: 'Rose & Vanilla', hex: '#E8C4C4' }
    ],
    dimensions: '11" W x 10" H (Strap Drop: 20")',
    materials: '100% Premium Milk Cotton Yarn, Organic Cotton Inner Lining',
    careInstructions: 'Gently hand wash in cold water with mild detergent. Lay flat on a clean towel to dry. Do not wring or machine dry.',
    handmadeNotes: 'Each bag takes approximately 14 hours of continuous hand-stitching. Small color or stitch variations are a mark of true artisan craftsmanship.',
    estimatedDelivery: '3 - 5 Business Days',
    isNew: true,
    isBestSeller: true,
    inStock: true,
    tags: ['granny square', 'bag', 'bestseller', 'sky blue', 'crossbody']
  },
  {
    id: 'pastel-bloom-crochet-bag',
    name: 'Pastel Bloom Daisy Shoulder Tote',
    tagline: 'Cozy floral motif tote bag with reinforced handles',
    price: 1999,
    originalPrice: 2499,
    rating: 5.0,
    reviewsCount: 42,
    category: 'Crochet Bags',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A delicate tapestry of 3D crochet daisy blossoms blooming across a soft beige field. Designed with spacious interiors to carry your books, iPad, water bottle, and daily essentials with effortless cottagecore charm.',
    shortDescription: 'Spacious shoulder tote featuring raised 3D daisy flower motifs and reinforced straps.',
    colors: [
      { name: 'Daisy Beige', hex: '#EFEAD8' },
      { name: 'Blush Pink', hex: '#DFB2B2' }
    ],
    dimensions: '13" W x 14" H x 3" D (Strap Drop: 12")',
    materials: 'Comb-spun Cotton Yarn, Magnetic Snap',
    careInstructions: 'Spot clean preferred. Hand wash cool if needed, reshape while damp.',
    handmadeNotes: 'Features 16 individual hand-assembled daisy flower squares stitched together.',
    estimatedDelivery: '4 - 6 Business Days',
    isBestSeller: true,
    inStock: true,
    tags: ['floral', 'tote', 'daisy', 'aesthetic']
  },
  {
    id: 'cozy-ribbon-bow-tote',
    name: 'Cozy Fluffy Bow Tote Bag',
    tagline: 'Ultra-soft oversized bow tote bag in warm cream',
    price: 2199,
    originalPrice: 2599,
    rating: 4.8,
    reviewsCount: 29,
    category: 'Crochet Bags',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'As seen on our viral Instagram post ("Bro chose his bow to look like that 🎀"), this cloud-soft tote bag is crafted with plush chenille yarn. Features a statement handcrafted oversized bow detail that adds instant cuteness to any outfit.',
    shortDescription: 'Plush velvet yarn tote centered with a plush statement bow, as featured on @tweehaven.',
    colors: [
      { name: 'Butter Cream', hex: '#FFF8E7' },
      { name: 'Dusty Pink', hex: '#E8C4C4' },
      { name: 'Charcoal Black', hex: '#363331' }
    ],
    dimensions: '12" W x 11" H x 4" D',
    materials: 'Super Soft Velvet Chenille Yarn, Soft Cotton Canvas Pocket',
    careInstructions: 'Hand wash gently with lukewarm water. Air dry away from direct heat.',
    handmadeNotes: 'Crocheted with plush thick gauge yarn for a plush, cloud-like squishy feel.',
    estimatedDelivery: '3 - 5 Business Days',
    isNew: true,
    isBestSeller: true,
    inStock: true,
    tags: ['bow', 'plush', 'chenille', 'viral', 'cream']
  },
  {
    id: 'honey-flower-crochet-pouch',
    name: 'Honey Blossom Zipper Pouch',
    tagline: 'Multi-purpose organizer for makeup, hooks & trinkets',
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 51,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Keep your lip balms, crochet hooks, coins, or stationery organized in this adorable handmade zippered pouch. Fully lined with matching cotton poplin fabric and completed with a cute tassel pull.',
    shortDescription: 'Handcrafted zippered cosmetic and crochet hook pouch lined with cotton fabric.',
    colors: [
      { name: 'Honey Sage', hex: '#D8E3D5' },
      { name: 'Warm Apricot', hex: '#FAD6A5' }
    ],
    dimensions: '8" W x 5.5" H',
    materials: '100% Cotton Yarn, Brass YKK Zipper, Cotton Lining',
    careInstructions: 'Hand wash or spot clean. Do not bleach.',
    handmadeNotes: 'Hand-sewn zipper and custom crochet pull ring.',
    estimatedDelivery: '2 - 4 Business Days',
    inStock: true,
    tags: ['pouch', 'accessory', 'organizer', 'zipper']
  },
  {
    id: 'marshmallow-bunny-plushie',
    name: 'Marshmallow Bunny Amigurumi',
    tagline: 'Handmade crochet bunny plushie with satin bow',
    price: 1299,
    originalPrice: 1599,
    rating: 5.0,
    reviewsCount: 64,
    category: 'Custom Creations',
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'An irresistible handmade friend! Crafted with velvety plush yarn, safety eyes, and decorated with a silky satin ribbon bow. Perfect for nursery decor, cozy desks, or thoughtful handmade gifts.',
    shortDescription: 'Ultra-squishy plush crochet amigurumi bunny stuffed with hypoallergenic polyfill.',
    colors: [
      { name: 'Snow White', hex: '#FFFFFF' },
      { name: 'Oatmeal Beige', hex: '#E6DFD5' },
      { name: 'Pastel Pink', hex: '#F8D7DA' }
    ],
    dimensions: '8.5" Height (sitting)',
    materials: 'Soft Velvet Yarn, Hypoallergenic Fiberfill, Safety Lock Eyes, Satin Ribbon',
    careInstructions: 'Spot clean with a damp cloth. Gentle surface wash only.',
    handmadeNotes: 'Made in small batches with double-stitched safety features.',
    estimatedDelivery: '3 - 5 Business Days',
    isBestSeller: true,
    inStock: true,
    tags: ['plushie', 'amigurumi', 'bunny', 'gift', 'cozy']
  },
  {
    id: 'crochet-flower-keychains-set',
    name: 'Garden Charm Flower Keychains (Set of 2)',
    tagline: 'Puff flower bag charms with golden keyrings',
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 88,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Add a touch of handmade joy to your keys, bags, or backpack. Set includes two 3D puff flower charms in complementary pastel colors with premium gold-plated keyrings.',
    shortDescription: 'Set of two handmade crochet flower charms with gold-tone lobster clasps.',
    colors: [
      { name: 'Pastel Trio', hex: '#E8C4C4' },
      { name: 'Ocean Mist', hex: '#87CEEB' }
    ],
    dimensions: '2.5" Flower Diameter',
    materials: 'Mercerized Cotton Yarn, Gold Alloy Hardware',
    careInstructions: 'Spot clean as needed.',
    handmadeNotes: 'Hand-woven puff stitch petals with reinforced loop attach.',
    estimatedDelivery: '2 - 3 Business Days',
    inStock: true,
    tags: ['keychain', 'charm', 'flower', 'gift under 1000']
  },
  {
    id: 'cozy-checkered-coaster-set',
    name: 'Pastel Checkered Mug Coasters (Set of 4)',
    tagline: 'Thick absorbent handmade mug rugs for cozy desks',
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 35,
    category: 'Home & Decor',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Protect your surfaces with cottagecore aesthetic mug rugs! Thick, double-stranded cotton crochet construction absorbs condensation and holds hot teacups or coffee mugs securely.',
    shortDescription: 'Set of 4 checkered yarn mug coasters with cute fringed edges.',
    colors: [
      { name: 'Sage & Cream', hex: '#C5D5C1' },
      { name: 'Terracotta & Beige', hex: '#B8866B' }
    ],
    dimensions: '4.5" x 4.5" (excluding fringe)',
    materials: '100% Natural Unbleached Cotton',
    careInstructions: 'Machine wash cool in mesh laundry bag. Flat dry.',
    handmadeNotes: 'Crocheted with double strand cotton for heat protection.',
    estimatedDelivery: '3 - 4 Business Days',
    isNew: true,
    inStock: true,
    tags: ['coaster', 'home', 'mug rug', 'checkered']
  },
  {
    id: 'crochet-cherry-hair-bow-clip',
    name: 'Crochet Cherry & Bow Hair Clips',
    tagline: 'Delicate handmade hair accessory pair',
    price: 499,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 47,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Intricately crocheted mini cherries and pastel ribbon bows mounted on gentle hair snap clips. Adds a sweet vintage touch to half-up dos and braids.',
    shortDescription: 'Pair of handmade crochet hair clips featuring mini cherries and dainty bows.',
    colors: [
      { name: 'Cherry Red & Leaf', hex: '#D9534F' },
      { name: 'Butter Yellow', hex: '#FDFD96' }
    ],
    dimensions: '2" length clip',
    materials: 'Soft Microfiber Yarn, Alligator Clip with Felt Backing',
    careInstructions: 'Keep dry. Wipe gentle with dry fabric.',
    handmadeNotes: 'Felt wrapped non-slip backing gentle on soft hair.',
    estimatedDelivery: '2 - 3 Business Days',
    inStock: true,
    tags: ['hair clip', 'bow', 'cherry', 'accessory']
  },
  {
    id: 'eternal-crochet-rose-bouquet',
    name: 'Forever Bloom Crochet Flower Bouquet',
    tagline: 'Never-fading handmade yarn flowers wrapped in kraft paper',
    price: 1699,
    originalPrice: 1999,
    rating: 5.0,
    reviewsCount: 73,
    category: 'Home & Decor',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A keepsake gift that blooms forever! Includes 5 handcrafted yarn flowers (2 Roses, 1 Tulip, 1 Daisy, and Lavender stems) arranged with wrapping paper and satin ribbon.',
    shortDescription: '5-piece handmade crochet floral arrangement in gift packaging.',
    colors: [
      { name: 'Pastel Sunset', hex: '#DFB2B2' },
      { name: 'Lavender Dreams', hex: '#E6E6FA' }
    ],
    dimensions: '14" Height x 8" Width',
    materials: 'Milk Cotton Yarn, Floral Wire Stem, Aesthetic Wrapping Paper',
    careInstructions: 'Dust gently with soft brush or hair dryer on cool setting.',
    handmadeNotes: 'Each petal individually hand-shaped with flexible internal wire.',
    estimatedDelivery: '3 - 5 Business Days',
    isNew: true,
    isBestSeller: true,
    inStock: true,
    tags: ['flower', 'bouquet', 'gift', 'decor', 'eternal']
  },
  {
    id: 'custom-crochet-gift-box',
    name: 'Custom Crochet Cozy Gift Box Set',
    tagline: 'Personalized gift crate with custom items & handwritten note',
    price: 2499,
    originalPrice: 2899,
    rating: 5.0,
    reviewsCount: 31,
    category: 'Custom Creations',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Our signature pastel pink gift box curated with your choice of crochet bag or pouch, a flower keychain, a bunny charm, and a handwritten personalized message on thick textured cardstock.',
    shortDescription: 'Bespoke gift crate in signature pink packaging with custom handwritten card.',
    colors: [
      { name: 'Signature Pink Crate', hex: '#E8C4C4' }
    ],
    dimensions: '10" x 10" x 4" Gift Crate',
    materials: 'Custom Crochet items, Kraft paper shred, Satin Ribbon, Wax sealed card',
    careInstructions: 'Delivered in sturdy protective outer shipper.',
    handmadeNotes: 'Includes wax seal note and personalized initials label.',
    estimatedDelivery: '4 - 7 Business Days',
    isBestSeller: true,
    inStock: true,
    tags: ['gift box', 'custom', 'personalized', 'birthday']
  }
];

export const CATEGORIES = [
  {
    name: 'Crochet Bags',
    tagline: 'Granny squares, shoulder totes & cloud bows',
    count: '6 items',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
    color: '#FAF6F0'
  },
  {
    name: 'Accessories',
    tagline: 'Keychains, pouches, clips & daily trinkets',
    count: '8 items',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    color: '#F4ECE1'
  },
  {
    name: 'Home & Decor',
    tagline: 'Forever flower bouquets & mug rugs',
    count: '5 items',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    color: '#EFE8DC'
  },
  {
    name: 'Custom Creations',
    tagline: 'Made to order plushies & custom gift crates',
    count: 'Bespoke',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
    color: '#FAF0F2'
  },
  {
    name: 'New Arrivals',
    tagline: 'Our latest slow-made seasonal batches',
    count: '4 new',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    color: '#EDF2EC'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Ananya Sharma',
    rating: 5,
    date: '2 days ago',
    comment: 'The Ocean Breeze bag is even prettier in person! The sky blue yarn is so soft and the stitching is extremely neat. It easily fits my wallet, lip balm, and phone. You can tell how much love went into it!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop'
  },
  {
    id: 'r2',
    author: 'Priya V.',
    rating: 5,
    date: '1 week ago',
    comment: 'Ordered the Fluffy Bow Tote after seeing it on Instagram @tweehaven. The packaging was like unboxing a sweet present from a close friend. The bow detail is chef’s kiss! 🎀',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop'
  },
  {
    id: 'r3',
    author: 'Rhea Patel',
    rating: 5,
    date: '2 weeks ago',
    comment: 'I requested a custom pastel pink bunny for my sister’s birthday. The team was so warm in DM/communication and sent progress photos! Truly slow fashion at its finest.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
    caption: 'The kind of bag you’ll want to carry everywhere. 🌤️ Sky blue + cream granny squares',
    likes: '1,240',
    comments: '84',
    badge: 'Same hands, different chapters ✨'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    caption: 'Bro chose his bow to look like that 🎀 Fluffy velvet cream tote bag in progress',
    likes: '2,150',
    comments: '132',
    badge: 'Trending Bag 🎀'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
    caption: 'POV: Someone just adopted a marshmallow bunny 🐇✨',
    likes: '980',
    comments: '67',
    badge: 'Custom Order'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    caption: 'Rainbow pastel hooks & late night studio sessions. The peace hits different after midnight. 🌙',
    likes: '3,420',
    comments: '210',
    badge: 'Behind The Scenes'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    caption: 'Packed with love and tied with silk ribbons. Orders heading out today! 📦💖',
    likes: '1,890',
    comments: '95',
    badge: 'Orders ✨'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    caption: 'I’m only gonna show you things I’ve made... You decide if it’s worth following 🤍',
    likes: '4,100',
    comments: '310',
    badge: 'Handmade Story'
  }
];
