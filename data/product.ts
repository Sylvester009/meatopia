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
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],

  },
  {
    id: "edoAndShaki",
    name: "Assorted Cow (Edo and Shaki)",
    category: "Beef",
    price: 8700,
    description: "Assorted cow parts including shaki and edo, ideal for soups and traditional dishes | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],

  },
  {
    id: "gizzard",
    name: "Gizzard",
    category: "Chicken",
    price: 6200,
    description: "Fresh chicken gizzard, cleaned and ready for frying or pepper soup | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],

  },
  {
    id: "cowTail",
    name: "Cow Tail Pieces",
    category: "Beef",
    price: 4500,
    description: "Tender cow tail cuts, rich in flavor and perfect for slow-cooked soups | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "turkey",
    name: "Turkey",
    category: "Turkey",
    price: 8400,
    description: "Premium turkey cuts, tender and ideal for roasting or stews | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqSbUvChYiM27CmzrVXqE1GKnxhGgLmRJB3PmnLvFufNcECvgJyDyVcajmPx1oYyNKsvhVuZ_AG58t8H68Mcfwlzpu1PFyd7oEF2SnhRu_EjkcPnoILDnPHJWk2WMSTFieOTZSHTUm7FPkK_v1uC6lHbSmzJbgn1ve9d8r9NVjtte2lCG4P9Ai10quosOLBQx3U_5L9YrLW6gTstOo0XRdMSbmpTg3TyOgaJYOV58KLvTy6j89bguBa_dykuGWOAKXRfsb2pEfMS8",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "rabbitMeat",
    name: "Rabbit Meat",
    category: "Rabbit",
    price: 6000,
    description: "Lean rabbit meat, low-fat protein perfect for healthy meals | Per Kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO1aevUSMhttu9j6Ao75m_cUwx3HJ7FRmk3jPGRTICSMzN_gSd4cPecZnLO6oIvQQljQBINYraE3mUd7mpNr1kldJVzh7afGbRcBKBX6FEVEpCStvTuu1Mx-uOve1ePYgjth_9D3WTDJVfvkswMKBDnLVt0PULVL8pl1hqksXNcglCGyLw5nyQ2CS6Qq4Q_E5zB8PHSYVkeF11ulap6alh9nwShjLeA3cLVS2xxXJCZujO8xs9_e1-ijmusyTrGhfy1N5cMwY9tJs",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "quarterCow",
    name: "Quarter Cow",
    category: "Meat Sharing",
    price: 250000,
    description: "Quarter portion of a full cow with assorted premium cuts, ideal for bulk sharing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC71WQ3k-TkwGQ0RxevEm70Ggr-OaBsIXaagDSPzO5brxzVJ89kECOcMF4lalabAHsnWVR9h-BEs508Cudh6CUGrpRUX_5OnUqoXCs9TgKA2w77_ouop3kMmCL1bikqPa2vRjm0FcLe0XN5bIe910Fh17QUKsv9B_9ENiwLKfgI7A1_mURzzIK2YGrRaL_6MMAZQN2TJ0Yl9acRaNflQyQ11WNNSkESSmdrXi3WA94pNpx754yjIc3Et0Tx9yafdb9QbNHcGqooOY",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  // Add more products (total of at least 20 for demonstration)
  {
    id: "mincedBeef",
    name: "Minced Beef",
    category: "Beef",
    price: 10500,
    description: "Fresh minced beef, finely ground and perfect for burgers, meatballs, and sauces | Per Kg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "assortedGoat",
    name: "Assorted Goat",
    category: "Goat Meat",
    price: 7500,
    description: "Assorted goat cuts, perfect for stew, soup, and traditional dishes | Per Kg",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    category: "Chicken",
    price: 5400,
    description: "Fresh whole chicken, fully dressed and ready to cook | Per Kg",
    image: "https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "halfGoat",
    name: "Half Goat (Every Friday)",
    category: "Goat Meat",
    price: 50000,
    description: "Half goat portion available every Friday, ideal for events and family cooking",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "bonelessGoat",
    name: "Boneless Goat Meat",
    category: "Goat Meat",
    price: 12000,
    description: "Tender Portions | Farm Raised",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "halfCow",
    name: "Half Cow",
    category: "Meat Sharing",
    price: 500000,
    description: "Large Family Bundle | Mixed Cuts",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  // Add 8 more products to reach 20
  {
    id: "agemawo",
    name: "Agemawo",
    category: "Beef",
    price: 8500,
    description: "Most Tender Cut | Fine Dining",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "bonePieces",
    name: "Bone Pieces",
    category: "Goat Meat",
    price: 700,
    description: "Bone-in | Rich Flavor",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "chickenHeart",
    name: "Chicken Heart",
    category: "Chicken",
    price: 3200,
    description: "Skinless | Lean Protein",
    image: "https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "quarterGoat",
    name: "Quarter Goat (Every Friday)",
    category: "Goat Meat",
    price: 25000,
    description: "Boneless | Whole Breast",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "fullGoat",
    name: "Full Goat(Every Friday)",
    category: "Goat Meat",
    price: 100000,
    description: "Dressed Whole | 1.5-2kg",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "fullCow",
    name: "Full Cow",
    category: "Meat Sharing",
    price: 1000000,
    description: "Quarter Cow | All Prime Cuts",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "fukuAndRoundabout",
    name: "Assorted Cow (Fuku and Roundabout)",
    category: "Beef",
    price: 6700,
    description: "Perfect for Stew | Economical",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  },
  {
    id: "chickenNeck",
    name: "Chicken Neck",
    category: "Chicken",
    price: 3900,
    description: "Party Pack | 1kg",
    image: "https://images.unsplash.com/photo-1604503468505-6f3d5a7353e5?w=800",
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
      { label: "500g", multiplier: 0.5, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1kg", multiplier: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k" },
      { label: "1.5kg", multiplier: 1.5, image: "/meat-2kg.jpg" },
      { label: "2kg", multiplier: 2, image: "/meat-2kg.jpg" },
      { label: "2.5kg", multiplier: 2.5, image: "/meat-2kg.jpg" },
      { label: "3kg", multiplier: 3, image: "/meat-5kg.jpg" },
      { label: "3.5kg", multiplier: 3.5, image: "/meat-5kg.jpg" },
      { label: "4kg", multiplier: 4, image: "/meat-5kg.jpg" },
      { label: "4.5kg", multiplier: 4.5, image: "/meat-5kg.jpg" },
    ],
  }
];