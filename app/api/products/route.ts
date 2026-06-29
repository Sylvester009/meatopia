// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProductImageUrl } from '@/lib/imageUtils';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    // Build query
    let query = supabase
      .from('products')
      .select(`
        *,
        tags (*),
        cooking_tips (*),
        nutritional_info (*),
        weight_options (*),
        product_images (*)
      `, { count: 'exact' })
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(start, end);

    // Apply filters
    if (category && category !== 'All Meats') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    // Transform image URLs
    const transformedProducts = (data || []).map((product: any) => ({
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
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}