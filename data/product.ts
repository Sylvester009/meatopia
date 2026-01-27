// data/products.ts
export interface Product {
  id: number;
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
  relatedProducts?: number[]; // for "you might also like"
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
    id: 1,
    name: "Boneless Beef",
    category: "Beef",
    price: 8500,
    description: "Freshly cut | Per Kilogram",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k",
    tag: "Popular",
    tagColor: "primary",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 2,
    name: "Goat Meat Ogunfe",
    category: "Goat Meat",
    price: 9500,
    description: "Tender | Smoked option available",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChJIkEqLxquKnKL72P3ytDdGwCZzlGptR7pjVVW0ciTgT5zJccPz-XRr1YJ_SugCWDJmWgg6QA1JZCy-wrqCQ5CmPQYftsS47uJ-j5LmtsPJOLnhbQpX8zLsiRxL78OUeQq7eJaRvLV53g20M4UiOQ6EdYln8zXmRjlQQcEXVFXGLWFecD5e4FYu9ZrhrC2gt8dDqvoOgCU3FbzsHmNuzKmmeEIbDNflvRuspaa3rVqnI4LNjSrTHvPbFz9mQxSTRIS1vp2SOZxY0",
    tag: "Nigerian Breed",
    tagColor: "#131811",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 3,
    name: "Chicken Laps",
    category: "Chicken",
    price: 6000,
    description: "Soft & Juicy | Per Kilogram",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 4,
    name: "Turkey",
    category: "Turkey",
    price: 8400,
    description: "Premium Imported Cuts | Per kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqSbUvChYiM27CmzrVXqE1GKnxhGgLmRJB3PmnLvFufNcECvgJyDyVcajmPx1oYyNKsvhVuZ_AG58t8H68Mcfwlzpu1PFyd7oEF2SnhRu_EjkcPnoILDnPHJWk2WMSTFieOTZSHTUm7FPkK_v1uC6lHbSmzJbgn1ve9d8r9NVjtte2lCG4P9Ai10quosOLBQx3U_5L9YrLW6gTstOo0XRdMSbmpTg3TyOgaJYOV58KLvTy6j89bguBa_dykuGWOAKXRfsb2pEfMS8",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 5,
    name: "Rabbit Meat",
    category: "Rabbit",
    price: 12000,
    description: "Lean Protein | Farm Raised",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO1aevUSMhttu9j6Ao75m_cUwx3HJ7FRmk3jPGRTICSMzN_gSd4cPecZnLO6oIvQQljQBINYraE3mUd7mpNr1kldJVzh7afGbRcBKBX6FEVEpCStvTuu1Mx-uOve1ePYgjth_9D3WTDJVfvkswMKBDnLVt0PULVL8pl1hqksXNcglCGyLw5nyQ2CS6Qq4Q_E5zB8PHSYVkeF11ulap6alh9nwShjLeA3cLVS2xxXJCZujO8xs9_e1-ijmusyTrGhfy1N5cMwY9tJs",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 6,
    name: "1/16 Cow Sharing",
    category: "Meat Sharing",
    price: 62500,
    description: "Assorted Cuts | Communal Sharing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC71WQ3k-TkwGQ0RxevEm70Ggr-OaBsIXaagDSPzO5brxzVJ89kECOcMF4lalabAHsnWVR9h-BEs508Cudh6CUGrpRUX_5OnUqoXCs9TgKA2w77_ouop3kMmCL1bikqPa2vRjm0FcLe0XN5bIe910Fh17QUKsv9B_9ENiwLKfgI7A1_mURzzIK2YGrRaL_6MMAZQN2TJ0Yl9acRaNflQyQ11WNNSkESSmdrXi3WA94pNpx754yjIc3Et0Tx9yafdb9QbNHcGqooOY",
    tag: "Best Value",
    tagColor: "primary",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  // Add more products (total of at least 20 for demonstration)
  {
    id: 7,
    name: "Premium Beef Ribeye",
    category: "Beef",
    price: 12500,
    description: "Prime Cut | Aged to Perfection",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    tag: "Premium",
    tagColor: "gold",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 8,
    name: "Goat Leg",
    category: "Goat Meat",
    price: 11000,
    description: "Full Leg | Perfect for Stew",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w-800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 9,
    name: "Whole Chicken",
    category: "Chicken",
    price: 7500,
    description: "Farm Fresh | Fully Dressed",
    image: "https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 10,
    name: "Turkey Wings",
    category: "Turkey",
    price: 6800,
    description: "Jumbo Wings | Per Pack",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 11,
    name: "Rabbit Legs",
    category: "Rabbit",
    price: 9500,
    description: "Tender Leg Portions | Farm Raised",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 12,
    name: "1/8 Cow Sharing",
    category: "Meat Sharing",
    price: 125000,
    description: "Large Family Bundle | Mixed Cuts",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  // Add 8 more products to reach 20
  {
    id: 13,
    name: "Beef Tenderloin",
    category: "Beef",
    price: 15000,
    description: "Most Tender Cut | Fine Dining",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 14,
    name: "Goat Shoulder",
    category: "Goat Meat",
    price: 9200,
    description: "Bone-in | Rich Flavor",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 15,
    name: "Chicken Breast",
    category: "Chicken",
    price: 5500,
    description: "Skinless | Lean Protein",
    image: "https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 16,
    name: "Turkey Breast",
    category: "Turkey",
    price: 8900,
    description: "Boneless | Whole Breast",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 17,
    name: "Whole Rabbit",
    category: "Rabbit",
    price: 14000,
    description: "Dressed Whole | 1.5-2kg",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 18,
    name: "1/4 Cow Sharing",
    category: "Meat Sharing",
    price: 250000,
    description: "Quarter Cow | All Prime Cuts",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 19,
    name: "Beef Chuck",
    category: "Beef",
    price: 7800,
    description: "Perfect for Stew | Economical",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  },
  {
    id: 20,
    name: "Chicken Wings",
    category: "Chicken",
    price: 4800,
    description: "Party Pack | 1kg",
    image: "https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800",
    reviewsCount: 128,
    tags: [
      { icon: "eco", label: "Grass-fed", color: "primary" },
      { icon: "location_on", label: "Local Farm" },
      { icon: "verified", label: "Antibiotic-free" }
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
  }
];