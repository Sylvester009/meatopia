import { getProductImageUrl } from '@/lib/imageUtils';

type RelatedProductRow = {
  image?: string | null;
  url?: string;
  [key: string]: unknown;
};

export type ProductApiRow = {
  image: string;
  discount?: number | null;
  weight_options?: RelatedProductRow[] | null;
  cooking_tips?: RelatedProductRow[] | null;
  nutritional_info?: RelatedProductRow[] | null;
  product_images?: RelatedProductRow[] | null;
  [key: string]: unknown;
};

export function normalizeProductApiRow(product: ProductApiRow) {
  const weightOptions = (product.weight_options || []).map(option => ({
    ...option,
    image: option.image ? getProductImageUrl(option.image) : null,
  }));
  const images = (product.product_images || []).map(image => ({
    ...image,
    url: image.url ? getProductImageUrl(image.url) : image.url,
  }));

  return {
    ...product,
    image: getProductImageUrl(product.image),
    discount: product.discount ?? null,
    weightOptions,
    cookingTips: product.cooking_tips || [],
    nutritionalInfo: product.nutritional_info || [],
    images: product.product_images || [],
    product_images: images,
    weight_options: weightOptions,
  };
}
