import { supabase } from '@/lib/supabase';
import { normalizeProductApiRow } from '@/lib/productApi';
import { slugifyProductName } from '@/lib/productSlug';

// Types
export interface Product {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
    tagColor?: string;
    rating?: number;
    reviewsCount: number;
    weightUnit?: string;
    discount?: number | null;
    tags?: Tag[];
    cookingTips?: CookingTip[];
    nutritionalInfo?: NutritionalInfo[];
    weightOptions?: WeightOption[];
    images?: ProductImage[];
}

export interface Tag {
    id: number;
    icon?: string;
    label: string;
    color?: string;
}

export interface WeightOption {
    id: number;
    label: string;
    multiplier: number;
    image?: string;
}

export interface CookingTip {
    id: number;
    tip: string;
}

export interface NutritionalInfo {
    id: number;
    info: string;
}

export interface ProductImage {
    id: number;
    url: string;
}

export type ProductEditorInput = {
    id?: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    tag?: string;
    tagColor?: string;
    rating?: number;
    reviewsCount: number;
    weightUnit?: string;
    discount?: number | null;
    tags?: Array<Pick<Tag, 'label'> & Partial<Pick<Tag, 'icon' | 'color'>>>;
    weightOptions?: Array<Pick<WeightOption, 'label' | 'multiplier'> & {image?: string}>;
    details?: {
        cookingTips: string[];
        nutritionalInfo: string[];
    };
    cookingTips?: string[];
    nutritionalInfo?: string[];
};

export interface PaginatedResponse {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface GetProductsParams {
    category?: string;
    limit?: number;
    page?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

async function getUniqueProductSlug(name: string, excludeId?: string): Promise<string> {
    const baseSlug = slugifyProductName(name);
    const { data, error } = await supabase
        .from('products')
        .select('id, slug')
        .like('slug', `${baseSlug}%`);

    if (error) {
        console.error('Error checking product slug availability:', error);
        throw error;
    }

    const usedSlugs = new Set(
        (data || [])
            .filter(product => product.id !== excludeId)
            .map(product => product.slug),
    );

    let slug = baseSlug;
    let suffix = 2;
    while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
    }

    return slug;
}

async function getProductsFromSupabase(params?: GetProductsParams): Promise<PaginatedResponse> {
    const limit = params?.limit || 50;
    const page = params?.page || 1;
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const sortBy = params?.sortBy || 'name';
    const sortOrder = params?.sortOrder || 'asc';

    let query = supabase
        .from('products')
        .select(`
            *,
            tags (*),
            cooking_tips (*),
            nutritional_info (*),
            weight_options (*),
            product_images (*)
        `, { count: 'exact' });

    if (params?.category && params.category !== 'All Meats') {
        query = query.eq('category', params.category);
    }

    if (params?.search) {
        query = query.or(
            `name.ilike.%${params.search}%,description.ilike.%${params.search}%,category.ilike.%${params.search}%`,
        );
    }

    const { data, error, count } = await query
        .order(sortBy, { ascending: sortOrder === 'asc' })
        .range(start, end);

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

    return {
        products: (data || []).map(product =>
            normalizeProductApiRow(product),
        ),
        pagination: {
            total: count || 0,
            page,
            limit,
            totalPages: Math.ceil((count || 0) / limit),
        },
    };
}

// Product API Service
export const productService = {
    // Get all products with pagination and filters
    getProducts: async (params?: GetProductsParams): Promise<PaginatedResponse> => {
        return getProductsFromSupabase(params);
    },

    // Get all products directly from Supabase
    async getAllProducts(): Promise<Product[]> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
                    *,
                    tags (*),
                    cooking_tips (*),
                    nutritional_info (*),
                    weight_options (*),
                    product_images (*)
                `)

            if (error) {
                console.error('Error fetching products:', error);
                return [];
            }

            const normalizedData = data?.map(product => ({
                ...product,
                discount: product.discount !== undefined ? product.discount : null,
                weightOptions: product.weight_options || [],
                cookingTips: product.cooking_tips || [],
                nutritionalInfo: product.nutritional_info || [],
                tags: product.tags || [],
                images: product.product_images || [],
            })) || [];

            return normalizedData;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    async getProductFromSupabase(id: string): Promise<Product | null> {
        try {
            let { data, error } = await supabase
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

            // Fall back to the database ID so existing product URLs can redirect to their slug.
            if (!error && !data) {
                ({ data, error } = await supabase
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
                console.error('Error fetching product from Supabase:', error);
                return null;
            }

            if (!data) {
                return null;
            }

            const normalizedProduct = normalizeProductApiRow(data);
            return {
                ...normalizedProduct,
                tags: data.tags || [],
            };
        } catch (error) {
            console.error('Error in getProductFromSupabase:', error);
            return null;
        }
    },

    // Get a single product by ID
    getProduct: async (id: string): Promise<Product> => {
        const product = await productService.getProductFromSupabase(id);
        if (!product) {
            throw new Error(`Product not found: ${id}`);
        }
        return product;
    },

    // Get products by category
    getProductsByCategory: async (category: string, limit?: number): Promise<Product[]> => {
        const response = await getProductsFromSupabase({
            category,
            limit: limit || 20,
            page: 1,
        });
        return response.products;
    },

    // Search products
    searchProducts: async (query: string, limit?: number): Promise<Product[]> => {
        const response = await getProductsFromSupabase({
            search: query,
            limit: limit || 20,
            page: 1,
        });
        return response.products;
    },

    // Get featured products (using tag filtering)
    getFeaturedProducts: async (limit?: number): Promise<Product[]> => {
        const response = await getProductsFromSupabase({
            limit: limit || 6,
            page: 1,
        });
        return response.products.filter(p => p.tag === 'Popular');
    },

    // Get product categories
    getCategories: async (): Promise<string[]> => {
        const { data, error } = await supabase
            .from('products')
            .select('category')
            .order('category', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }

        return [...new Set((data || []).map(product => product.category))];
    },

     async createProduct(productData: ProductEditorInput): Promise<Product | null> {
        try {
            // Step 1: Insert the product
            const id = `product_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            const slug = await getUniqueProductSlug(productData.name);
            
            const { data: product, error: productError } = await supabase
                .from('products')
                .insert({
                    id: id,
                    slug,
                    name: productData.name,
                    category: productData.category,
                    price: productData.price,
                    description: productData.description,
                    image: productData.image,
                    tag: productData.tag || null,
                    tagColor: productData.tagColor || null,
                    rating: productData.rating || null,
                    reviewsCount: productData.reviewsCount || 0,
                    weightUnit: productData.weightUnit || null,
                    discount: productData.discount || null,
                })
                .select()
                .single();

            if (productError) {
                console.error('Error creating product:', productError);
                throw productError;
            }

            // Step 2: Create Tags
            if (productData.tags && productData.tags.length > 0) {
                const { error: tagsError } = await supabase
                    .from('tags')
                    .insert(
                        productData.tags.map(tag => ({
                            icon: tag.icon || null,
                            label: tag.label,
                            color: tag.color || null,
                            product_id: product.id,
                        }))
                    );

                if (tagsError) {
                    console.error('Error creating tags:', tagsError);
                    // Continue - don't throw, just log
                }
            }

            // Step 3: Create Cooking Tips
            const cookingTips =
                productData.cookingTips ?? productData.details?.cookingTips;
            if (cookingTips && cookingTips.length > 0) {
                const { error: cookingError } = await supabase
                    .from('cooking_tips')
                    .insert(
                        cookingTips.map(tip => ({
                            tip,
                            product_id: product.id,
                        }))
                    );

                if (cookingError) {
                    console.error('Error creating cooking tips:', cookingError);
                }
            }

            // Step 4: Create Nutritional Info
            const nutritionalInfo =
                productData.nutritionalInfo ?? productData.details?.nutritionalInfo;
            if (nutritionalInfo && nutritionalInfo.length > 0) {
                const { error: nutritionError } = await supabase
                    .from('nutritional_info')
                    .insert(
                        nutritionalInfo.map(info => ({
                            info,
                            product_id: product.id,
                        }))
                    );

                if (nutritionError) {
                    console.error('Error creating nutritional info:', nutritionError);
                }
            }

            // Step 5: Create Weight Options
            if (productData.weightOptions && productData.weightOptions.length > 0) {
                const { error: weightError } = await supabase
                    .from('weight_options')
                    .insert(
                        productData.weightOptions.map(option => ({
                            label: option.label,
                            multiplier: option.multiplier,
                            image: option.image || null,
                            product_id: product.id,
                        }))
                    );

                if (weightError) {
                    console.error('Error creating weight options:', weightError);
                }
            }

            const completeProduct = await productService.getProductFromSupabase(product.id);
            return completeProduct;
        } catch (error) {
            console.error('Error in createProduct:', error);
            return null;
        }
    },

    // UPDATE PRODUCT
    async updateProduct(id: string, productData: ProductEditorInput): Promise<Product | null> {
        try {
            // Step 1: Prepare update data
            const updateData: Record<string, unknown> = {
                slug: await getUniqueProductSlug(productData.name, id),
                name: productData.name,
                category: productData.category,
                price: productData.price,
                description: productData.description,
                image: productData.image,
                tag: productData.tag || null,
                tagColor: productData.tagColor || null,
                rating: productData.rating || null,
                reviewsCount: productData.reviewsCount || 0,
                weightUnit: productData.weightUnit || null,
                discount: productData.discount || null,
                updated_at: new Date().toISOString(),
            };

            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });

            // Step 2: Update the product
            const { error: productError } = await supabase
                .from('products')
                .update(updateData)
                .eq('id', id)
                .select('id')
                .single();

            if (productError) {
                console.error('Error updating product:', productError);
                throw productError;
            }

            // Step 3: Update Tags (delete old, create new)
            if (productData.tags !== undefined) {
                // Delete existing tags
                await supabase.from('tags').delete().eq('product_id', id);
                
                // Create new tags
                if (productData.tags.length > 0) {
                    const { error: tagsError } = await supabase
                        .from('tags')
                        .insert(
                            productData.tags.map(tag => ({
                                icon: tag.icon || null,
                                label: tag.label,
                                color: tag.color || null,
                                product_id: id,
                            }))
                        );

                    if (tagsError) {
                        console.error('Error updating tags:', tagsError);
                    }
                }
            }

            // Step 4: Update Cooking Tips
            const cookingTips =
                productData.cookingTips ?? productData.details?.cookingTips;
            if (cookingTips !== undefined) {
                await supabase.from('cooking_tips').delete().eq('product_id', id);
                
                if (cookingTips.length > 0) {
                    const { error: cookingError } = await supabase
                        .from('cooking_tips')
                        .insert(
                            cookingTips.map(tip => ({
                                tip,
                                product_id: id,
                            }))
                        );

                    if (cookingError) {
                        console.error('Error updating cooking tips:', cookingError);
                    }
                }
            }

            // Step 5: Update Nutritional Info
            const nutritionalInfo =
                productData.nutritionalInfo ?? productData.details?.nutritionalInfo;
            if (nutritionalInfo !== undefined) {
                await supabase.from('nutritional_info').delete().eq('product_id', id);
                
                if (nutritionalInfo.length > 0) {
                    const { error: nutritionError } = await supabase
                        .from('nutritional_info')
                        .insert(
                            nutritionalInfo.map(info => ({
                                info,
                                product_id: id,
                            }))
                        );

                    if (nutritionError) {
                        console.error('Error updating nutritional info:', nutritionError);
                    }
                }
            }

            // Step 6: Update Weight Options
            if (productData.weightOptions !== undefined) {
                await supabase.from('weight_options').delete().eq('product_id', id);
                
                if (productData.weightOptions.length > 0) {
                    const { error: weightError } = await supabase
                        .from('weight_options')
                        .insert(
                            productData.weightOptions.map(option => ({
                                label: option.label,
                                multiplier: option.multiplier,
                                image: option.image || null,
                                product_id: id,
                            }))
                        );

                    if (weightError) {
                        console.error('Error updating weight options:', weightError);
                    }
                }
            }

            const completeProduct = await productService.getProductFromSupabase(id);
            return completeProduct;
        } catch (error) {
            console.error('Error in updateProduct:', error);
            return null;
        }
    },

    // Delete a product
    async deleteProduct(id: string): Promise<void> {
        try {
            // Delete related data first - using snake_case column names
            await supabase.from('tags').delete().eq('product_id', id);
            await supabase.from('cooking_tips').delete().eq('product_id', id);
            await supabase.from('nutritional_info').delete().eq('product_id', id);
            await supabase.from('weight_options').delete().eq('product_id', id);
            await supabase.from('product_images').delete().eq('product_id', id);

            // Delete the product
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting product:', error);
                throw error;
            }
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            throw error;
        }
    },

    // Upload product image
    async uploadProductImage(file: File, productId: string): Promise<string> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${productId}/${Date.now()}.${fileExt}`;

            const { error } = await supabase.storage
                .from('product-images')
                .upload(fileName, file);

            if (error) {
                console.error('Error uploading image:', error);
                throw error;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(fileName);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    // Delete product image
    async deleteProductImage(imageUrl: string): Promise<void> {
        try {
            const fileName = imageUrl.split('/').pop();
            if (!fileName) return;

            const { error } = await supabase.storage
                .from('product-images')
                .remove([fileName]);

            if (error) {
                console.error('Error deleting image:', error);
                throw error;
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    },
};

// Individual exports for convenience
export const getProducts = productService.getProducts;
export const getAllProducts = productService.getAllProducts;
export const getProduct = productService.getProduct;
export const getProductsByCategory = productService.getProductsByCategory;
export const searchProducts = productService.searchProducts;
export const getFeaturedProducts = productService.getFeaturedProducts;
export const getCategories = productService.getCategories;
export const deleteProduct = productService.deleteProduct;
export const createProduct = productService.createProduct;
export const updateProduct = productService.updateProduct;
export const uploadProductImage = productService.uploadProductImage;