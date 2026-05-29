// data/products.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in kobo (₦ * 100) for precision
  description: string;
  image: string;
  tag?: string;
  tagColor?: string;
  rating?: number; // 1-5
  reviewsCount: number;
  tags?: {
    icon?: string;
    label?: string;
    color?: string;
  }[];
  details?: {
    cookingTips?: string[];
    nutritionalInfo?: string[];
  };
  weightUnit?: string;
  images?: string[]; // for product gallery
  relatedProducts?: number[];
  weightOptions?: any[]; // for "you might also like"
}

export const categories = [
  "All Meats",
  "Beef",
  "Goat Meat",
  "Chicken",
  "Turkey",
  "Rabbit",
  "Meat Sharing"
];



export const products: Product[] = [
  {
    id: "bonelessBeef",
    name: "Boneless Beef",
    category: "Beef",
    price: 9500,
    description: "Lean boneless beef, fresh-cut and perfect for stews, grills, and frying | Per Kg",
    image: "/images/CORRECT PICTURE MEAT.png",
    tag: "Popular",
    tagColor: "primary",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/boneless beef.jpg" },
      { label: "1kg", multiplier: 1, image: "/images/boneless-beef.avif" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],

  },
  {
    id: "edoAndShaki",
    name: "Assorted Cow",
    category: "Beef",
    price: 8800,
    description: "Assorted cow parts including shaki and edo, ideal for soups and traditional dishes | Per Kg",
    image: "/images/assorted-cow.jpeg",
    tag: "Popular",
    tagColor: "primary",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/assorted-cow.avif" },
      { label: "1kg", multiplier: 1, image: "/images/Assorted edo(Liver) and towel(rumen).png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],

  },
  {
    id: "gizzard",
    name: "Gizzard",
    category: "Chicken",
    price: 8100,
    description: "Fresh chicken gizzard, cleaned and ready for frying or pepper soup | Per Kg",
    image: "/images/Chicken-Gizzard.jpg",
    tag: "Popular",
    tagColor: "primary",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/gizzard.jpg" },
      { label: "1kg", multiplier: 1, image: "/images/gizzard.jpg" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],

  },
  {
    id: "goatMeat",
    name: "Goat Meat (Ogunfe)",
    category: "Goat Meat",
    price: 10200,
    description: "Fresh Nigerian goat meat (Ogunfe), tender and perfect for pepper soup or stew | Per Kg",
    image: "/images/goat_meat.webp",
    tag: "Nigerian Breed",
    tagColor: "#131811",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChJIkEqLxquKnKL72P3ytDdGwCZzlGptR7pjVVW0ciTgT5zJccPz-XRr1YJ_SugCWDJmWgg6QA1JZCy-wrqCQ5CmPQYftsS47uJ-j5LmtsPJOLnhbQpX8zLsiRxL78OUeQq7eJaRvLV53g20M4UiOQ6EdYln8zXmRjlQQcEXVFXGLWFecD5e4FYu9ZrhrC2gt8dDqvoOgCU3FbzsHmNuzKmmeEIbDNflvRuspaa3rVqnI4LNjSrTHvPbFz9mQxSTRIS1vp2SOZxY0" },
      { label: "1kg", multiplier: 1, image: "/images/Boneless goat meat(Ogunfe).png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "chickenDrumstick",
    name: "Chicken Drumsticks",
    category: "Chicken",
    price: 6200,
    description: "Juicy chicken drumsticks, fresh and ideal for grilling, frying, or stews | Per Kg",
    image: "/images/chicken_drumstick.webp",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU" },
      { label: "1kg", multiplier: 1, image: "/images/chicken image.png" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/chicken image.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "bonelessChicken",
    name: "Boneless Chicken",
    category: "Chicken",
    price: 6400,
    description: "Juicy boneless chicken, fresh and ideal for grilling, frying, or stews | Per Kg",
    image: "/images/chicken_drumstick.webp",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU" },
      { label: "1kg", multiplier: 1, image: "/images/chicken image.png" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/chicken image.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "chickenNeck",
    name: "Chicken Neck",
    category: "Chicken",
    price: 3700,
    description: "Juicy chicken necks, fresh and ideal for grilling, frying, or stews | Per Kg",
    image: "/images/chicken_drumstick.webp",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU" },
      { label: "1kg", multiplier: 1, image: "/images/chicken image.png" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/chicken image.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "chickenHeart",
    name: "Chicken Heart",
    category: "Chicken",
    price: 3200,
    description: "Juicy chicken hearts, fresh and ideal for grilling, frying, or stews | Per Kg",
    image: "/images/chicken_drumstick.webp",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU" },
      { label: "1kg", multiplier: 1, image: "/images/chicken image.png" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/chicken image.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "rabbitMeat",
    name: "Rabbit Meat",
    category: "Rabbit",
    price: 12500,
    description: "Lean rabbit meat, low-fat protein perfect for healthy meals | Per Kg",
    image: "/images/rabbit-new.png",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "data:image/jpeg;base64,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" },
      { label: "1kg", multiplier: 1, image: "/images/rabbit.png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },

  // Add more products (total of at least 20 for demonstration)
  {
    id: "mincedBeef",
    name: "Minced Beef",
    category: "Beef",
    price: 10500,
    description: "Fresh minced beef, finely ground and perfect for burgers, meatballs, and sauces | Per Kg",
    image: "/images/minced.avif",
    tag: "Premium",
    tagColor: "gold",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/minced.avif" },
      { label: "1kg", multiplier: 1, image: "/images/Mincedgrounded beef.png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "assortedGoat",
    name: "Assorted Goat",
    category: "Goat Meat",
    price: 7800,
    description: "Assorted goat cuts, perfect for stew, soup, and traditional dishes | Per Kg",
    image: "/images/Goat meat assorted-new.png",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/assorted-meat.avif" },
      { label: "1kg", multiplier: 1, image: "/images/Goat meat assorted.png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    category: "Chicken",
    price: 5400,
    description: "Fresh whole chicken, fully dressed and ready to cook | Per Kg",
    image: "/images/chicken image-new.png",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/chicken.avif" },
      { label: "1kg", multiplier: 1, image: "/images/chicken .jpg" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/chicken image.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "bonelessGoat",
    name: "Boneless Goat Meat",
    category: "Goat Meat",
    price: 12500,
    description: "Tender Portions | Farm Raised",
    image: "/images/boneless-goat_meat.jpeg",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/boneless-meat.avif" },
      { label: "1kg", multiplier: 1, image: "/images/Goat meat assorted.png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  // Add 8 more products to reach 20
  {
    id: "agemawo",
    name: "Agemawo",
    category: "Beef",
    price: 9500,
    description: "Most Tender Cut | Fine Dining",
    image: "/images/agemawo.png",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "/images/agemawo.avif" },
      { label: "1kg", multiplier: 1, image: "/images/agemawo .jpg" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/agemawo.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "bonePieces",
    name: "Bone Pieces",
    category: "Goat Meat",
    price: 700,
    description: "Bone-in | Rich Flavor",
    image: "/images/Bone pieces(Egúngún).png",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },

    ],
    details: {
      cookingTips: [
        "Season generously with sea salt and cracked pepper.",
        "Sear in a cast-iron skillet for 3-4 minutes per side for Medium-Rare.",
        "Let rest for at least 5 minutes before slicing."
      ],
      nutritionalInfo: [
        "Protein: 25g per 100g",
        "Fat: 15g per 100g",
        "Calories: 250 per 100g",
        "Iron: 15% of daily value"
      ]
    },
    weightUnit: "kg",
    weightOptions: [
      { label: "500g", multiplier: 0.5, image: "data:image/jpeg;base64,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" },
      { label: "1kg", multiplier: 1, image: "/images/Bone pieces(Egúngún).png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
  id: "turkey-whole",
  name: "Turkey",
  category: "Turkey",
  price: 9700,
  description: "Fresh Whole Turkey | Premium Quality",
  image: "data:image/jpeg;base64,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",
  reviewsCount: 94,
  tags: [
    { icon: "local_fire_department", label: "Fresh Stock", color: "primary" },
    { icon: "verified", label: "Premium Quality" },
  ],
  details: {
    cookingTips: [
      "Marinate overnight for deeper flavor.",
      "Cook on medium heat to retain juiciness.",
      "Best served grilled, fried, or in stews."
    ],
    nutritionalInfo: [
      "Protein: 29g per 100g",
      "Fat: 7g per 100g",
      "Calories: 189 per 100g",
      "Iron: 6% of daily value"
    ]
  },
  weightUnit: "kg",
  weightOptions: [
    { label: "1kg", multiplier: 1, image: "/images/turkey.png" },
    { label: "1.5kg", multiplier: 1.5 },
    { label: "2kg", multiplier: 2 },
    { label: "2.5kg", multiplier: 2.5 },
    { label: "3kg", multiplier: 3 },
  ],
},

{
  id: "goat-heads-legs",
  name: "Goat Heads & Legs",
  category: "Goat Meat",
  price: 5000,
  description: "Cleaned Goat Heads & Legs | Rich Flavor",
  image: "data:image/jpeg;base64,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",
  reviewsCount: 61,
  tags: [
    { icon: "restaurant", label: "Pepper Soup Special", color: "primary" },
    { icon: "local_shipping", label: "Fresh Delivery" },
  ],
  details: {
    cookingTips: [
      "Wash thoroughly before cooking.",
      "Perfect for pepper soup and traditional dishes.",
      "Boil until tender for best texture."
    ],
    nutritionalInfo: [
      "Protein: 21g per 100g",
      "Fat: 12g per 100g",
      "Calories: 210 per 100g",
      "Collagen-rich cut"
    ]
  },
  weightUnit: "kg",
  weightOptions: [
    { label: "1kg", multiplier: 1, image: "/images/goat-heads-legs.png" },
    { label: "2kg", multiplier: 2 },
    { label: "3kg", multiplier: 3 },
    { label: "4kg", multiplier: 4 },
  ],
},

{
  id: "turkey-mid-wing",
  name: "Turkey Mid Wing",
  category: "Turkey",
  price: 11700,
  description: "Juicy Turkey Mid Wings | Meaty Cuts",
  image: "data:image/jpeg;base64,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",
  reviewsCount: 82,
  tags: [
    { icon: "thumb_up", label: "Customer Favorite", color: "primary" },
    { icon: "kebab_dining", label: "Perfect for Grilling" },
  ],
  details: {
    cookingTips: [
      "Season with spices before grilling.",
      "Deep fry for crispy texture.",
      "Cook thoroughly before serving."
    ],
    nutritionalInfo: [
      "Protein: 27g per 100g",
      "Fat: 10g per 100g",
      "Calories: 220 per 100g",
      "Iron: 8% of daily value"
    ]
  },
  weightUnit: "kg",
  weightOptions: [
    { label: "1kg", multiplier: 1, image: "/images/turkey-mid-wing.png" },
    { label: "1.5kg", multiplier: 1.5 },
    { label: "2kg", multiplier: 2 },
    { label: "3kg", multiplier: 3 },
  ],
},

{
  id: "cowLeg",
  name: "Cow Leg",
  category: "Beef",
  price: 8100,
  description: "Fresh Cow Leg | Rich & Gelatinous",
  image: "data:image/jpeg;base64,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",
  reviewsCount: 73,
  tags: [
    { icon: "soup_kitchen", label: "Soup Favorite", color: "primary" },
    { icon: "eco", label: "Freshly Cut" },
  ],
  details: {
    cookingTips: [
      "Boil for extended time until soft.",
      "Great for soups and stews.",
      "Add seasoning gradually while cooking."
    ],
    nutritionalInfo: [
      "Protein: 24g per 100g",
      "Fat: 14g per 100g",
      "Calories: 230 per 100g",
      "Collagen-rich meat"
    ]
  },
  weightUnit: "kg",
  weightOptions: [
    { label: "1kg", multiplier: 1, image: "/images/cow-leg.png" },
    { label: "2kg", multiplier: 2 },
    { label: "3kg", multiplier: 3 },
    { label: "4kg", multiplier: 4 },
  ],
},

{
  id: "ram-meat",
  name: "Ram Meat",
  category: "Goat Meat",
  price: 16000,
  description: "Premium Ram Meat | Tender & Flavorful",
  image: "data:image/jpeg;base64,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",
  reviewsCount: 140,
  tags: [
    { icon: "workspace_premium", label: "Premium Cut", color: "primary" },
    { icon: "outdoor_grill", label: "Great for BBQ" },
  ],
  details: {
    cookingTips: [
      "Marinate with herbs and spices before cooking.",
      "Cook slowly for tender texture.",
      "Ideal for grills, stews, and pepper soup."
    ],
    nutritionalInfo: [
      "Protein: 26g per 100g",
      "Fat: 18g per 100g",
      "Calories: 280 per 100g",
      "Iron: 18% of daily value"
    ]
  },
  weightUnit: "kg",
  weightOptions: [
    { label: "1kg", multiplier: 1, image: "/images/ram-meat.png" },
    { label: "1.5kg", multiplier: 1.5 },
    { label: "2kg", multiplier: 2 },
    { label: "2.5kg", multiplier: 2.5 },
    { label: "3kg", multiplier: 3 },
  ],
}
];
