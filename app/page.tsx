'use client';

import {useState, useEffect, useMemo, useCallback} from 'react';
import {useInfiniteScroll} from '@/hooks/useInfiniteScroll';
import {useSearch} from '@/context/SearchContext';
import {getProducts, getCategories} from '@/services/productService';
import type {Product} from '@/services/productService';
import ProductCard from '@/components/productCards';

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Meats');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Meats']);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {searchTerm} = useSearch();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(['All Meats', ...data]);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        // Keep default categories if API fails
        setCategories([
          'All Meats',
          'Beef',
          'Goat Meat',
          'Chicken',
          'Turkey',
          'Rabbit',
          'Meat Sharing',
        ]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsInitialLoading(true);
      setError(null);

      try {
        const params: any = {
          limit: 100,
          page: 1,
        };

        if (selectedCategory !== 'All Meats') {
          params.category = selectedCategory;
        }

        const data = await getProducts(params);
        setProducts(data.products || []);

        setPage(1);
        const initialProducts = (data.products || []).slice(0, ITEMS_PER_PAGE);
        setDisplayedProducts(initialProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
        setProducts([]);
        setDisplayedProducts([]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Filter products by search term (client-side)
  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchTerm.trim() !== '') {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return result;
  }, [products, searchTerm]);

  // Reset displayed products when search changes
  useEffect(() => {
    const initialProducts = filteredProducts.slice(0, ITEMS_PER_PAGE);
    setDisplayedProducts(initialProducts);
    setPage(1);
  }, [filteredProducts]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      const newProducts = filteredProducts.slice(0, endIndex);

      setDisplayedProducts(newProducts);
      setPage(nextPage);
      setIsLoading(false);
    }, 300);
  }, [hasMore, isLoading, page, filteredProducts]);

  // Use infinite scroll hook
  const {loadMoreRef} = useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: loadMoreProducts,
    threshold: 100,
  });

  // Loading state
  if (isInitialLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-[#6f8961]">Loading premium meats...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="px-4 lg:px-20 py-8 mx-auto w-full">
          <div className="mb-8 mt-4">
            <div className="flex items-center gap-2 text-xs text-[#6f8961] mb-2 uppercase tracking-widest font-bold">
              <span>Shop</span>
              <span className="material-symbols-outlined text-[12px]">
                chevron_right
              </span>
              <span className="text-primary">Catalog</span>
            </div>
            <h1 className="text-[#131811] tracking-tight text-4xl font-extrabold">
              Meatopia Premium Catalog
            </h1>
            <p className="text-[#6f8961] mt-2 max-w-xl">
              Fresh, premium quality meats sourced locally. Ethically processed
              and delivered to your doorstep across Nigeria.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-2 rounded-xl border border-[#e2e8e2]">
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-[#162210] font-bold shadow-sm'
                      : 'bg-[#eef2ee] text-[#131811] hover:bg-[#e2e8e2]'
                  }`}
                >
                  <span>{category}</span>
                </button>
              ))}
            </div>
            <div className="items-center gap-2 px-2 border-l border-[#e2e8e2] hidden md:flex">
              <span className="text-sm text-[#6f8961]">
                Showing {displayedProducts.length} of {filteredProducts.length}{' '}
                products
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Loading and Load More Indicator */}
          <div className="mt-8 text-center">
            {isLoading && (
              <div className="inline-flex items-center gap-2 text-[#6f8961]">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <span>Loading more products...</span>
              </div>
            )}

            {hasMore && !isLoading && (
              <div ref={loadMoreRef} className="h-10"></div>
            )}

            {!hasMore && displayedProducts.length > 0 && (
              <p className="text-[#6f8961] py-4">
                You&apos;ve reached the end of{' '}
                {selectedCategory === 'All Meats'
                  ? 'all products'
                  : selectedCategory}
              </p>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6f8961] text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
