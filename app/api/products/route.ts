// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProductImageUrl } from '@/lib/imageUtils';
import { prisma } from '@/prisma/seed';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (category && category !== 'All Meats') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy
    let orderBy: any = {};
    if (sortBy === 'price') {
      orderBy.price = sortOrder;
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder;
    } else if (sortBy === 'rating') {
      orderBy.rating = sortOrder;
    } else if (sortBy === 'reviewsCount') {
      orderBy.reviewsCount = sortOrder;
    } else {
      orderBy.name = 'asc';
    }

    // Get products
    const products = await prisma.product.findMany({
      where,
      include: {
        tags: true,
        cookingTips: true,
        nutritionalInfo: true,
        weightOptions: true,
        images: true,
      },
      skip,
      take: limit,
      orderBy,
    });

    // Transform image URLs
    const transformedProducts = products.map(product => ({
      ...product,
      image: getProductImageUrl(product.image),
      images: product.images.map(img => ({
        ...img,
        url: getProductImageUrl(img.url),
      })),
      weightOptions: product.weightOptions.map(option => ({
        ...option,
        image: option.image ? getProductImageUrl(option.image) : null,
      })),
    }));

    // Get total count
    const total = await prisma.product.count({ where });

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
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