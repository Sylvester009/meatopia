// app/api/categories/route.ts
import { prisma } from '@/prisma/seed';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get unique categories from products
    const categories = await prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc',
      },
    });

    const categoryList = categories.map(c => c.category);

    return NextResponse.json({ categories: categoryList });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}