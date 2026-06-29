// services/productService.ts
import api from '@/lib/axios';
import { supabase } from '@/lib/supabase';
import { AxiosResponse } from 'axios';

// Types
export interface Product {
    id: string;
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

// Product API Service
export const productService = {
    // Get all products with pagination and filters
    getProducts: async (params?: GetProductsParams): Promise<PaginatedResponse> => {
        const response: AxiosResponse<PaginatedResponse> = await api.get('/products', {
            params: {
                category: params?.category,
                limit: params?.limit || 50,
                page: params?.page || 1,
                search: params?.search,
                sortBy: params?.sortBy,
                sortOrder: params?.sortOrder,
            },
        });
        return response.data;
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

            return data || [];
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    // Get a single product by ID
    getProduct: async (id: string): Promise<Product> => {
        const response: AxiosResponse<{ product: Product }> = await api.get(`/products/${id}`);
        return response.data.product;
    },

    // Get products by category
    getProductsByCategory: async (category: string, limit?: number): Promise<Product[]> => {
        const response: AxiosResponse<PaginatedResponse> = await api.get('/products', {
            params: { category, limit: limit || 20, page: 1 },
        });
        return response.data.products;
    },

    // Search products
    searchProducts: async (query: string, limit?: number): Promise<Product[]> => {
        const response: AxiosResponse<PaginatedResponse> = await api.get('/products', {
            params: { search: query, limit: limit || 20, page: 1 },
        });
        return response.data.products;
    },

    // Get featured products (using tag filtering)
    getFeaturedProducts: async (limit?: number): Promise<Product[]> => {
        const response: AxiosResponse<PaginatedResponse> = await api.get('/products', {
            params: { limit: limit || 6, page: 1 },
        });
        return response.data.products.filter(p => p.tag === 'Popular');
    },

    // Get product categories
    getCategories: async (): Promise<string[]> => {
        const response: AxiosResponse<{ categories: string[] }> = await api.get('/categories');
        return response.data.categories;
    },

     async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
        try {
            // Step 1: Insert the product
            const id = `product_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            
            const { data: product, error: productError } = await supabase
                .from('products')
                .insert({
                    id: id,
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
            if (productData.cookingTips && productData.cookingTips.length > 0) {
                const { error: cookingError } = await supabase
                    .from('cooking_tips')
                    .insert(
                        productData.cookingTips.map(tip => ({
                            tip: typeof tip === 'string' ? tip : tip.tip,
                            product_id: product.id,
                        }))
                    );

                if (cookingError) {
                    console.error('Error creating cooking tips:', cookingError);
                }
            }

            // Step 4: Create Nutritional Info
            if (productData.nutritionalInfo && productData.nutritionalInfo.length > 0) {
                const { error: nutritionError } = await supabase
                    .from('nutritional_info')
                    .insert(
                        productData.nutritionalInfo.map(info => ({
                            info: typeof info === 'string' ? info : info.info,
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

            // Step 6: Fetch the complete product with relations
            const completeProduct = await productService.getProduct(product.id);
            return completeProduct;
        } catch (error) {
            console.error('Error in createProduct:', error);
            return null;
        }
    },

    // ✅ UPDATE PRODUCT
    async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
        try {
            // Step 1: Prepare update data
            const updateData: any = {
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
                updated_at: new Date().toISOString(),
            };

            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });

            // Step 2: Update the product
            const { data: product, error: productError } = await supabase
                .from('products')
                .update(updateData)
                .eq('id', id)
                .select()
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
            if (productData.cookingTips !== undefined) {
                await supabase.from('cooking_tips').delete().eq('product_id', id);
                
                if (productData.cookingTips.length > 0) {
                    const { error: cookingError } = await supabase
                        .from('cooking_tips')
                        .insert(
                            productData.cookingTips.map(tip => ({
                                tip: typeof tip === 'string' ? tip : tip.tip,
                                product_id: id,
                            }))
                        );

                    if (cookingError) {
                        console.error('Error updating cooking tips:', cookingError);
                    }
                }
            }

            // Step 5: Update Nutritional Info
            if (productData.nutritionalInfo !== undefined) {
                await supabase.from('nutritional_info').delete().eq('product_id', id);
                
                if (productData.nutritionalInfo.length > 0) {
                    const { error: nutritionError } = await supabase
                        .from('nutritional_info')
                        .insert(
                            productData.nutritionalInfo.map(info => ({
                                info: typeof info === 'string' ? info : info.info,
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

            // Step 7: Fetch the complete product with relations
            const completeProduct = await productService.getProduct(id);
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

            const { data, error } = await supabase.storage
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