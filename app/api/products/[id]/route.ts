// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProductImageUrl } from '@/lib/imageUtils';
import { createServiceRoleClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use service role client for API routes
    const supabase = createServiceRoleClient();
    
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    console.log('Fetching product with ID:', id);

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
      console.error('Supabase error fetching product:', {
        message: error.message,
        details: error.details,
        code: error.code,
        id
      });
      
      return NextResponse.json(
        { 
          error: 'Product not found', 
          details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        },
        { status: 404 }
      );
    }

    if (!product) {
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
    console.error('Error in product API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined 
      },
      { status: 500 }
    );
  }
}
