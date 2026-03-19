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
    name: "Assorted Cow (Edo and Shaki)",
    category: "Beef",
    price: 8700,
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
    price: 6200,
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
    name: "Goat Meat Ogunfe",
    category: "Goat Meat",
    price: 9500,
    description: "Fresh Nigerian goat meat (Ogunfe), tender and perfect for pepper soup or stew | Per Kg",
    image: "/images/Goat meat assorted.png",
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
    id: "rabbitMeat",
    name: "Rabbit Meat",
    category: "Rabbit",
    price: 6000,
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
    price: 7500,
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
    price: 12000,
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
      { label: "500g", multiplier: 0.5, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUXGBgbGRcYGBodHRcfHhodGxoaGhcYHiggGBolHRcdITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0mHyUtLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAABAgMEBQYHAAj/xABFEAABAgMFBAcFBwIFAgcAAAABAhEAAyEEBRIxQQZRYXETIoGRodHwBzJSscEUI0JicuHxM5Ikc4KislPSFRZDY2Sjwv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACURAAICAgMBAAICAwEAAAAAAAABAhEDIRIxQVETYSJxgaHRBP/aAAwDAQACEQMRAD8AzCYihp+IB91P5gk5JZI9ZwpLS774FaHKRELOmhs3j6+sNgfr8okJycL+tA3ziNh07Ekh/YkuUj8x+sSBmVPj3ftEfY6FP6j8ocSy6lHl8jCyGiMpqqmFFF/Xr0YQmGphQF/XrdDiBlppA2VTKEFUukdJzG9oHgV2dP8AePKCzFfWDKTWCr8Yxgssa8IlLAh5aP1k+Coi0JpzHlEjd07qAfm+hhZ9DR7FLQggE7zXvAhGUguv9NORML2mY6Dz/wD0/wBfCCKJryA8fIQtjCWIhXDPuENTMViO/wAhC3SuojSufZDeYp35/SGiKxCfaTl63/WLDsdfy5KLQkLPWCfu9CKgqfeHSG3HhSrWjM84SRNIyJB4RSid07PTuzUrDZZSkrWoLQguK5pByIyh3apswLOECYUpFcgAVdbEMyQA4A5avGG7E+0OdZAJMwlckqHFSA9cL5U0y4Rt1331ZZqUqlWhAGZDgEvvCqh455Rkh072PJCSkJ+8BCjQhDuTV3eKZ7WrGRKkzSt2VhYgDMO4/ty4xL3ntfZrLMCQoLxuQhBchTjLRji7/Cg7a7TKtuFk4ZaXwp3v+I8f3gwi7Dvsq5Bcbh47vnCqEBuf0dsuREJJJDFRagz9bxCqVgpfIZDi9PB37YoZkfbMnOqgT3iHs1A8/CGdsrwq9OYh1NU5PaOxy0Zmj6L2WUAAfzDz+kPwpm5AHuIhrZUukni/KkOkpz3P5iIy7KxJETRiDfER34xDCcwUHomhObszUJ5eMHkL/E+Qf5f90LS7IJjKUCBu1NXrSg4fKDCLb0DJJJbJCXNCWSqpUxrrVL+BhFCQ81PFKuzCBn3Q8C5agEqSWGRSajLeC+UM72si0/ey1YpSiAS2RYdVadCWpUg79AJYpQVhhljN0NUAKAL5gfIR0N7LOZI8uMdCWyqSKnLVlx84VCusPXGGiZgrT08EXOqD6yi/E5uQ8mEEKfP9v2hlaJTIM2hGMIbjhxPDedaTWsP5CXsRP/yD4Sx5w8VROcrIxNtIyDQdN4qEIiTBsMNoVWG+2qOggftivhHdABMGwxjbBFrV8Ke6BFqX8Ke794K0PbJdc2YHQgkbyQB3qIgNoaKb6Goti/hT3QYWtXwJPZ+8XbZr2bzp+FUyYhEsqAISXXxAphBrn1hE9fHslQhSRJtEwAu/SS0K7sKkfKF5ILhJaZmCbUr/AKafHzhRNuUMpcsd/wD3RoU/2WLJCZU9L4MlpUMSg/4g4SGbfkYp983DPsq8E+WU1ICs0qb4VhweWe8RrTM00RarzX8KOTfR4J9vmcO6FsEEKYIAn26Zw7h5Qmu8JnDuELJXhIJALEFi7HgWORh4LPKmEYSEFWlVAVZviHjGARhtq9ye4QBtStUJ/tESM671Jf8AEE5lLnD+oZp7Yb4RBMMlTPyJ7vKFJdsWnIN2q84WUGh7c1gE5SgpSUgJfrE00xBKaqbcN8ZtIMU26QzF6zRol83wh+b56eEcb4ncO4RKXjcE2SWKcQZwUg1GhY1ERok7xGTTNJSWmJKvadw/tEEN7zsnH9ohxJsS5isKElR3D1U8NYfXVs8ZheaVSUA4SpSSK7g4zcjvjWgxhKXREG9pv5f7R5QH/i80bu4eUa5YPZXZVSwozZhURwS2uVYzvbTZdVimDrY5aqJUQxHBTUfiIOhWmvRndt+zBMQFMUFQCgzODQ5ZFteAizWm3JQpY/CFKHH3qRQ7N76ecSN42slSuJMJKKY0JtFmue0GatvwpD82YDscP2RYjPAio7KzQlbfEmn0+sTN52RUyjkAxaCSWiM23LZNIIUCUkFmdtHy+UObBNGLAusuZ1Fj8p15gsoHQgRF2CX0cvC5JYOTnSgEO7GkqmJSNSP3MN/YnXRWrZdhTMWk5pUpJY6pJB+UdGu2jZOzLUpakJxKJUevNzUXNAoAVOUdEfxHT+Y85ziz845RoKwE0VgkwUEYUQWYnbEP8EP8+Yf/AK0RAmLDdxayJ/zZ3/BAggIsJpCQQW4/KHe6EVGBZqE8BDQZ44mC4oxuhSWA4fJw8XC51rwFWEqDKCQMgwHyd/RikkxL2Tam0Sk4ZZSkHPqgv35djQso2Xw5lCzS7JfqpaZZTkgAgDUmpJ7Xh2vaA2mYOkXMRRgJa8IrmaCpbuimWHaBM9LhCgoNiQA/aG0iUlIcApPWenDsifGizzW+RaLU8s4knpEGikrUpVODmh4w7+ySZspSVS1GWrAQDXNw1dxBIOYplFcuq1rzmDqE4TSgOgJPF40KzSCqUlALIKTmM60D8B9YlxknZ2RzQcUn/kwvaS6FWabhfEhQdC6FxpUUdmy3xDvGp+0q6lJsyCRWTNYn8iwrDz69P9QjM1y20joi7R5uaCjNpdDQofSBu4/eYSKKcEGmhOenPSF8tIYzQ+kMRJ6fZVuFSphC0pJScjMZ/eanSMDnRQbtbIQmcCQUoWyTT3VOC9M0lw1HGWUDdNqSJ6CMikYksWUQMgH13ZZ72ha2XUmU86WClGWEgkS1Bi5Uogs4bL8THNilishLQSkscxF19m2zP2pRnTP6SDhSPjVQk/pS45nlFPt4CwVghwQC2rjqnjQRevZVtOiSjoZhYYix0qXr6/Z00PBNvRo0y6JcxJCk4gDTRSQ1GIanCM82w2I6FBmyFKWkBylVSBvSrVtxr8o16zAM4qD4xHX8hCJUwqICQkkk5M1flBYeTemecDPUlQUglKgXBBYjkYlLpv6apbTZhVVw7fJmP7xHyrEqavBKSVE6eZNAOcObx2eXZxinTES1F8CQ6lKIzHVDJzZyWgOKaGhNxdo3u6bemZKQtBoQOzeO+KB7W1joA+ZWluevg8V7YjbM2dQlzv6atd3HhCXtKvqXPmoRLXiShySC4JLMx1YfONbuhZJdop0j3x60gbQqp5mCoooQ5t8lpswblqHcoiGYiF7DaMmLKTlFwu2+QsMsEKG4P8ooISRlEldNpnrWJclBmLOSUpKjzpkOMMmK1ZoCVPkFH/Sac6Uiduu7CCAsVWC7H3UM6qjfl2mEdnNmLSkCbagqYoBxLdkjd7xz4mLai6Z7IGFRUshS1jIJGSEkaad51h0LQWTcImjpDMUnFVsSqDTwaOixCQv4D3COjcmakeUpn0hCZpDpYr2H5w1WqIFhAxOWF/syAPjnH/YjyiDUYmpJazS/1Tj4JH0hhRkrKCGFDxhImAZgAwBMCYIqGEAUqCGBMStw3Gq0K3IfPfwHnGQUN7nsq1zAUqKcNSoFiOA4xaJVpWQpScToZ1Ekg048IlxdsizyykqGJiQBuAiqmYroykqPR4sRApU586CEmtnRjTq/C2XJtgTJmyTKdagp1EUL5Bjqw+bRpuw03FKAU6SzgH6vmdOwRj1wy5fQrQ5J6QMPxJJbCab0gjtMaLZlTJKZYljE9QrNiPeSXGR+vCJykkVhjc3SLPtRdnT2dctqKBD5Z5FtWLHsjBptmUnEhQZSSQqrhwWNdRxj0R9sAsxmHqsgqY1yD6ZxkO21jxgz5SWSQDMS1QKMqmgfCeGE7410/wCzfjcoN+xKVPSIaTkbofWVLgg9kI2hA0ihzMjMTKByizXXMMxCZJ62MFB3nLI5kkupy+ejRXpkuF5DpAXXqKTk9X0J0909/GFkhWhlLQRiQXCsm4jQjfCdmnGWpx2iJW/paiROUoEqICgGzAYkcCUq5ZaiI21y2U4LvXz8YZO0FaejXvZptyhQFnmnCUglJJ0GhJiy33eMq0EyVKQlHVPWPvMzDCQxD7zu4Rg1wIe0yR+cGu4VNNaCNDl3guclKJaSnplJWoKLmY7lJJHuoDP284XjXpS+Tuiw2OwSpAwyUuok0lBwTxIzbm/KKrtJsm56XoFIJU6yqYevWqQapCi+qhGk3RdybOkEstTOpeg3BKdBEXtJtMJSCkpxKUPdzc7iBpx4RN5aYyinorg9ntkUlKkhRBDviUOwsqIe99iZNQgFBqzKJHccouWydqC7JL0OEOndw4NCdstCUqTiVkeDmhzaLREcdmI22yKlTcCsxrvifsFzKtVpmpBwpC1qUrNhjLAbyYjdp7amba1rRRLhI7M/F4v2w8nBJWs/jmLL8jgHY8MJVMUsOylllMTIE5Q1XMUxyzQBhPrtlkzl/aJRlJTJkIKSUICRXVwnMc4RtFsAxBOf7fvDEz2DnnBMaxY71lqS80oAr1woAKH05Q2va9ES0YbPOQkhKsKUkKroHqQ4dtAYzWVZFHo5bVSekX5c3Pyi02C7HbfDCUWFO0KGH+IIoKFD6VrhgITlXIlhQR0bZtHmeavdubxhGaYVTrCE1VYmOIxN2cDoJT75p+UQhiSTN+5ljgvxJgsU5WQhuZRUyUgkk0ADk8gM4HHFv9m9gUucuYE4sCRX4XIch9ch2mB0rD26D3BsFjSlVpm9FjGJKEtiberEGHKGO0uxq5DqkqM1AzBDKHdRQ5MeEatZJQmKTOzEwZHOWQSCkjMMdeMK31s8FoJR1VDIj674aKtWmGldUee7PLxqSkZqIHeWjS7olCVhCRQUio2iyiRaipaWTiIIb3CdRwzIIi7SpqOjSr3jlTXj2wvLZRY9WEv+5FzMK5Qc1esRC7nmoKiqW/5Qd+ra/KLei3hCa1Hyiq3rtAZc4ofUKxaFxuhZveimPlVeBrokJlrOBKkkhiFFyrc7UDPGgXJY53SS5jjCKEF1fXnFCuy3yphNRj5gnu3d8WeRfvQ+8sFnokv3iJNW9lE3HSNLnIlzEFKhT4TlybdwiNsVzdeYOhliWUkCgqDo24jsity9qBOP3asBamJjXl6zifuW8MKfvJjr36dm6NJptCxlKCf7Mt2v2RXZZilS0uh3Aq6RxbNI398VRaC3GPRt5SJdoQxPIjMcRuPGKPtDsZKmJLkSpmk1KQx4TEBgf1BjXXKGUq7FcFNXHv5/wx5aIKqYQ4DMR5V50ifvzZu0Was1DoOU1HWQdPeHumuSmPCINSaxQg1QvOmGdJIKUlcuoL1UD71MizJAG7jnEqScAoKPzAzHZUw7BKS4/neDvBBI7YStk0FZUlOAGjDL0e2MlQBO75uCYlWbE/It4xtexFkMuSmYuQVLMtASsFLYQgAMCQQTn3Rh5Q8a7cm3VmXJkylq6KYlLKKgcKWDEpVlXSusTy3WikJVomr26SYhWAdGE+8dVsapSElgWcPmDFP2wtqJSSoEYlDqJ1P5ic24xIbR7YWZCCiQrpFqGEYScKR+rLucxml4TzNmGYoDErNssgKDQatxicMd9hlP4PLFfJQlLlYUkNiSYdi80TAZkyavFLIOE5rzoKly4GjMS5ivwnMi3BXoKzyqmK2+cJk5SwCApQZ82oKtGq9IEygzYXammaj4kRk0hPWSOI+caJLtOJCUDRSz/uIh1pEu2OUpLP64wtZsOPrUQgYlbvyjv0hSxr6uWWfJofXJZHCSQwWSqYDTqhix4Q8UCRPXHd7JxrHWmEFW4cBwA+cT8hKQcj6/mIFd8SQool9fTq0T/d3ZPlpDi/ZE02ULQpSSFgKCSQ4Lhic8yIa0JRYTaUR0V2x2MYE0emZaOg0A87kfT5QgoZwsMoRWM4iigiYcqV1UDh9TCC0fSOmK93kIYUUBejOXjRfZ28pxn0lSO0AdgoW1aKJciPvCoj3RTmf2eLRYSpDzTQtT8oGUJP4UxxVWzbLHdycOJmWrMimI100fOD3bMVNK0kMEUB376cIT2QmTJlnl4wQTUvnXfEhNs3QTFzUZKSxGj6K5b4MU1HRr20Y7tnYU9OpSgyWUFOCzg0yGbRF3VJnpWpSQTJUzBiMJyo+nKNX2luMWopdeZfCGIBAYHLKGll2JQqWAZ80YfwijdoYmE22UclRlN57RzJYMtUlSVZAqp2pcVitT55WSTqefjmY3W/LhTLlsppqMlBfWpvcxlG1VwdAoTZY/w6yAmr4VMSUVqRQkHyhrEd1+ivgQ6lT1AUWR2wiEwUmCKnXRLSL0mAir8RQxYbp2hmlSUJJPA+ZpFNsUpS1hI/gb4uF3WUIACM6kktVg7eGkSmkdODlJ76NlsdiElCQticIol3JOaid2gGghO14gCpLqAzS3WT2fiHEQ32XvVNrkJq01CWUl8xvaHU3qMQWUMhr2bxE3T6OmMd0+xhIdyUYVIWACk1QoaOPCK3tH7PpE4Y7J9yv8UtiUdgDqR2AjgIndpiqQE2mUMOIstDdVRZ8TcQC54Qrdt6JWAXbIgjThTMcYyk4sE8XOPKjDrdYlSpq5K2xoJCgC4cctIZiTwj0Lfez1ntqAZqAVAUWmixyP0qOEZ/e/s5mygVSViakOcLMvezBwo04cBF1JHA4NFARZhBjKDZQ6myykkEEKGYIYjsMIqMMINVpgmGLRdGx9onpxkYJbPjUGDDMtmex4nrH7PJS850wU0SB8xATt0PwaVmaFDQ2miNHvz2aWiWyrP98gnJwFp4qdkqHEd0Z/apJCimjpJBYg5UNRnBFqhKSeuOY+cXS4UkzJg3LU3aoxTEDrDmI1jZ6wCXPmLWDVSlAEZ9YtwasGrAnTFLRY+ilFcxy+SRmRqeAiPtd5rmrGIgSlAYAmiQ2h3nif4mbztBWusM1XOZaqpKpah1gNCSajUCkMvgH9HN1WUg7qiNDTLC7NMHAK7i/0ii2UGWUpUXB91W9O5XERfbjGJBR+UpB7KQ1aFshELUkMMhAwt0Z9fxAwLMeZ1mCYvnAqq3rWCEQg4ExUFnZjkIFUBO05CChWTWzNFEtr9D9TF32fu77RPSD7qCFHidH9aCKVszqWeoA7R/EbJsRd+CXi1OcBRuQ91FF2saghIHCGN83nRoCfagA7xUb6t5wkir0B8G5xehV9LZspMCypWg1hzPsyjMdKwE6pyeGmycro7Ml/xDEfpDgzgKguY55O2O16JX/J6SXMlJUAtQPZxO4RD3hs7KVYjZpjFIQkBR0IHvjjq/GCi1E2ycCqmBLUqN4fd+8Z/t7tQtRVZZGMpFJixiOYfAnsNTxaJu2yipRKztjZJcu0NIS0lSUqQcWJKwc1JOgdwznLjERZZCpisKQ5PhxPCH9j2enrGIoKEOxUR9O3WJ6TZkSEgAVOu88TBckgRxuT2Dd12plobM/iO8wumzHGFDcxrDX7VMVRIAG/ceES9mlhCHUagZaxNs6acVoTs94mynEHC8xhLNWJS8PaPa5QSCzKDglPW450P8xSr1v8JmHoetWpU7cgAa8384hrZeK5yscxRUWYcA5LBtHJhowb2JLLCKpbf+iy31tlPtWHpFVT7oDgDypEnsze6kAEFIPwtm9D4CkUALiRu+88LJVlod3ZGljvoOL/ANcoqjebvvROEFIUN4anPnErLvBKuBzjKLn2vmSAAr7yWBQajiDFkO0spRBSopKiMic/XzhE60Dg5O0WO9+hmpIXIRN3Ykg9xVlFKs4kicOisstCsRzBBSzv7xoX3acIC/70nAMhakZGgD6t8jVoqyr2KVpKyskBgCRr2UFTlDbDHEktl3tV2W2YSqSTTqlLgABg7F2IMWG6JKiCtYIWpizL1zDkN+8VO7ZlsVJlzZKlFJw/cS6HqlQUSokakKYiriLMdpFuJapSkLb8aW7dx74nXF2M4OSpbLbYcQDEEjfu7IYbQ7H2O0dabZ0KJoVMymOoWGIPI74Y2e/TLfEpzmQKkmJKwbTdIcKUqfPrCjR0p8ls5GnF6R5qvSy9HapknMS5ypY44FlP0jb7DPRO6hUn3SB+pNM94I7+UZl7SZwVeywJaJbKlA4A2MlKVlavzHGxP5REdYb6XKts2WVHAqfNI/IcSqjgdR6LRYjWzUkygrqTE4VpOfxcYl7JMQpgakDCeOffnDO7l/aJHW98AB9U7lA6pMN0TVpKkFPWTV9+5QfSkMgMfz5CAkyl/wBNR6qsigs7P6ziZ2ZtJxmWsgqSSxyKhRi3bFbXftnUjDMmyQciOkG7eCQC8OLjnlTFC0zDL92YhYU4fJWElqUrD3ZMuFouzEoqSQAT/PjAQX7WDUKzcx0IE8mD6QQaQbyEEGkIUCqgJ2nIRyoOEOpI3gQyFZa9irASz/iU4+TxttiQJcsDhFF2Ru9ImJYe6IsW0V8iWlgaw+L6DJrQ3vi9MwDFeuq1zPtKQg+8QFJNQrgQaGIq03kVVMPtklYZipx/9ME8zo0NklobFuVGgX5eyZf3aSBgS5LsBoBxzy4RDXTfBXNSalyx3M2nrSIq1WmSSZk3rBRxLBol2p1tNKcoj7z2qskppkpSVFhglpJIB3q7eMcjWzqWRKNEnft7pRMS4+8mBko1OdVDRIrxiH+zhIfNRz5xE7G47TbVWqaoqIKgl2zUkivAJPiN0XPaSzBCilLgMGejkirHUfvzhZmx76IiSlSHBXiBHu6V+sIy7OV1Ipp584lrukFSWIdhSm+phtarWJWN2CUj3t3LvFIjZ0tbYhPEuUCSzgOeA3mKRfd8qmulBIQczqvyTw790BfV6KnKLUQ9Bv4q48NIijHRjhW2ceXL5HoTaDCCY2L7jD0hKvMRV6OUZkxzwpNktUVEIRhk0St3WpQSpqgZjnrD424EOmhoQdxHmKRXpUwpLiHMmYHLa6boWUTqxZKLcL36YMrLMgABiHZmZgx3PB7FZpWJK6nNn4ZRCyJRZ05kPDuzLUk1iRaTuOjYNmlJwJKW47/2i1zrImZgxpSspIIJA7+cZXsleJQsJORyjTJNoc1FKN4ux7orKnE5baaaIW87AETJxwgALDbqgU5uQe2Gt1TiklQIDFm3j1SJvaiyBZQnG2Mh0n8RCaHg2F6RQtsL9Td6ujlqTOtDPUHDKBDhwDmfhd2zOTyTa0kV5RauRUfaWEG9lFGvQldclYEgjuCaRWFh7cv/ADpn/JUAm0KXPStZJUpYKicySXJPMwrYUvbJh3Kmn/cfOLo5mXzZu954BCThly81tU7kcTu3CIzai+1e9MWpieqkHLsfxMOr8mqsdikhDBcxQWp6+8HPclh2xSZqkrdSjVRW4KgavXDSh3cecEVu2JTLwW5YsAW9Py8YGyXtMlKCgpSVCoUk4VDkRCIkvQpNW4PTqljr5xy0jCKkDJm1YO5emvrLGNIsO308y0lYTMU1VkAFXEs1Y6MxRalJGEEUjoOwaOhMjLlCpHyhNUIOImFQWUk7gITUIkJlmaVKV8QX4ECGFNU2ZWtSCZaXKgDycPnDe+LumkFSyAB4+MVvZTayVZ5eGahSikdXCSCoaClO/wDaHd6bWpKHASpaq4AXCH1Kmbg2fziX8uin8ew8i7wotSu6EL0v0WMqkSGmKbrLOSFfCwfERzFTwIirLvOcXeYqubU+WQhqBDJP1iuS8QrbbbMmkmYonhoOQyhthhZoDDDCDm670mSCDLNMQURTrNo7UBFI1qwX1ItclsQUoAMPxj8qh6zjHMEKIRr2v5boEoXspjyOJtFlldHKKlU1zy7Yy6/rzM5ZCaS0nqjefiP04c4j1TjhCcZKRoSWHZCYXlQl4SOOnY0srkgik8YTBGRHbuhbAM6+vrCSk5sDFSLFl2ENrDUDCWemkKSbUodUgtpw/aOtDGorCb9FCGElJgUzNDDhKI10EZtHNuhefJaACYZOw2St22gnCo+8kFOjEEvWucPkWklRCjQg6V8M4ZWFUlAchS1kZZAcIfXPKQtQAVhJPuv20MTkdcK+7LXs3ImYsJSVBxX4eLiNQumUcKSTT1oYqlyXbMlyFTFJKkkOEJqo6AMaDvhv/wCakoXMVMWGlj+m4BdqJCSXKizZU1aEhG3tmyy1pHe1W+lybTZFSlDFLTNUUl262FKSoAh2ZTRk14zisqUpRKlEqJOpJcmJO/L0XaZq50yql5B6JAoEjgB9TFftiyG7Yt6c/gWR/WR+pPzhRNr6K0rX+dYPIqMNrMo9Ij9QgLwH300fnX/yMMKaR7SutLs6gjFLCcWLiQgAEtqnLLIxQp1UqSlWIJq2Godwz7gW7W3RrGzckWy7vssxWFaUJQpQzBFZS+KaAEa4DvjOL5ueZZ1lM6UpKy5ALsWBBwqBq5Y+UYBHoS6RXWgH4SEsxrkWBpCX2qhLM7gnM8CX5wuqWyARlkMn3NUaKDPuVC1muebMSFAEBm6wI08R8owSPmz6lstGMBEwbqSKFYfWg84CNaNshzrBVCDlMEUIUYRIicwk2eRSjTWO/rVA8IhDE2tf+FkjcJ3rwggYwWBTgIK0FROfOkKBYygCgAQIEGCYMkA/zGCJ4XeDppnCjBoE6RjCYVyhRMAmsCDBAAoiBBjm7Y6MYAKzakct4IXZoErgmG1oJrCSUvkS8LTZkN1GsZoBy0nnB5E/DxG7ygqZ55wqMJ4euEK/2YlrPKTMTRj6yO6I5copUUnMQpZ7OpPWQctRD2evpCkkALZnGStzjQ6eUInTMkNUJhxZ5hSQpJYg0I3wWVKJMPJCQDWHKGk3FtzKVZFyp00yZ2EhMzApYBaimTU+e+MytU7EpSlKxEkkqL9bj2w8Mwc4Zz5YL0PrhCRSQ0pNjZKzuhrbN8KWmYRkCd8M50wkVpDiBbJ/UR+ofOHqZOK2KGnSrJ7FGI+x/wBRP6h84vFwXIVTp0wjOYvuCjDC2SV3zZkhXTILYRV8lDVKhqC3gNWi6y76sltldDPCUkprLmEOP0rNDwyPCKzPAIdnQDT/ANxWgHDjDBViKQSaqVUn6DgIaqQHtlismxtls7qSFzaBseFQDElwAAH4nSEF2KbNUQhGWZ0A4nSKf0KlTAhJIcgMCQ/dGo7H21IuyWDmZkxJH+srpwZQ74XsNUR0nY5LDFMdWrAN2QMSUycl8yODmOhqMYCRCaxnDjBQQNrkFBYkE/lIIHBxSJFCO1iWM8dBLQC6hjcc8oYBMAUw1gA6I6B+6BShQ/DWAQiBWI1i0GwTN3h5RyQoZhT8zCYfee+DV3mNYaFCs7j67IATDqCfXKE1Esc4IVFs4wKHgUfhPrsjulOTEeuUM0rVvMGxK3mMah8mZzgCv1XyhoFHeYMFq3mAGhRc30x8oRVNPoQdzvMEUtTCpg2agqlemhPFC0pajrrB3O+DYKGpHpoOlT5wspat8djVvgWahSRNw5GsPpdqBFQDxYg+XhEaFqcVhUTV0qYVpMNEqkgusHIsfPkfm/COWoPmPGGVlnqSrEajIjeNQ/yOhaD2szUFgtRSQCk70moPNsxvBhVrQRzNtFQX7gYb2iao5E9ghJNqm/8AUV3wEy3TQHMxffDmOnEqBoeX8QynoV8J7jD37TN0mL/uMJzLXNB/qKy3wQDSzyFhQOFWYqxjcbFYB0YVMGCWfw/imHjw4Rn2xtlWtSZswGYCWQg1fieEbLYrCaTJhxKag0RwTx4xRfRH8KzNu5R6604SCyEaIT5wzt0hkmLvbZFHb+Irl8yAmWVd31jMKKpszI/xYWfdlJXMV/pFBzKiB2xcLpsglSZcpWbqU27EX04NDHZ26WQSc5mFSh+XNCe33uxO6JQTTiNBThlpAigtjaegBRorvgYczg5JfPhAwRTEejFB2dwhlOSQI6Ojmj2XkhNCN8GMdHRQUPIT73AP3QQprAR0D0weTIctDpNm8MuMDHQrbsZJUNMFDvfshDDmI6Oh0IKoQGrAdGHjo6AEKYWkIo/GOjozMgFIqOUBMAbkIGOjIzC2dLl+P0hQpr3R0dGfZl0Fm+vCCpjo6CAPhqOyDBNB60jo6AEcgU7YKU1bjAx0KhmD0VTBOjBDH1nAx0FAaBUluxoYLTjmBI1IEdHQ0exZaNn2Nu9EuXXNgD5DgIukhXl4x0dFmTHc2QFJbv8ApFYvuz9PMRJyTmrgkVPhHR0AIymW89KUJDISkBA4DL5eENZtoUkudY6OjIA3N6tT6QEdHRrMf//Z" },
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
];