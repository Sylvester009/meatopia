// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProductImageUrl } from '@/lib/imageUtils';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const { id } = await params;

    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        tags (*),
        cooking_tips (*),
        nutritional_info (*),
        weight_options (*),
        product_images (*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform image URLs
    const transformedProduct = {
      ...product,
      image: getProductImageUrl(product.image),
      product_images: (product.product_images || []).map((img: any) => ({
        ...img,
        url: getProductImageUrl(img.url),
      })),
      weight_options: (product.weight_options || []).map((option: any) => ({
        ...option,
        image: option.image ? getProductImageUrl(option.image) : null,
      })),
    };

    return NextResponse.json({ product: transformedProduct });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
