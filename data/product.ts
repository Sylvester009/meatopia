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
    price: 8500,
    description: "Lean boneless beef, fresh-cut and perfect for stews, grills, and frying | Per Kg",
    image: "/images/boneless-beef.avif",
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
    name: "Assorted Cow (Edo and Shaki)",
    category: "Beef",
    price: 8700,
    description: "Assorted cow parts including shaki and edo, ideal for soups and traditional dishes | Per Kg",
    image: "/images/Assorted edo(Liver) and towel(rumen).png",
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
    price: 6200,
    description: "Fresh chicken gizzard, cleaned and ready for frying or pepper soup | Per Kg",
    image: "/images/gizzard.jpg",
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
    id: "cowTail",
    name: "Cow Tail Pieces",
    category: "Beef",
    price: 4500,
    description: "Tender cow tail cuts, rich in flavor and perfect for slow-cooked soups | Per Kg",
    image: "/images/Cow tail pieces.png",
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
      { label: "500g", multiplier: 0.5, image: "data:image/jpeg;base64,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" },
      { label: "1kg", multiplier: 1, image: "/images/Whole Cow tail(Ox tail).png" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/Cow tail pieces.png" },
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
    name: "Goat Meat Ogunfe",
    category: "Goat Meat",
    price: 9500,
    description: "Fresh Nigerian goat meat (Ogunfe), tender and perfect for pepper soup or stew | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChJIkEqLxquKnKL72P3ytDdGwCZzlGptR7pjVVW0ciTgT5zJccPz-XRr1YJ_SugCWDJmWgg6QA1JZCy-wrqCQ5CmPQYftsS47uJ-j5LmtsPJOLnhbQpX8zLsiRxL78OUeQq7eJaRvLV53g20M4UiOQ6EdYln8zXmRjlQQcEXVFXGLWFecD5e4FYu9ZrhrC2gt8dDqvoOgCU3FbzsHmNuzKmmeEIbDNflvRuspaa3rVqnI4LNjSrTHvPbFz9mQxSTRIS1vp2SOZxY0",
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
    id: "chickenThigh",
    name: "Chicken Thigh",
    category: "Chicken",
    price: 6000,
    description: "Juicy chicken thighs, fresh and ideal for grilling, frying, or stews | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU",
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
    id: "turkey",
    name: "Turkey",
    category: "Turkey",
    price: 8400,
    description: "Premium turkey cuts, tender and ideal for roasting or stews | Per Kg",
    image: "/images/turkey.avif",
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
      { label: "500g", multiplier: 0.5, image: "/images/turkey.avif" },
      { label: "1kg", multiplier: 1, image: "/images/turkey.avif" },
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
    id: "rabbitMeat",
    name: "Rabbit Meat",
    category: "Rabbit",
    price: 6000,
    description: "Lean rabbit meat, low-fat protein perfect for healthy meals | Per Kg",
    image: "/images/rabbit.png",
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
  {
    id: "quarterCow",
    name: "Quarter Cow",
    category: "Meat Sharing",
    price: 250000,
    description: "Quarter portion of a full cow with assorted premium cuts, ideal for bulk sharing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQbR1CyicR7894IARByAgDEa5MauSWQsfNw&s",
    tag: "Best Value",
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
      { label: "500g", multiplier: 0.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRQbR1CyicR7894IARByAgDEa5MauSWQsfNw&s" },
      { label: "1kg", multiplier: 1, image: "/images/Cow leg.png" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, image: "/images/Cow head .png" },
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
    price: 7500,
    description: "Assorted goat cuts, perfect for stew, soup, and traditional dishes | Per Kg",
    image: "/images/assorted-meat.avif",
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
    image: "/images/chicken.avif",
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
    id: "halfGoat",
    name: "Half Goat (Every Friday)",
    category: "Goat Meat",
    price: 50000,
    description: "Half goat portion available every Friday, ideal for events and family cooking",
    image: "/images/half-goat.avif",
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
      { label: "500g", multiplier: 0.5, image: "/images/half-goat.avif" },
      { label: "1kg", multiplier: 1, image: "/images/half-goat.avif" },
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
    id: "bonelessGoat",
    name: "Boneless Goat Meat",
    category: "Goat Meat",
    price: 12000,
    description: "Tender Portions | Farm Raised",
    image: "/images/boneless-meat.avif",
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
  {
    id: "halfCow",
    name: "Half Cow",
    category: "Meat Sharing",
    price: 500000,
    description: "Large Family Bundle | Mixed Cuts",
    image: "/images/half-cow-meat.avif",
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
      { label: "500g", multiplier: 0.5, image: "/images/half-cow-meat.avif" },
      { label: "1kg", multiplier: 1, image: "/images/half-cow-meat.avif" },
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
    price: 8500,
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
    image: "public\images\Bone pieces(Egúngún).png",
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
    id: "chickenHeart",
    name: "Chicken Heart",
    category: "Chicken",
    price: 3200,
    description: "Skinless | Lean Protein",
    image: "data:image/jpeg;base64,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",
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
      { label: "1kg", multiplier: 1, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMWFRUXGBcYFxgXGBgYGBcYFxcXFhkYHRoYHSghGholHRcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xABBEAABAwIEAwYCCQIFAwUBAAABAgMRACEEBRIxQVFhBhMicYGRobEUIzJCUmLB0fDh8QdygpKiFTOyJENTo8MW/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QALREAAgICAgEDAwMDBQAAAAAAAAECEQMhEjFBBBNRMmFxIkKxgdHxFCORocH/2gAMAwEAAhEDEQA/APHQK7ArYTWAUo6RtIrtVhXTLU1FijJCRQGqlZCBN6kApixhhAHKpWcADJItQ5pB9psVhM1Mhqm+HwII+zxrpzB3MWAFD3FY3svsSqRWNtSYokpvW0GCCKoSo5GGvFcOtwYo7XN+NcOswBzNLFux5RVaAkt1oNbmp1WB61ihpAFHyL4BdNbVRCkzwrEIuKIAdKCTWPovRgRcq4UMpHGgtsL0iAorZRRCG6xaa6zqImkxNRiilo2rnua44HrDepyzXOjagGjgptUjaSAI41jgtUiBcchQCjFiZqBSa7WYMii0pChIodDdgIRXDg2o5bVDPJ+dcmBxNBNQrotxBBoZ0XpoizVGNCozXaDBFbcRfam8idoirKk0VlEBuukpqQNV2hqlHOZhJNc5exqJWa5xHjUEJ9abIbCExStjxVmNxtR+FSdQt4eJoJjSTAuab4baJqOTRox7OwASYtwFCZkrSmOYo9xSbnkOFLThXHDKoFDFBt2HLNRVCru63opk5hECxcE8rVDhktk6SfF861PRjSvRC2zIjnRq8HIngK7aT4oHAVO46NCo4VKUnZeMY1sRkalwNqlxzABABmisswOoFRtNcqwxCo3posSSYL9HMitKa3pspuTfgKDW3+9cpWdKFA7qPCI2odtI40xcT4QPWhQ1TJ6EktmgwdxUKWzJNH4e1jUymQQCn2pWx1EWP8BXSEiKkfR4q6SmK7wDyQlIqBSL0eEVx3RihYaAnEbVlr10+CDUa1W606RNsjItRDaYFFt4EqKEJSSojYCSafsdhcYpIIagHmb+1Bhiq2V87WoJ5FjXoeC/w1dUJceSg8gJ+NKu03Yt7DpKrLRG6dx6UlUUuxC5hwQlU7ihHWd52o5u6U24VxiGtUipRbTLSimhZ9GB2NEMNApPSttYLSZJrvDgJKp2qkpX0yUY12gUorK6cIJ3rKYFI7QmsfVoSTx4U2x+DEiLAUjxP1rgSPsjeujLkrBKLi6N5dhzBXxO1TaSd6n1cBsKyKpFE5PwjvAtwsVZWsIkkEmBF6Ay7Cxci9optiHy2E+EG+3PpWfK+UkkasK4wbYvxz6GgVK8I4c/KkT2auveFlOhPFX9f2ovtPiAvYeFV/b5QanwLaVJBRtHtWiktIyttu2JHMlURIVKhe9vY0GQT4uP8vVtASOBUeAHPrVuyXsawB3jiQ44oTB+ykncRN7zvvFBuh4YnPooWR41R8KkFRJhJAkyeBq5u9jvqRrUQs7JQNRJPDqfKrVi0KabSEQADsIj22pz9IbwzGp9YKt4HXYDmYqbps3QxcEr2eO411OG+qdlKuWkzHO+1GdmsGnGKOgKCE/bcVASnkkDckzRWf41jEOKLrfhUfCSPs+/AiPWmuTY9hvDLaZaS2tUHUk/aKbgmdjYc660hn6OTld6/gMwvZRhN3DqPKbf1otzB4Ns+FCJ2sASPeq2xhsbiidCSlIMFSrJn0Bn0pxh+zpa/wC86V8YHg+Nz62pbZqjixx0GsPYfWmUDTP4RvRGAcZLjrq0spbR4RqSEEEHSSTxm+wpjlDOFJCAwgiJJUSo/wDKaU9pOyTaVfSWlQhKtZa+4CLak8ouYo+CTlBz4tUxSvsux3q3FIK0TZtKilIkTcgSfK1LM37PN6dWHCgr8ClAg9ATBB8zV5wKdSD1g+4qtZ49G32h8R1oWMsGOVqjz11iTBBSoGDPOpHcPsKuGDytvFJUYhSDpJTYmwMnnSnH5U60bDWkcQLjzH7U1mGXp5RtiMtxUakWo10gzQOONoHE1y2SlpATqwZjeo2m5UBFStNbzT3sflZfxbSAJAOpXkP4KtRnu2enf4b9mAhoPLQNa733CeA6VdHmgnYftXLbxbEFFhyqJ3NEEXtShF+IMGY86V4k6yWzdJ+VMHl6iSBbhQqWvFMVwTzDtVkP0ZQ0ToVPp0pBarx2/wAXIA5n2iqQTFZpqma4O47NOmBMcKAxigfEk8qLU7aKHWnVYC/COdGKrsWbvoAWgTWU4RkKyBMA1lP7sfkn7Uvg32gxehMcTSvLGjBJ41C+svOnkDTVpvhVIRpE5y5OzSG6aZJhApfiiBeDxoNCYp7kTYCSeJMUMrqLGwxuaCoBWAeG3WszFmE+LiakxjaEkEyVDYDif0FRBzWZWJ6cqzxV00aptbTK1m+DOmRsbjz4/vS7LErCvCSE/euQI51c8Xgkq0gGBdR5AAf3obs92c+mqJujCpPCxdUN/JNalLVmT225UhEnO096220PDrTqXG41XjkOtez5UZbBETxquYzKG8OghpsISB0+dWLIsUlDJcIkCI6kianytnp48Ht49O7Bc07w+EJJ5HYe5tvVdzXKcc4jUvSoiwGo6gOG4An1r0BjMEqBUmL3gCDWJxKVcL0aGWWS8HiylKQuHklKhP2hHrexphkuCcdfbToUlBN7EApFzB2r1DFZQlYCikFQIUmQCARcbik+aZoEQcQHN4K2SkKSDzuJHUVObcelYXnlFXBWWF7EJaSEpAAAgJAsLWqqZkp1ZnSuOqTQD30J5UJzJ1J20Okpvy1ER86FxGWIak9048PxJV3o8/qtJ+FQnnku0Yo+rePx/P8AYbZdjktLGpwJP996sWGzZL6VNGFJUlQMGBcdapeVqwqlgnDuFe4Cm16THCVajPmAOtPMa46pI/8ATFsC4Kikx6JmrRyWui8MkcrSad/gmyXMUpT3TjqUKSCFC0FQiCFco+dVvtEoA6goKk3IPD+Cq32gwOIQ8pxlCihV1RcA8xymisTkGMdwuoDST+Kb8Y/KTTVZr58G35/kP7B582krKjpKlGDwEm0jlXoL3dugSRMbg/rxrw7K8M4wvQ8gtmNlCJHMcCOoq/dlH1Pp7pJAVMg8IA6UX8CR/VHndMb43IEPSAglQEyn7QA5/wBaqGNyF5DoaSgkqnSSI23mdokVfDjjgtyk6idZJjqPSknaXtWHGUONxKXgJSd0gHVHMbD2rkvgz+oSautfInw/YLEK1eJIUElWm944TTD/AAvQWsU8FABYSBCt7EzFXjBYhGjvAQSpIMjaCJFeadpMx0Y4uNmCEyettjQhklX6jJPFG7ieyuZmCIIFAltCjc/tXmOSdqg+vSpWkj41bznTaE3VVbJcPgswQkW1ACo05rh1IWEHUUnQfOKoOPzZT1p0o4meFVjE9pWMOVJYlR2MbE0OXwHh8kvb7FjvAgHbxH5VWO+HOgX8wW68pS7lQ9qJwWGU4rSkfsKnKu2Ui30jspKiAlOpRosOdzyK/lRpUhlJQi6yLqP6UmfVxNzSJ8/wO1x/IWt9ajOuJ4VlDIFhWUtDkGX4bQnqaPQmKwIorDYcrISkSeAG5raYSJps0zy5wiQkSRx4JP79KlzTJXGg0QQrvkBaFDaOM+VM8TlJw+hJ8OtIXIMgzxnnU5yTVFMaadg+FlO41E7k71jrap1JEUVh21dDXeK+zBESRy23/T40kfqpFpKo2xPmKNa2sOlRCnlDURuGxc/AE+lenZZgUNsgIhKUjYGABwsKUf4aNMqOJfcSNXed22SJOhsAEDl4pmKvS8Q00CQgAm5gCad7Z2KXFVW2ef56SEqUFBSeInp/WlOW9oGvopbKhrSoDTPihMiY48KueKzkLOpTbSW7iVJCioG0xG01U8J2dwOJxTh7tMBPiKU+EQfupNkqUT8DaxpKPRU5cdro6GagaS2QQoX9NwaJwnaH8osbRT3/AKLhm0w2wknm4NatoP2v0iqVn2VFHjw4jiUSYPOJ28tq46MlLwWDMe0h7vTMFQOqDcCbAdTck8uVVbM8zSpvRz3Jqqv5/CiFgpVsQR+1PP8AD9lvF4zS8mWEJUtwqnSq4SlJ5Ak8dwkiupnLLjinQw7HdgO8aD+L1q13bQCUDTwWpQ8Umx02sb32tOCwrSXnVLbQViAFlACxEgmetjO/tV7xjaFIhBAgeGOHlFULOcWUOKlA2idUybjYdKMoryZcFT01s6CignUsqTq8MmTHKePrXD+c6iEpBMWEUtxmZtJTBlR5D+fKkeMz4bJATNuppfsjfGEYrod4vGaFd4FeIbAc/lVjwmZofw4XbWkALA4KAvaqcns7jX2StCAlR+yHFaVK4nSkj/yi9Nex+VvttracaWNjI0qvcX0k0UqIZcil/QPbdbWgsYhlLyLlGoCUjiBy522vSHsxkTuFxPeBaS14oTKgoA7C48UWpricvUdlELAOk8fKKiZcIIC3EyLRsR6Gg2PDHF9nPaxpLpQCJSCSTExO8z868sTi0/SxeUCEkDlN/X9q9pRp4Qar2d5BhNK3nm1QBMteFy245H1oxZH1OK4a8CJ7tK9hGjhwnUQpQSrgEm/txHnSTLmlurWtdyUqUfaj8ZpPcuQSFNpI1dJRe2/hFZhAUGUncEG3A000u0edBt0n0jns/wBlvpK9U6Up5GFHoI+dW3Ef4e6mCpDziF30eKQQOBmuOweAUXVOAGAnTyFz+1eg43EJCYGwEVBuXNu9GhRXFKtnz3isK8kqbUtUpMESaCGFI33q15/jEnEuwJvw50ndEkRvYzTx5eSclEWYLDEv6QLm3vVoBDUtoEczQPZ5qcWmTcjfrNN+0uH0KlHOpZJXNRZTFGoOQoeT4jeaFWL0Q26NJKhE0I/51VISTMLtZUQrVdxO5MchFMsoPda8SowlpJj8zigUoSOsmegFQstj70x03qLNXS6EMJICZkJHCfmoxv5U+aTqjIy6pBcwaWyoK0guoUQZAKlEotxSNXtRkfScEm6VOMWBE3RHW/Co8NmAGJUgaQgpGkcinUVK/wBadZ8vOluCxX0bE4hCkFTc6ikcWj94dRuPI1gWSXhg9xrojw6J/KamxsgJmDHlx/tWsQtlD/dtuhUpC0DiWyLEHY8QQYIjlFTuoCinkUkzwlJFo/1H2NasU7mrNPuKeN12Q/4e5gUIIP3X3QfVc/rV8x4Ua84yN8NvPMR4tfejkQsAfMH2q5LzJxKLgG3MVbo2443GLRXu0ywkFJUfSI50V2cxaGmmtBTqdKiqOBBKQPMQf91V7NnFrSrWlV+h99qAyLEpDTibBSXgtJ43RpUD7Cl+5rkqqJ6piMYjTC1CTvETFc4jAtKHhbSPO8/tVHw2YAKkq2T/ADpua7xHbJSAQEyRxm00eQnsP9oD2y7MNlzvAIUmNQTJBTPEGTbpTHstgmg24tJCAspQhubKCQVqPMnj5TSjLset5xS1KOr4f24U57LBKm3ErACk/eJjuwZnbjKqAZ4VBqS7LNl2dBCk4eQAqdJHFXI0g7boQ19ZrAUTEJi87cZ/vVczVDwWFsug6DKYQQFRxkm9WPJ+7CA9ipLqgFCb6QoSABwsd66xPb/XcSvZd2bxeLI0JDSVWCnNzabJF9ucVc8g7G4fBkKX9diPxquE9AOH8uaFez0f+34Rta09ZH83oBfaFadgPP14V1o6WKcntl9OIgSsgJ69KrOIzIhzUwdISZ877Ryqq47tCtw+JRipMvxoW6lM9JOw/m8Vzdjxxxgm2WPtpmoLrYSqFBINuGqd+tU7tCVhAdN1DxTzHGfS/pWu2RdGMJSlRSUpKSkTYEjh5fGucMpb4FlEJ+1qBAG8i/yrq2GEorGkXH/DgF5lTyxIuEgxsOXrUefnFYqWmQhhtKTqUoSYGoSADeqbleePYJzuQhSkFRKdH2r30EbRvFXfIs+aSwp9cd4+VJbRFkhJ0hKhznfpHKuMUpNttnneLbhrDtncN3I5layJ9IqbAr1JEm4sR1rjHPa3pSDpTMQNkiEpsNh5UIw/pfIBsoSL8f5NGT3RkgtWP1dtFYZHdNsq4hSrSeJoDF9u3VoKW0KBPFXD0rvEN6iQRIvHqKAcwoGwk0iiijlIXYRCiSVXJMknrRCwOdFqZ2EEeVDOMEW3HOrRpkJWjvJ3AnFIN/7EU77UOp71JJI4mP1qvZaIxCPUfCmeZrXpSVbEHxGDcGKhPHeSy+Of+3QrdkmAYty3qMYYq9ONdl60E3HHz/StreuInb0p2mhFJPYKpuDF63WlKvvWUAjuSogT7VLkjQ715yDLaPDf76tiJH3QCr/QK0y4R4gISPjQ+WYspGMc4htRHsUj4kU+ZNxIKn2H9nFq14ZybuLaSQd4BcSQfMACrZmGEKnC2hQS+z3gZJgh1sSFMq5xwoLIsmS0rAa7aG1Pr/0JJn/kmqs9nzi3HAQrU4+HWlAwW1kQR5Hwex5151W9GfyWLJ8pbxAUoJu3dWj/ALrKtleD76OaeINq0rAus6XWS2rDiVy2SsKVBCkpn7EpJ8B2JFzRWExr2GxDeIcaBLyAoKSIKj99sxAJnnf2ikuIddaxuIewyltMrcUQUpK0GYJDjY6zwNPB1+RoyphWftRoxbUnSBqjZTSoOr0kHymrlkePQpIMCQOPlwmqVl2aaFlt3QGlq+rUgy2lSvtNyfspUqSAfskkbbQuY5WGcKDKU/c5QPu34jaDW6+S5I9L0mRVwl/Q9QdxbMeIp9aV45rDLB1NIPnHz4VRU52VqnVI6H5Cj2s1B+7PQn2pbPQjjS2mGYrJcLfSotk8ArfymRVRznIHWpW0vvU8tlfsfhT/ABmauzCuHBNo/WrDhMEx3Kn3nCU3CRGlRPXjNjYcq5Bm0lt/8HkjOfwdISSqYg2E7Xr1bKcgcbwhVqCy4QtZ2AjxXB4Ax7VSu1+RtpY+kgQ6FCB+JJUNJtxgg16tlHZ/vmwpalIbUB4BuoHnO3tRr4MjzTjKpvQoxPZtL4RqKglKUmECCrSBBkHj6V5xnmJcwrxbcUo6YAMRbhbyr3pzLW1tuNNPKQrSUa0kFSTET5ia83zvsqll9tzHfWo0IQFglSdSZusETJn2HSuaKYs3LUXTKM1jlLulKz/lSo/IRWYnMFJspCx5pNenYROGVPBA2AhIPnxPrao8d3JI0AeooOi6Un+fweSO58nbSSaY5Mt9xQ0t6R+IzVhzXs2w6SSgJUOKfCfh+s0BiGX8MjwnWgbK4pHUD5iuteCXCabc3r7DnA4RwGVq1GdyadvN60K2mLRv5156rPHNMiD5XJ6/KoH8/WhV1EKjcb9P4K6gvLFIMzDEuFegpPefd0iduI57V0xmT6klb4CEp8CEgRB2Ur1v8eld5BnBS1JQNXi0uK3hQHw4z86r2ZZ4pUoRx3J39BwqkV5Z5+fNeosct4zDlV3Ak/ign4gTWs6w6QpK9epW8jYpMFPC9j8elKsoyoLHeuAhPLZSyOR30zufQX2NzB4KuqAnp7BI67DpaaKXkzuT6DEOGJm/ztUb72xk3uY9qjwi9QOwtbyg1vHNwhF+hHtSxSuhpN1ZyvFzsIsKkL6VwJ9+dAEyAK4UmDT8ET5sJQ1pfaI4qifhRuMxiQlTZBJCyY2ERt70pLsKQr8KgfiKJzCe9XPHek4XLZRTqGgJRm8RXJBtUyorjWQfnVSC7JXMOZ2rKMRsKystm2gh5RMJHmfLhQeBbl55qYCwJ6gKSv40e0n73P4dKV4hwNYlC+ECfSx87RWiStGVMtjeK141DbqlFBwymyE8B9VAEbQT50jVljupTmk6UuadYuNQVoUDyIPDjNtqs2RMN/Se9WQPAkJ4bvsE9Ngf2oXs5jXG3CtMLaxLhS62oWClrIC+XH/iQdxXm5EoyonkjUh5ic8QhppGKQoNOhJ1pAJYe0pUVJH3kGZjqd5qQtM4kFLg0PJGrW1P1rf/AMrYnxGBBBkjkSLjdudCX2mlaQ1oEkmwKdTd+KZbOqfyVX38lxaYRhXkqLau8bbUdDiTsQkLiUqFjpUQYB3FJTvjIRkmdvMJlKn0PsrGhSkJ+saI21gC/nYiNjVcw+cgfU4gh1sQEuJ8RA4T+NO35hHHamz2BfW6XHGShaz421Atkk2soiL87gnzFB4vJW3ZQ0oIeG7ToDbs8gR4XBWjDNRdFIfFkD+UONQ7hlJdaMkC6pE3AvwqbLMzDYJKkhc/YAO995jTwpJh8Y9hHFJEoUDC0KEpPmk/MQeRp4nNMHihD6e6X+Ik6fMLF0+vvWukzTizyg/kb4XNSpaSSiTYDuwVT5nb4716DgOziV4YIdKiVeOZuCpJHDkFEV53luVNogkqW2YKVpVqI5aTMG/OrjlfaY9yUKUErSCElWykjaBz6UrTRqWb3NJ0J86yhf01DbmksIShxcq3CDA8IvJOnbkat683cWkD7IM+EbxNgTzjgKoreetqxBnVKbrJNlG0R5Amocy7RkWbUU/mtPpypbNSxRe+y2HtIGVgJ5wQN79OdWzFOB1lQ2JFvPhXheGzXxE6rgggm9wetXjI+1ReBSqBBjex611k80Y2nEU5rhFDx4cKMA942L6Y4pG5HMCeltg8Jmm3ivVozrP8O2Na/wDuCI0nxE8o41T8+WhSm8UAU97OpCUydVzMDn86CRb/AFFFpwDasSoJSL8eQinC+y6hMrGmJJIieNhVEwmeYlJbCAptrdQBAX6zuelF5v21dKe7K+7TBBvqdUCCL2hJjiOe9OoszZvU19LEPaXAhpephIUSspWgRpIIV4xfw7eV/cReFStQJRrIAEJFgeJPPy2tS7H5zPhaSRzUo6ifTYes0rfxCz9pxR6SY9tqZRMGTNyei24nKnnoSDoncRKjwvcWtyoLD9lwhUrKlxwCSkHzuSR7VV8M0FHl6CaNYQUGUquP5eKLkl2TUW9lkzHFJSCVm+yUJsqd9hZKeE+wpHiX1OL8R8uUCSP70JeZVfrRSEzB4ijZ32GWDWYg9KZ4sCCN7WI2mRQGHbAFr+IH0g/rTBCZJOwSkHz8Qqbe7LJaoXhu/p8q4TvThxAUBsBBAPTVSt9rSojlVIzslODiBY6yJFH5oIcME7A36if1obECU1PjlSErmSUjpukWrv3A/aDJFaABN9q0BNd4dICgCJExTPoRdjBdzPi9Ig9aypRhnhbvAI/KK3WT9PybqfwydKb3ttA2uaS5+rYJE6PEo8bwAPhNPHFpAKlHa56Rf+lK8O2VoWpQnXPuRIHoK1SMiHHZzG60AW1IhQk7gedvf3p5gsKWcO+uNQbfbLY/K4EkR/rg+9eb5biVMuaTYpVH7jyNejfTkqwPdtKhankrVvKAjRpT0lQkevSsXqMaYZrmkVXNnS8qVrDjsPKUoTCg4hYTEiwASkEHYp9S4ypf0zLkFSoW1AJIk6AUiecplIniN5qfLMlTiIUg/XQl3R+NCgO8SJ4pMiOWniKV5E6rCNeJJ0SpDiYvpUhSbfmTCzHOxAqD3Ejx02dJxeIaJYW+pAt4HjLawdihR8JSRsRpPSabZhhkY1sIeTofSiW138cAkoXIvYWNxyJMz28tDuHDLqUvs6ApKp0utocBUhSFHdMfdItpI2FV3suoYfEd2+VFhZ0oWVFJbWNkqAMJJ4gyNiJE10b7XfwBISuNd8lKSta4HhKk+JI5aounoT5RSjEYZSNxavSc8w2JYcMoD7YgyUpCwlUwQRAIEQZuI3uKT4pTTp8WpoXkHDrGwuZgztVoZpJ9Fk4tfcqGExi2zLa1IP5SR7xv602Y7U4gfaKHP8yQP/CKjzRjCgENPKKxwLegH3VPsDSZQPL2vWqMrOplpZ7Xpt3jHO6VTf8AyqH612nPsGqdbS72+wnpP2VW41TiqsmnOUmui2O4zAHgseSVD9f5FRIx+DQSUIeniRb/APSqyDXQoHcmWYZ3h0mU4ck81aZ97moXe0qjZLaE+ZUf2pBNcpSSbSfK9GwbY0ezZ5W61D/L4evCDQK11pGHUeHmOPtvFQu2oWdTOy5FbCNWxk8tj/WoWxRbeGJExHXdPuNqWToaKsFUiDyNYCeZo2XBuAodYPx3qdlhB+6R5UOQeBA0onei0JqROFjYz8DXRTG9MmBolZcI/m9MsvfGtRVaUEDz6UrbBqZNc42NGTQ+Rh1FCVEkApJ8vHH60szREOHjYVLg8wUkaSZTymIvNj51Dj3tatW396TGpKWx8ji4aBli1+d6lf0ltsjikfCQPgK4d29q2EfUtnb7Q/2rUP1+FUf1IlH6WQJRW3DPytWCpU4ZZBUEkp5xYQJN6eyaTY0y9BLaZI5exIrKUHpt0rKk8SLrNSGGcKnQ0BxlXly9T8hRAbCUaSLwbdTH9B6VmWsEnWrcnV8fCOm4o4YQKVuTf4/tM03JVbFUXeinZzhSFSAdr/vTPshj1F9luYJWhPRQKhwOxptjsBYwSJtBg/z+tJMiw3dY5gK4rSAdimTEjkR61JyTTHlFx2XLOP8A0n0dIUpDkpWhSRKklfeLV4fvCNAI4yPKjcXjU4xvUptKniNJcY2XcaVLbVCkkEC8ERImDVV7eaRisUESAz9HCSVKUZsSSTJJlW/lyocY9IS2/YBZ0rj7rg2IjYK+BEVi4SWvn/Jmin0WnsqtJGFSqR4nsNPFCpDzJPlqI+FD9pshn65vwAS28kCUJUk21Jt4DwUD4fDwuFys1VqSo6TBbcJG5U0SNROxMGxtIIBNquXa3HBjFhSFJ+ubSpTavsuCSJtsQNN+U7xSTjKK5UdKLXZXEdqUFpDGI1pdbEpKftKTqUlaOigEa0k7jTfiQXu9WjvG5Wk3V3YSh1PAE6QNQ6zM23redZf3p1oQpJaGoEDxp4iR9lxHEEFJg3BmtYHGBEPMKSFJuoCSnYaiBYlMbpN9IndNB1KpIW/KFbmZuI3fWPyulYI9HAQfI+9DnM0uWW2wvr3YST/qbAVH+4V6O7jm3sMjFMpS40fC4iylMqmCEnlOw2MiLGyTNMhUfrGi2tCrgKSk+cKI3HEEJimeZQ1JFVlrtFEewyCdtIO2ogj0WLH1jyqT/wDnz9pUIT+JUifJMSrz2p4tpwEx3bauJ+qSfU89qVv4tIkl3vXDI8GoonYGVXKhySQPkaRyyl9JRZIy8CwZTvF452Mc+nrFc/8ASj/ex9JsfSm2FWqPEnbciSBtvbUg+Y9aMQ2CI3BGxEpPkRIP/I9RVXkkjQsUWV45fBiJPLj/ALVb+hqVtiTEAkbxZY/07/OngwwIjnMBQ1IMcBeQf8qiegqBeB/EIA21ytHDZ0XQehoe7fY3t10KktE/nA4K3HqLj1isewqSBqME8HNvRxO3rT1WBIgLFrRrP/i6n9edSPYLSk+Kx+6vcj8qwClfqKCyb0d7etlfaya4MFPLVGk+SxY+sUQ3gVJtcKN/TmTy9xRycZpH1QKOYkEERF0mU+o9hQbmJCLqgTwjf0FWjCUvqIylCK/STMNoSCskFfMgQPIfrSPE44LVyPP+1c4/MFLt9lPK3xMD2pcoib1o8UjO3uxyjEkiDCh1/fep23U8yPPxD34etV9DhGxopvGHjS0Nysep5x6i4qQUrw+LHAxTFt8EeIDzFj+xrrDRODauh0rEtTdKgelYuRuPamBs0sSOXlUjKAEFJubwfNQMEe96iChwrhRoUGzUwb2NE4XEgIcSVRqTaDxBsPiaGSqsi4IiRzovaBHTOddarteNIMT8qyhyYOMfks+FECI3g3ttMX871I86YhP2f5tRDWFClDVuItwFtvKDFSqwIKiTIAG3MmJv/NqTlFF1GbREw1rQCYtaOFv60kxOBUtZcSLpI0nkpB1E+h+VWDEOhIUAfFYx5mE/qax1lCUBPBIExvJ3+PzqDflF6vTKl2lxXerxrpGnvFMEA7wCUn46fek2WvAtOsKVAUNSCdgtN49YHx51YMzwE6iRGrYWMRIiefOPKq1mOC0XHUH96aMU40ZZ46DcmzYJsTp5giUnz5fGneKWVqw5UZutA8UwCEIABk2AUTFtjYVRNc3FTs45xAhKyBcgcJMfsPamyYeXQspco0z2/JccFMtux40koXaYKeY4gi8clDiBSbMcfg1uqWzhQHR9ru3QAo7/AGQkgnpAN7itdk8xb1ltZ0pxQQpv/OtBMDrJT/spZnGAS6oz4XRs4mxIH407KAIPEEEG+9eYnxdPozr7gmXvfRnF6Ua2XUKQpAUUhSFiUmPxJncTBBozCheKaCA4W8W34m1gwHgkbKH4o3nexqrrxzrTi21qBIMKBuOJkBVxMzx3qdrNnAoKGmUwUqi4UOMgi9+MeVbnj5RvyaeMZL7hD5JSJBkkhTaoc0q/EhLk+A3skgpNuIrvDZcIJSLDcovAE/aSQVR5hQobE524t1ThQ2FKOogJIEnc7wRx9aJGeuKsQg3kWVI5x4vkaKxySK43GKDMLgrgxx8JG3kCFW8kqB/JTJrLknhokwVAQD0UCAJNrKSk9TSdOfvCbIBNj4BMeZE+4NCP5u4R4nTAtA8IA/02+VI8Emy3vQRaHMIluQuALSSQZBJ+6syAOkp5UIvHsNyEqKjOwki23GY4ct7VUHccjiqfjUKs0H3RPnTx9KvLJy9V8IsSs0I/7YCN5A2PmkjST6Cl2IxgFzAJmY4+1qSO45auIHlNDnmT6mtMccY9Izyyyl2McRmZNkDjv/Q0vdXuVG5+Ncd7wA9aHgqpiZjqyTyrQbNEJQTHQR8zUyGhBJoHJWAQa2AaOTh/Dq/MAPZR/ap8Pg/CZ4qSL8jIHxoSlQ8YWLEmpmsUpPGjHsrISY3Gr4UApsjcHafagpRkc4yiNsLmAO9jz5ftTdGJne/wPodvlVPmjMJjSne4o0dyLKWQT/AaHeaI2M9DWYTFgi0KHI/y1GLbkSm/MHcU1nUAtecdD/Wu1qISTaDbhuPl/U1Isja3kRSrMcQEgx6VwLoGdxsEgAGsodt6BEVlcKes5W4ozqF+HPmb+1H6bAA7wT0rKys0+z0Mf0kGMXKxGyAVx8E+164SgqgkwYnbYcvO/pNZWVOekh4bbFeZ8oiOR6/1HtVP7SvRI5CPe5+EVlZWiCRlyt7Iv+mgNJTFzBO3Xj70FiMuUAkj70kC2w/tWVlFtpiKKaLBk7p+jsKvqZxLY/8AtQtMf71Vi81UnHvNk6gXVpQDtdRJQfyqJPkYPOsrKy8U3JP7/wDhna2xjnOWsvJb1SErSe6c++iDCm1fiAJgfw1TM1y1zDr0LPOCDYgfEVlZU/TTlGah43/0xYvdAqXFfiPua2XVfiPuaysr0SphdJ3UT6muZrdZRAZFYHR5/wA61lZXHGwoq2qdbEW5W8zxP85VlZStjxWjG8PYn+CpEtAXPt8qysooD0dtN1KW4HrWVlMKjrCt+NM7TPrBpwnCDu5Ak6xvyHyvNZWVmz9o1YFpmlYUhEzYrUOgsIqJ7DhQUOTSj7agfjWVlZy7RXsRgoJKTaVR1gTQQVWVlbYOzDNJdEzLxSZBg1ZMqzHXbZVvWtVlMwJhmPjTPGqpjXdSj0rKyuj0GfZDWVlZREP/2Q==" },
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
    id: "quarterGoat",
    name: "Quarter Goat (Every Friday)",
    category: "Goat Meat",
    price: 25000,
    description: "Boneless | Whole Breast",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd_Kwl5SAOzhoZuDIH4GIFszlnye0Zk7X4ww&s",
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
      { label: "500g", multiplier: 0.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd_Kwl5SAOzhoZuDIH4GIFszlnye0Zk7X4ww&s" },
      { label: "1kg", multiplier: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd_Kwl5SAOzhoZuDIH4GIFszlnye0Zk7X4ww&s" },
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
    id: "fullGoat",
    name: "Full Goat(Every Friday)",
    category: "Goat Meat",
    price: 100000,
    description: "Dressed Whole | 1.5-2kg",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKEOjC4HJCMKKKmRcLn-FTW8WberVmie41A&s",
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
      { label: "500g", multiplier: 0.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKEOjC4HJCMKKKmRcLn-FTW8WberVmie41A&s" },
      { label: "1kg", multiplier: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKEOjC4HJCMKKKmRcLn-FTW8WberVmie41A&s" },
      { label: "1.5kg", multiplier: 1.5, image: "/images/unnamed.png" },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  },
  {
    id: "fullCow",
    name: "Full Cow",
    category: "Meat Sharing",
    price: 1000000,
    description: "Quarter Cow | All Prime Cuts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnThdLIZCOTbQhxICLX6WEsFUv7f5Dzr5OJw&s",
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
      { label: "500g", multiplier: 0.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnThdLIZCOTbQhxICLX6WEsFUv7f5Dzr5OJw&s" },
      { label: "1kg", multiplier: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnThdLIZCOTbQhxICLX6WEsFUv7f5Dzr5OJw&s" },
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
    id: "fukuAndRoundabout",
    name: "Assorted Cow (Fuku and Roundabout)",
    category: "Beef",
    price: 6700,
    description: "Perfect for Stew | Economical",
    image: "/images/Assorted fuku and roundabout.png",
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
      { label: "500g", multiplier: 0.5, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUWFhgZGBgYFxodHxsYGCAYGR4aIBggHyggGx0lHhgYITEhJSkrLi4uHSAzODMsOCgtLisBCgoKDg0OGhAQGy0mHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xAA9EAACAQMDAgQEAwcDAgcBAAABAhEDEiEABDFBUQUiYXEGEzKBQpGhI1KxwdHh8AcUYjPxFSRDcoKispL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAnEQACAgICAgIBBAMAAAAAAAAAAQIRAyESMQRBUXEiMmHh8BMUsf/aAAwDAQACEQMRAD8A8z24WXAU8JaA0EiAR5uemOs40PUzLRhj5RJMXAY7xxycjRuySTeYtmwXYnnMxnp7GB7DFcwrC4AMQBMFZhpJiYaO2DrQzDMIHZYgZBKgi8qCAADyJB0reo5UVZ5aLRPqQZ49PtoiuyCrHmKWXNwtxOeBjA4+2u9jtpN0sByoxhZEST6dR699Awra1GZSiwy2i7pIBDCGiMGc+mNd0NrUqU2QqiDzE5hrvP35+rpMRqIkJ8z64TywpXAeAZ5mScHrn013t9wDSBIE1IJVscNaWBjqo/IddMRm6oKrMjALUTDWkwQRyCR1OST2xzrab6xIqqQCAFYNOAFY8zHAPsfTR9WjciftAzGEIRRJs86+aBPb2JzoVn+ZTEvf8xjdCjyXMBKjjpn0I0AdUtpBFZZ4Ki6ALiWie0heveNKKqknJRVDD5kCQWzJHQjnA/no3/drcSICgECTjACXHvAk/b00NVqhVNOJIIa9Tg4AOIgYIgeupY0GHdWEqgkWAKxAE9YMSQB2kah29WwKHwwBIVpgFmgiM8yQNB7rdP8AM+YBggsB1CnH5ZHA7alLy9oaVOYYQS2cT6FgSfTSsdEfjNd2RiVChmWBxzJtg8RjTLdViqBUYNcAjBSwB4kRgEQY+/WNJ/EqfmJuDCFYMJiTk89fTUm9AEsrDBFtvTAwVOZJk/b7aVjoMNcrYpYpTJk4uzBzGZPAx20UWcGsbwtQLTCiDLEGYA69J7aWOCWm9bQPpPTlo/LOp23JRlYn3zk480mTjgSP00WFGyyEVLrkqFQCtuJBEz3P2661eWptSuHlwM4GJaSBBiB99RbncXEm0XOTdE4mMCe5jRu88PqhA70PlU2CgOQwHmgSeSAf8OdKx0BbN1Cm/JAKrjmJ80zOOc6l29b/AKhVmPJOJhVkcesjPSTnTv4Y+E69YyKS/LIYX1MKwP4ljzTPsPXXO7+C95RVqZFyFjJEQQQDgnKmRwf151LnFdspQk+kIxTUBBDAHqBBB5E44jgemuzQJRXYTZLRP1QQsSeYA6d9HV9rWvph6FRSitLQWJtOCDwSZPH21Cu4CzTfykFmAqC0hWAKyRx5p1Skn0S4tdm/CmYq6NDm0sA0NE4JnpaG6+uhNwPmNcotdSBYRi4YtjriNapRdUS4Blk3KZPCiAe09dR1F+ZUEGB9TEE9MTnqedVZJPSr1AYiPMGtA4qZzxPT8tMq0u61KpMlTbBFysBdgHFpB7fw0FJBVKbEmSWacRwOcA56HRKBWAV1JiPN1vMKAuczBE6pEsGqVySGV7ixC5afJBMEn+PtqasVMknBDBLiTExnHpxGuN7uLaIZVVWEA3QZmQOmSM8Y0DS3DMoLJKzEBiIb96e3OJGnYUM/9qgsWratQkSYElYPTpJgai8URgwCJaCMiZuHef5TqR6/0N5BZBJJkmZjrgDP31K23ml8yXYzE9BHmmOI4GgQuhAoIBBOQYJiMe+tuzDkiBBM5BiTzz00TWpU8stTGZAAIiAQwEz350H4ZuFZ6iVLmBBKkLkRjjsR00AbrOXK2AELlZ48/U9PueNY1txcLNoyJghjgEd8aKpOFp1JWaghQZxbiRAwBHXS7lbQRmS2cqOhA68xoYIKXfGAPlTAAkuRxjvrNBMin8E+pMT6xOt6WxkzzbUW6o1jSM4PdYyAeT30fSp01ps2SzENapC2pBAF2AQSc/bQO+RItyJtIgExypgk44E+/wBtd0KEeUUyQy2yBIkyoHJk+UmAeT7aAIKYBesLlK2gXMM/hyPuTHpoylTo2VEhgyIjKpJN7AmOeAREj06dOadEQ1wA8sN0kZjESuVAn3+8pSnTLkOIiRanmKE4g9AI/wAnRQWc0EoEpTJUq0uxUsbRkqpggSBBnRtGjTgRnyQwDSxJ5CpPMSpI6MNAUKgpfMW1XZri58oW2IYKuZIkHBnReFZB8qQVYEqpMTaLciTac59fu0Brd7h1vWgCLlVQGAxPMG2CwkDvAHOuhsXsALEMGZXKxlROMfUJBx6n013strNZE26tULElyssDMqTE+ScT7DVhof6fbksW/ZIGNxUuTB8sqIWIIXnnQBTN8pa8gIBDLBI8uTA78H150PQ2wFqsTaWIIHlJ7Y7EryRPGvQH/wBPtwKl4anEyVDuLusGVPUL9vbS6r8Eb0q96IxMEEVuWGMkgY699Q0UVXfVjcSBaYBVcHoJF3JPr6RoWqYuYgxIIYTifLE//wBase++DN3KldvFot+tSYxkC6I5x0nrqJ/h3fRadu1ogAeTMYmJPqdSMRVaiwtgAb945iY6keh47+muatRZFq/U1xyczM55/wA9dN3+HdzbY9CsACDKpd0jpkmf00uXwncAkf7euo5n5VSJHSLYyYPppDIaVZVVlY8gjrg/1Efx11EXAEtCglj0nkQf46l3HhtVSF+VUmYLWNHQzcR6nTD4a8HNeqiurqFBaoSCLhP0c9cY7TpOSStjSt0OfgP4TLla1cFaeCqnmp2kdE4Pc+2vVm2yVEKFRaRGkyVpwPb/ADtphtqn+euuR5HJ7OuOPihttduFWJMDpj+WpzQBmRjtoejU/PRSONXYUAVPCkKlSsjp6aSeJ/CtPcLZUU8SlQRKnIj1Hoe+rfTPQ86k0lp2gk7VM8J8U+Dq+1LOUNWmgOaYzDdSvOB7/bSB2ZWCgC0ypHUpmOOIyRr6SekD0E6pvxp4P4ZPzNwoSsVYqKbW1KsAYtGW4AujHfW8JM55wXo8apOEDG6VkArkzPOf+ONE1KpZKQSYvNpPJ/d5xzj31xRZz5UYr5jaoCk5xHqQIEkc61t9iVSoQJSm4DFlJAx/GY1qjJnXiLLWpgLIKsTbEDmTGBPXW9ujA/JY/s2FyoMXLGTnqI660S4DWqGCghsiSryfzH9NBmllSCTLBVUTxxHHuI99USGts5ewLfTJwREzHbouTrl2Fr02dcYnqCD24JM59tD7iUdgVBb6Abo5IP37a78QpKCARLkS8ADOeD29fTRYHXhrsmQSpVWAwDdxAIPSDqPwigVqs7YQqVvMGDjMahSSUta4CTkXEN0AxOe2pg71AWa1cksLQI5x300IY1nKmot0q5YJdM2QOg5BPGgdqikA2w6tFwBIkQPMIzGiGqAKWDyygRdBj09ODqCymKRqU3aVMlQYx1MdJPXTYkwCoASZtmeqZ1mtPWBMlgSc86zSpDsJsHA8pmWBJIGTzGZMYjr+hZ2wXFN4FMuxJJEvi3y9x2zGut7s/NcvmXyqD0LG7HUH6SfuIOt0FNwVzNzEWwQCWDSCTkwRb250ABVqRXzsQZECOZUcH1kSfz0VR2rAE/LuLoZTBtpkmBcfpOOTiY134ft6VRpLSVSSCV5Ayeg4kZzgai8Pq1BTqQDaGUGZBeSFUkTnAMjqT7aAIqG0zarZvUEGJ6ggDibsc8/nqweEeCPXdArkXuCqXQbQQruAThQegHCjSSnUamGYqk+ZnU4HTyjMkQOnGr9/pdRJqVajKtyUkW8czUZ2IjpEHj97rpoRdvA/CKe2pLSTIUAFjyxAiT/Tgab01HXQgfXfzdOy6GKU0PQ6G3FBBoYbmNcVt4DotARVqY0K8a43G60Ka0qx9v5/01m2ikgoFe+uGI76VfP13Tqfw1m5o0UAio40GzXGAddJt3f0GplpBO2uDLm5ul0dWPFx2+znbUCOv+dDB40bQET7/prmmw12Xz/ntoiWw+i2ilqaXU6mplq6sgYpV0RRqaXU20QGiNVFNsmWkHu2Maqvinwhtq7mpVpF3YyWLvP/AOsD0GrJTrx+WtHdzrvhjSRxylbKifgbaZikwLTJDvOY6z6DWz8E7eGAFQB4uF7ZI4MGYOBnVrTeaI/3ix01pSIPOfEf9PqZJanUYE0ylrgMoBzjhlIPUHVH8S2NfbVlpbhQ6lblI62zhWwMT2GvdatQHSXx3wtdxSNMxPKN+63Q/wAiO2k0B4tu0BawoQZQjMy3JAbpIP5662+2qLUqrMBSRcACRyIjtdz763uEhwHpOvlKEZ8hUQzA4levHOhlIaoFQNN5uyQHUScECSSNSIx9ofKtQQXp33fVNv0iB1iB01hWxmJ/9QGAO0COcz/LU+73PlpsAii6FSCSJIEN1P0jpoTxnzzUS5yhmq08EGIA6ACBoALejfTdWMC49v8AjBDdcHMnrpXuGZmX8YAIbGBAxPTE6Y1awDMQprUnh+lqAiDgdYj764obf9mVVp+iZzCnAxPEkfnp9i6JaPgtyhigBI7jpicYzzrNIqu4KsV4gkQCQB6AdtZo5IOLHmyZgGWohKHzADFgwoYZ6RIHJga7+SBVNrsqkMBIOBayzZk3RPJBJk6hO8VaVWTezEOsCIaYEexKnrwdbbbmBJdQS3nbJwQ0NGALi3+HUlBLM6lGUIEYg2kA5CAMt0Yi2IHfGuHRWQ2AC9EaS1sMW6r38pEjpqOpuDStAS4AWgsYJOTMEwrAxgDGZ1O+yalTUsqfMdlbPQQWNzEyR9ORmAfbTEc7UmpTUsRcFK3E5KfS1ot4tYNceca9G/01pqNvVKmV+aEU44pog5BMjJP315ju6NiE0wjgLLmeRCwQn4QCryeQI9NetfAtO3YUjEXtUfthnaP/AKhdNAOK1TUZ3Goq750vr7tRywH31jKaRsothe43WltbfnUVfeJ+8v5jSat4rSJMOD7axllr2aRxjZt2TqWnV8je4/nqs/8Aja58vHrovZ+Ju8IqAXGRPP8AYazeePyaLGxltvMSB30+2PhnVtZ4L4WFHcnJPc6abqsFEAgep1i5Of0apcfsG3ACiJjQK0AScj3n2+2uatW45V26zMDM/u+3H9dTJAGZkAYHOM5GcnI+2kkiroiNOAenX076Cr1iCR7/AOfrpiwERjg+/wCWlHiIODPSeOvbRJV0ODs7G/8A5/x1JS8R9dV/dVypntzzqJN8Ykdh6znWfJl0i70N7340bS3YPXjVBp+I8hTz+Xt6aZeHvWtNqknka3w5UnbMcuNvSLrSrfV6IdAncap+58Wqq1jP5jiBP5Y50cm5qgCFZj110Ly030YvxWvY/bc67pbgnSHa78ObTKsOVbB/vptttbRyctoyljrsaI+sJ1Cja2G1opGdHlnxpTd99WpmFVSthjn5ihyJ9WJ/TVcouWYOAAQ0+acW8A9MwPXVv+O6DNvyisQWpUmFqgmReJzjAXVWWh5KzG0SVkAgZBOZOOkkeh1TRmjN2BXBBamhvvY/ikkwDx+nfUC0xafl8sktwAc57ZyQRnjXVBgKbureeVNkzcJUN6sAYE9I11uNwSGVlAZiAYxFksDdwJPI66QAmzikHSYlcElsHOYGLsam2a2VP2f0hW7ybcx6c9o1oJTFlRqgDsbYgwAMgknkWxnUx3AqgGmoAWpBAJlr5n2k4jTELdwqBj8xPPMn75H6RrNG7fxBlUKVprGIYCRHQzmdZpDO6OzYQi2WxN5zBdgInMxdAjOZ0wapBCKnlKRUPmyWjF3JKgSvSZzpeAhJtA+WhYyrKPLKtwZBPlwOueNHUt2tYBmGFDSSbTx0GBBgmCTx6aSGSeI7kPLmkfqYC4gwLacGcwCScCMM3fQlQAl1aooqwxUNaAcHM45DABcGNAJYfm2qxV2dFBuJk5B6zCn9Bzo+lUSpaUK2qytVkSXBziRMyxmABMaAOt4xLKFCWKwAuK+ZmhgesAGef3j9vZvD9qaW3o0uqUkUwIyAAce+vK9jtmasquHKNWYqAp8rVCgEsD9K+YmQPpnodeo7/dNdjAGozZljjbNMWJzeg2l4Pdl2j0H9dLfH/Aqb07FWIMgjme89fbTHYeJThtM4Da8+Ulk2dijw0eK+J+D1qRzlf3h/Mc/4NLaKieIAH5kyftz/AA17hufDFbppLuvhKm5kqPy1i8bXRpyTPMdtQuICgye33H99Xz4c8EgAkZ6nTrYfDFOmZCgacCmEGhYm3sfJLogIsXSfdOt3mJB7zx6hf5+mo/FN/c1ivbOAfX3/ALaU7fbErLMbyRg4xg/rHrq3KtIFH2xnt2VQeTOYgGe5JyeZPpHrqQVRPHBGZ5Ixx9h/h0MjlRAmSIPsB+vI/wAGsq07RPDD6ojGD07R/AaExNHe4r8+366BrPcAeOOOueP46iq1s5HEj7ETzHoe/OodvUIORg5gfc+/H8zOdVdgtAW+UR6R6dNV9yFnvn+P6atO9pkjA/Mc/wCCOuqtuVIJBA7SB0GM9e39dZSWzRDD4dQNWk/SqkntyB94mc6tzVTTDsuZGANU/wCFrlqMxEh1KR95J44EHTXZ+IQ5pKLVVcaI0J2Q7DbFa1Pd/wDVputwBHmFw7dYE+urrQNNxfTI441Wfg8/MpVKJ+qjWcf/ABYl1+0GPtp7/tRRcVOFYw/aTwdbwTi69ES39lYTwysy1UqYrIxZGHE5Ig/ukY/7an8L+KU+UPmf9UG0r1J7+mrhuqQIu/X015ifDp8SqoOJv9rhn9Z/PQrh+kl1PssFT4uFNh8wgBjCqBJ/rq07bcq0EHVB8O8G+d4k55p7dVT3qNn9Af4a9AoeL0Kb/JFsrgjHOtcc5J/kyJwi1pFP+P6P/mkJW5TtwSOD5HbKn97zAffXn26prc9jFf2kWE85PXiRxHrr0L/VIZ25UxcGHIEgFfKCRHLAx6a8/oUVYEWm2+5mMknzWhSvCkngjnjXezz/AGSV9mVqMREKgYKxF0gjzenX00E238zCTwYJkqxEEHHvz66Kqb0LuFLGCyurxIMZxJ+w740T4VfdTCqVvVptN0rJmZz19P00qtgR7fb03q0nqkG6LxIIJE8QMYAxqDdsabEUFYU7mJPcSYieYH8dMWoBKF4DFkreQT9QHCloiZM+saBaqZWeJJQnoLiTPTHEaoRyN1QxePNAunJnrPkP8dZqWngQxpXSZnGZPTWakZlEJbUarVsyEFig+ZYBWJkiDGBy3Ojtu4BCqA95KkOBimVmR3LYMdPMM50LsVvVkAYGRBUEiLmJc8SZwDPBPSZ1U2rIfmNAVnkFYtPXuQZtMmMAz1GkMK2u2VakO5VjdMLIgYa5pMsIP2AMiNR7fwpVhWZlKkqBEfVBkzF0Qkx1M67rfsyCJM0prDytcVGQCOeWx1Ig4OteIGqXvg25Z7jTwFIWZxd39PWDqkJl2/0y39IValNg19QAK0grCAEriBIDLmPTtq9b/Z68/wD9O6QarWqLbdTS0KrAghoIMiYMcwOWbXomw3BaabkFhwe+OPfE/wDbXB5Nc6OzBfGxDVokHto/w/fkYOpN9Tg6V7wRB7Ea41+LOrtFnSuCMa6NTVapeIEEiJjseJyJ0TS8VDRGZ4x21o5E8RrV3UaXbvc3YBj7axq4bQtan21HJlJIHr7SRAmQcH+3UQSO+uKO0Yk3LiAuBGRyeCOJ/voygTPOfX+uib/5fnz+WDrSk9om2tANPb2xlfLdPlz7yD6Nz/PUW5p5JJEEzM+kY79Mk6PFXBnI6Hn+Gl28IIyxPtxMmMj8vy76VAJd6iySpJLTzPWMSM89ekeuglWIMW5OCArE5zmJ7QeZnHOsqpHBE9ZyTMcERHTnrHadR0qgZSDkwLgQAcjnBz1J5jPbSTKobUqd1MYg8EY+oY6fYzpD4jtM4EzECME/w/XVi8MTDSIPlBHrEyMmeeTnvpP8Q1WWoFWJcY9GJgce/wCmlMqJqvWXbVqN+EkIfZhbJPuZOmtT4emsHGD/AC1PV2lDfUfl1YFSIPST3X/MaeeGUvk0FO4YKUFpZiPMFwG9yI++lCCYSbQn+Htoqb7cIOSqE/YLqx73bTeh6rgevI/WNJPhvxLbvvKrU6qMzKDb+IBcHHPVdW2tTBM9ddkI2jnnPZX/AIe3H+428HkSPv8Anqp/DCBt3uazdBTU+kAsf4jTb4RqNt6G4ap+GpU+5BIx9xqm7XxX5TbgVabGnXAVwhAZYWzEkFpAzxrNtaNGtstvgu+Sltm3IUk1HqVFUDzOXZioA9RbHprj4S+G3E1tz/1ahLN6SSYH586B8H+LKTyxX5ag2U7oJWIyRwJ/lqy7bxmqEZsVliQEADH2kwT+Wp03THtK0TePeA0WosYUWqxVv3TBzrx96bmslIYF4VpOWUrfLdDEGCIM9tegeL+I1t9tWFNTRUea3ksq5Ib37d9ecqoBuU2qahanaGhiALiMSIEmJgcca7cEoyT4nD5EZRl+RDvdqK1ZVowxUFCwW0Ej0MknnP8AbRWyooWSA68rmQQYGYnpb2+2tpXFNoemt1wYl58qgg3hROD5hOOnpojaUllatZmRb2JCTkEEgwMR+mI10I52BbSoEquwdmRJKLzfBIkzgcke51KVVq1SnUohckKQ2FBhhAOG5j7wNdPXNU1CICsBkSC3DkZ6/wBDGhalcNTJtLfLCKMks0lusenUfnoEdKAAAa2QMwEgHqBdn89ZpdX2VV2LKEIPeCe2cc6zU7+B0hwKtgp00QohFpGfPN0EkAyJJiOgJOeO99v6tSnQQGopURBAOWgdYERMTHGOmhlpFTTIey0z9JH0SFp5OWgmeMamfbsrVACl7QxBJkBmug8EMBj046aCiKltghVXAYi0EH8Q8xYTgG4GZJOB7HRFZXqCnMGiG80ELKt+Jgfw3ETMnBMZ1qj4it/zKjGq0fMm3IWncOJgZkzmBEiTqakLfmU3KhXYOoMmAIKr18gCkGPbTJPQf9MNogFZ1tlbaPlJIhGqE897hicY1Y/EkhgywGVlInq3EE+o/idJf9NNqtLYgAGfmOH9WWFY+1wbVj8So3AgAT649edcPmLSZ2eN3RH4mcSOudK6hldHrJoieRg5n/MaWPUgHXE3tM661QDuD5Wa62Vj6QcZj+BgaV+G+LC02EimsjK25GSMnoJ6d9MfmEtEKFt+rE3Z/KBHfnSJha7sSRSpgi1yRJz5iOx59IOBnT5aJS2P9t4u5JAABMZhgPtj9Oc+umdCuWBujnn7TxE6p+zrtNijyq0grjggGJHPmBg8zI00224Z5cg04IH1BSxERIbAwSPucnSsoftTOpUXQ233KqCSpMRkSQy9D79/vor/AHSkYwf6a1ilRDbOKtOOMZ/TE/wOl/8AtvKQMfTn+3bP9dH3D/vqNnnA7dB29dHH2Oyv1KWSv/HIPGYxyMfcfToSht2ttKy0Wm1oB4zzOFJzzn1063VPmYxxAGCPMIx1yYzpPWV6pYU4UtJbrPAOYB6DRGDY+RwniAR3WmrPIUyDiYPLH8XE86S73e16TrWr0laypcoUyoWAMnofWIGNd1KBQgNUJzAVR17afUKxKWvQ/Zx5nYgQOuOTrK7ZpVDD4d+IdruaVxtRwSGQxg9D7EZ033B29oZ3RRwCSB9p14XvvDnWvUagtS2TZCnr09p1fPhrwSqqHcbl28q4UwYA6CRycca3bS6oyV+zr4i2tNay1dtWC1QZVlE/n3B4I0/+HvjmnUBWuVp1UHmF2G9VJ/hpcnxAiOqVqChWECqkwrfusOno3B9I1SfjrZpTh0cEF+ARJ0Y2069MMiVX8D/xH4o+bUFKmLqILFyB9TGTcDxaG/P8tc7XaHd1IutgEswWTAjhRyc658A8K+eoDVACBFikSPf1+2jtt8Lbqi4elWggkiVn7HMHWcpOT2tFqKSpBPh/wLtagPytyzE/UsqCD6qQCD76ceGfClTbf9N2YdmMj9NBU/E6wMV9qj/86fPva38jqweH1PmZpVGWPwyZHuh/pq48JfZMlKP0AeMU6lPbVPlAU6jNJJm23LNkcAxGe+vJjTJa01SAVdcE4JgtAHK/ix6a9/TcsBFRQw7jn8tecfH3w+tCtTrUgoo1CSZB8lTAnAm0gnHQz3124KS4nFnTf5FL2aLLGoCYm0/MiAAM2/i8xGCTjprR3Lsqo7F6Si4oAc5BywhhzgdNBV9oQgYsGuMhQpJA47Yzx1I/LTPbGFRwJKAKxi0YKiD0aAOek66Ecx3TWiRWFZQjqxYoCRcpGLSQJbt99LUDBlJtU23hQ0XEcD6SLsdY022+xV7WpYZ3mA4H7NTBJxH0ntnn3g8d2JJapKtTdwgPlLXYbBjggE+X176bEZTrMwuCMASTgLGSfXn+etaFfcoD50KtgkK0AE5wJ9dZoAa7VAEBqoS6EFu8M2ABAuZpJJ7oO06F328IckoqBfpqG1WLCMqYgiYHBEA+sSU6kGxb2qMy1SbYuwQZF0mJgTj06amdaalvmNdCqQCzSfKqqbwJMQx/+SnvoGEbNlDsaZW50tyCoS0eeSYMsVJkTyCZnUdA0lQ1QweEaQxFyk2lFEQYUE4E8nPZd4dWNtzTYEYKlpMozKQWHUeWPUGMc6mTatYgKqWUC6VkpbBnJNwE4jmD0mAD2T4aWNnQgg3JeSMglyXJB7EtptVEgHS/wzb/ACqFGn+5SprH/tUD+WmG3M4n11y+SridOF0xftIKuBxM/nj+Q0l3uJ1ZFT9ocQSnbHPfidI/GKBzry5aSO+LtiegAwWQCAxOR3wM8DkD1+2tb9CPKSFLBlKiMFiGiDzPB9tcsxst8wghhBGR2z/nGmFTbX00LQRcpYfryeAJGmt6E1QJtdiFCSPOqlSRjBgie8QM9+ume02KqfKBBBkZyckt/wC4k86hp5bIx9OBgEf2B0NX+IqFNzTmWVL4A6e/EnoPXW0IozbY2OzFwYMwOZnMj1mS0Y6/w1zU26iCIxzOP09+o1VvFPjtabMEF+DkEQTAjI6cz7aSV/8AUCtc1qIVzaSPMAehMkRgYEe+m0mCTR6Bu9yqiXKKo6sQAPudVg/E7Vahp0VAWYNSZx+8BEDHfVM3e/q7upLEmSIWTAIEYHfnPqdXTwzw8U0AgT+KJgt2zzGpbbfGJqoqKuQwo07h1JPJJkn3OmHh/h/mmSsdo1Ftd0V7flpptd5PMe8a7lBKFI5HNuVsh3W32+3U1DTzyWPX76SDxyk4ucGD9KR+v9NWfe+GLWFr+YdB0/vpVvae22gBKFnYwiKJZj/AD1OBrjlyTpI6Y01vs4/2tFFO4qwlNRJnH2jvqh/EnxNU3htpfs6NMyqjJYjgt6dh9+2nfxDQbclX3RIRcrRUmwHueLj6n7AaC2lXbjyCiCvoo/hrN5FHovi32b8NrEbeo9TzW02eOvlF38teZVg9d2e3LGccDXsj7TbUaD1gjBmRlRCTLsQYUA/r2GvP/BPBq48lSmyHkEjBHoeDrTHk4Qb9meWHOSXotnwdtl3VK2qIqpEkYPowPI9/fVxo191RP7QCvT7gBXA//Le0L76ReHeEvTUVKWKijrww6qfQ6tngu4+cl0R3U8qw5U+2lD9tDl++wqhSpVhdTM9wRBB7EcjXP/hYmQII7Y1DutopN1N7Kg4YfwI6j0OiPh/xr599KqoSvSMOo4IP0us8qw/LI6a1STezNtpWgza5NjiSMz3GvLP9QfGjW3DbZWHyqRhgpOWMEziJVlIt/rr1Pxl/lUqtReUouwxOVUnjrxrwWReDUYisHFSAJAqEKxUyesk89vY9mKHtnJmn6QJuqlal5GKpBwWAJBgABu2CRPX7aMTZA7UgrcCFICnBLFZIj1IHPX31rxKsrFni5mFxBkI0AqbSBiAJjBzPWNcJXAV6NjXMTYgMgny+UdgBGfzg62RgTUdyUSqiBlaFtcYAURcpMm2Lxn/j6aioVoAaabIrglTgyBbcM5I468+p1m2qligDGAJAJwRkwygTkfi7DMa4oUhTS+xJggdfrJghgTJx26xI0xDHwzeUvlrFNozEJT4kxyJ/PWaWHwVG8xqkE8hjBnrgKYzrejYDbatSNaTaRAMAFcRaJLT1uBHlxqsqpqbllDBQzkZMSFOZggT/AIONMdjXemy1DVVgvmCrC4MA+UdAe/OOeNC+Hbb5bk+YuIPYMrWyZPcn6ee0zIljQwYMqLIks1jASsMJ5BGYA5zgDGSdMtqEqfKQO4uhApmFPmQdIJkWxn6p4EaSL8QltyxqQPNCxcIP0ExIJMRjjB1b/BLV3O2pmors1RCTaVJAan52EnzzyY7ep1SEz0+tzA+2tI8GddVhnUTawyqzogw+3M6W+JUJnTDZtK+oOuNyk68/JD0dcJFaTwwsQeg+3UHpol3UTTVQVUeYzweePY6Z10wVXHr2/vpRv9xSSjVW0hEVixGeJu9250Rx0OUrK/4r8abekvkmpclykfS2Yi4cHHbXle/3j1Kj1CSZJgtyF6D7CNdAA/Tx0Hp6nrqUbWemjmkarE/QLTqSPXXdPbsfbTPZ+D1WBspMwAmYxH89drs6gc07GDDFscaiU/aLjj9MP+DNlfVYxIpwe0zOr4NuZjoB+vU6WfBXgD07mLckEwOnMf31Zlo51t48U7kc/kSr8RYdqZ1PQpEaYGnrYp66+Jy8iDYbllYK30Y+39tLPEtrVbcNUQBiYVSeFUZMepP8Bpz8rOi7GMBCqD7En8+P11y+RC+jpwS+SvV/BfLduKgVepJAGgq9enRWNrtzWc8MwtWe8fUf099WVPh+kH+bUuqP3YliPYfh+0aXb992xK0KVOiv77ed/ssWr/8AbXHwrf8A3Z1KV6/gX+C+GvcNxvnF5MKDgCc2ovQf00T8aeJmjtWqUkX60CXTmCCx/wCItBH3Gu9h8PBf224qO79XckmOyr0HoNC0Kg3zVhUp2U6DAU1PURNx6Sew/XWkbX97JnT/AL0b+HPijbVQszSY4sqeWT2DHDfbVto7UKb6ZGeex9/66o+++HlceUQoPEYjtH66cfDtKtTUrBCrx2/LWkJPko0ROCUbTLKKSzLIw9Rkf11seH0XqpXQ+dAVJiCVOYI551xt94/fRqVZ11rDvZyvLXRz4mt1Nx3Rx+hGvB6NOmDNbDMJ8nkN1MuMTHltX74174+YHfH568TNiNcDARnAVlBYmzIyslBc2enOuuK0cc3sT0qLPTBQFlWm31OoYEkmcCRgNyNR77fGiqGk8oWkEEFrmUSC0YznPfpojZFPlNabm81y5JFQgr7tTHY4lgfTQVIA/LpoiJdLMzAEEqT5iTjMnKxxxxpUwtB2z2UFqhpABEIZ2cEWOAC5zcxtPI4ONRboBoWm1wHnRFHCP9XqDcD31uqrlKcqVWmAhjAh+RcJBAJTtyeuu622EymAHIUzBCyJBK4WCpMDmemdUQKNx4fULEqMT1LA/cd51mmVKpWtAvmABIkzbiZgzxrNKkO2c7dA9zWCFWFUTwpzEZgtkR1PGpttTBWFsDKVBUkjJuJ6zhXIAMzJ450XTpICtOCGVCZyxRwCq5kmTJMDrPTIE3bKHUkG8LDKsLa0LepPRj5jJxxqqEZvfBKdI0ml8vJbykWi6oTPIjmY6Adzprtq9KhuA9Val6ZMMSS5KMASDAM2iOoEZjSfaeJkLUpMGu+WzmVcSJ4EwQbTbMZgaLoUadR0RmYqqqahCgBni4XDLEksDJHrzyetB72e2UtylZFq0yCjiQR+RHuDI1phrzv4a8efauaQAagaZqQzxhYW9WzJMEmYmRPpZdp8dbFwCXqJIUwaTtF8x5kDLHlOZjGolGzWMixbZ7TouqmCR20oqeN7VWtNdARaSDcPr+np16aKpeN7b6fn05ji4DBkD8yCNcuTC6s2hkRDu/It5IgZJJwOs68m+KvEa28f5VNStES6giLgJ/at6dun31654rtL6ZFt2Djpwce2qxS+HqjNULG35oUGAMKv4c4tIxA1zTb6idmNxVyZQ/AvhhqpMnygTKEGfT0+451ffCfguiCpK3YkLMx/7j19o1ZPDfDqdPAtEeoHSOBEY0yFMRAIj004+M3+oU/L+NCyl4XTQR5V9AJP3Ooj4Jt7zViWIjjp201ND01w1E9ta/66+DD/ADv5F/y1UWqoUde5/t6agI0wehqFtodbqDRi5ID10Bqf/aHWxtjp8WJNEVusAgzqcbc62NudS4stSQRTrgxmNd250GdsdStRYgZyOusZY69G0Z2SNSXJbrpLsdj8uobnuVhAc9YLQCe4DRPWBo47DMu7N6a7qUpgRgcDQot+qBzS9k7UkjgR30JWqE4GF7f1118nWWHWkYUZudo1SEaJR9QhDqajRJ1qkzNtEzVrVLHhQWz6CdeLVgWdUqqabGr53tzIVVu/dLSx80RAHbV2+MPiBWK7SkxtLftag+k2gt8lWH4ibZI4+xjzutUqgTWqGZUqsmJYsG80QQZGJgR01ulSOeTtm95tm27uqhCFS8xzyGYhpkysTGJbHbXQItp00YgPVBbg2BlOIxaDmP688b/xHK0qpFUMWUYYlRIg83ZggHpI9tdUKFO6oGQBQQsFpnghS0wDJkQTyM6BG6bCtcoUXwVcXT5UAK8jkgEnGdacuiiFV7QJ/FlgZNvWFAGcRAxqDw2o5Y0qYoo7XEpaTggBiG6NHGDkamgM7q5JaymhHq+SQW4gBJA+x00BvZbSnYIWu3OVpmDk8Z41mkVHdvaIpA+uOn31mptBQ8aUCPHmEtjFrWkRFxJtIMjHbW6tMwqNjzr5g3WIkmJJuIxk5PB0GzIK65VoS1pu8pFxbGCIGZ7x9pPE6bWKGzUvudo4VpZPMczKjHvp2Mz6mKAtcfLUZc201csD58Tm0dj3jLHw+96bP5TRVQrmDdEA3iJkWzA7t9tAbplNyxKU4NQD6qnBkqR9RYDrkDrGudszsq00BKMHphQSLlkAEAYBnM9mPqAgD0RfObQxUDiIteWmSPL+LgHp0g6lTfhU/YBaqIoV1UkC1gAJck/SqxjviZ1Em7YPTNN1C1WN9wKyOsjBPJVVMfVJnB0RWUDcrSJQAw4WmZyRc3IAHmRCeeTnQB3V3BZlpwKj3XAKeGUNyeACx5kxcJHMx+Io7bhqDEJeFaSuVIZhTWcgxN2udpu2p1ENJWNSs8Fit0JgGJ4zk+gI/dOpUZ9xXYO19IN5ajxkKYcLB80gKCMnMaLCh2fiDdUT/wBeoQgF4KoV4KjkXZYZgwJHeAPX+Id3WS8bh0VrEtUILHLqpzgn6sew9dLdxs0ZvIEpUmpkl8FFIFzRwe0njD9dAfNAat5kuNOJPUlghOP+MkcxA9NTxj8Fcn8jihWYVGBChrahYwGBBthe7AkgRzk9tbO9ZwKpNtyBTCx9YJLlCJIDARmRnEHQy07QpWoKjVFCEiGI8pLE9cqQR2x9ytnvbFNxuRYIpVWCsFAYBjMeZiT7BJ1ZINWq2/KqqxRS7EqtzCymGUkkDBawMQMiOME6l8G+InDyrl0VGaCSIAB8zMeTgD34xzC1UuSHBWm64AOAEVnOckCPKWUzjjBldS3LIqwaoQrBmy4ORKzImPKy3Fp7ejEOKXjVYRV+fUFN7FKBiTeQ7eU3DosmABnGNYnxPXDU6Lbip8yFDFW4PlLTM5wRETzHEaVeHvchVCzMCGuYW+VZLZ4BAtNp5HpqPcVaZUoDbXdVKEIygENEDu2TDT+L1nRYFgTxzc2oBuKpMCWNQWr5QbZKy7ZnPQc9yanxTvFeKj2gqFAUAi4ZLXEZBAJg8Y5mNVWv4e4Ib5bFbwkRcLlgdCAArBhJA4Mc6K8ZcnbtUUkX3YunPniZ6RMTGDBmANAbLVsvi6uwpsXtWpTJUwhlhOT5PL9OM5u+2u9p8WbliqgMSZyy0wOSonyicxxETnjXn2wZm20XuHCBU+llgBmGD9NwI9QYnTXbspKJJDqi/LqIsWZJg8lxMS3GJ6aVj2W6j8Wbg2qtRJvZXLoog2MygACS0iYjidR0/jiuCZCMJMWpmwfjPmAC++Tn7VKpuPM1U1QWuMWrAlBnIMQDAznp66lLV5T5bBTDCAVa2RTutkebBnmJJ09CtlopfHVcgAJTqPEm1WHAJMLdxgjJBkcZGjU+LqpVTYgJqBYscgqboNyyBIHXv21SEpVAGVmtAuBcGLaiQS8ZKggsRE4AOCdbPidZqKA1AbFloaOptIHEhpEQO/bRodstA+PK/wAtnNKlAkLIgs0sIt+ZJwA3qO2lFP8A1N3ZZEFDblntIxUGG/8AngiQIOkPjLGg4TCrVF1UTP0gAQcFVMTHGew0J4s4bdrUCWgwe89SARIBxAjj9NS2Gz0Xc/HFemqO1OiAxtK2tdJZBAJe2QGPcExkTpP4v8S7iuHp/MMFW8mEBsIBNyCYIcHzSOBHOq94jUK2WHzmQGNzR9MrM+YypAAHAGONEUdygj5KXK6FmUoA4JwRdEIrY6cINULZz+wqLdSL/NQqRDCDEeWSYPIXI4B7nQlYKSpa6qVQO4JGL7Td0A88krP4c6l3G1VPmWOUAkgEL/6igLnAaSF7YbJk6i2DsA1QAfNVJGbbZMn6vqUgtAz15xoBEdWoyvawFQsfMBGATdAEGIK5gyDE9NR7AVBTcuFPzQXSRMn8SepCgdIwAONT0kFRqb1HAuqEs0tKxHlHS1gBJ4GgqD3mlJACghvOzAghvLHCFhPBxg6XsYVtaaOoGBmyeO8scypF2eTleOdReLgK1AUgcVA3EkAG2SQSeFXmP46KZ7glVCoYqGhSAwSLm8k8+UgkH8Q9YjruwVWpF1+mJMsVtU4iZ5jOceo0NCTB6O6ppKs1aQzzaBH1HI51mmG23RZQflgzObozJnBeZ7+us06EKaFG7dCmtjkraJB+pVkyDz/P25P3m6RUYXEvFLhYBuhTk9QFMGBrNZqE9F1sluLBmdnpMwEkGZUEHpwCZEGSPbW2f5YCI5NWoylmtAKo5RFtxA5tI9SfTWazTYgxxTpbZ2cXmpWAt4AQFbiMYPlB9WE51BRAy2SEbLSbgkwMYDfQwjH1TrNZpDN7GqrGUBnBs5Csx8xzEmYgyeB664+ZfaqgqqNaAWzYj3MZjm5BnJPmMcHWazQA02uyuep5FNOnJYKYCqBaVCkdckwcyJnOgzUKAspULUrBSrCSqggWgjgwZkdRz11vWaYC3e7E/KPyT5fKFn8S3ETPIFoAjr2kDTE7lqlcnyhDSUksvmtQlH44wSO8A99ZrNAiCoYRluKllVqcSQAWzPGMcf8AL31JXpEpSVJvWHFNrSBhmMdAZbmep9NZrNUI58PoEgU7ELrawKQpgJnoAcsBH54J1JvduWvaCHQypOWhsFi12At54yYHTWazRQGeJsooIv7T5hJUWkAhhZdkn6ZIgf8AJp50MEVgtAuxZCfmMp5vJkm4f8Rx1J99ZrNSP0SbGoy2t8uCgm0Ww1OZEtMkhWWfzGZ1FtvEiaJsW00UamCQCSxsJIHAzIiQI1ms0hhAFA/MX8FwKC3Fxm/HQGzofwx1JIVCsv8AtjW8wvdkYi0NMBWkdiCCQpE51ms07CglX/8AMI1QGXJU+YkJ8szIz55J4M/lonxKlSAAy1Q1HyVAuUi4Ax08uDkiOmCN6zTEV+uxeKvldbitxEFnUYJBnuPy66m2VqVBKrCzIImBEmIIBx7SB66zWalDYVRbF3y/2YqNYe7nyhrbsEGffPtqbdVViWtKNC2ZliCAxLAAXAgNJGYjWazTsRq1KjsWMlUlhGOEXBiZErH21EKSLVYWDJRUQ9iZm4YxgAEYB1ms00BpHcK9FGi2bWOZzbzBOYyDgjUSqovkWWmyIBlqhBmOInHPGtazSehkDoGUsjwEeYt4EE2r6Y4OpNhVKgsACzEtPazzA/lMj2gY1ms0IQZT3zFVKvAKqfoHJAJP3MnWtZrNOwo//9k=" },
      { label: "1kg", multiplier: 1, image: "/images/Assorted fuku and roundabout.png" },
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
    id: "chickenNeck",
    name: "Chicken Neck",
    category: "Chicken",
    price: 3900,
    description: "Party Pack | 1kg",
    image: "data:image/jpeg;base64,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",
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
      { label: "1kg", multiplier: 1, image: "data:image/jpeg;base64,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" },
      { label: "1.5kg", multiplier: 1.5, },
      { label: "2kg", multiplier: 2, },
      { label: "2.5kg", multiplier: 2.5, },
      { label: "3kg", multiplier: 3, },
      { label: "3.5kg", multiplier: 3.5, },
      { label: "4kg", multiplier: 4, },
      { label: "4.5kg", multiplier: 4.5, },
    ],
  }
];