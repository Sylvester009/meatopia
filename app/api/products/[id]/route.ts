// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { normalizeProductApiRow, type ProductApiRow } from '@/lib/productApi';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        tags (*),
        cooking_tips (*),
        nutritional_info (*),
        weight_options (*),
        product_images (*)
      `)
      .eq('slug', id.toLowerCase())
      .maybeSingle();

    if (!error && !product) {
      ({ data: product, error } = await supabase
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
        .maybeSingle());
    }

    if (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform image URLs and normalize data
    const transformedProduct = normalizeProductApiRow(
      product as ProductApiRow,
    );

    return NextResponse.json({ product: transformedProduct });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}