import { create } from 'zustand';
import { productApi } from '../api/productApi';
import type { Category, Product } from '../types/product';

interface ProductState {
  categories: Category[];
  products: Product[];
  rankingProducts: Product[];
  selectedProduct?: Product;
  selectedCategoryId?: string;
  isLoading: boolean;
  errorMessage?: string;
  loadCategories: () => Promise<void>;
  loadProducts: (categoryId?: string) => Promise<void>;
  loadRankingProducts: () => Promise<void>;
  loadProduct: (productId: string) => Promise<void>;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return '상품 정보를 불러오지 못했습니다.';
};

export const useProductStore = create<ProductState>((set) => ({
  categories: [],
  products: [],
  rankingProducts: [],
  selectedProduct: undefined,
  selectedCategoryId: undefined,
  isLoading: false,
  errorMessage: undefined,

  loadCategories: async (): Promise<void> => {
    set({ isLoading: true, errorMessage: undefined });

    try {
      const categories = await productApi.getCategories();
      set({ categories, isLoading: false });
    } catch (error) {
      set({ errorMessage: getErrorMessage(error), isLoading: false });
    }
  },

  loadProducts: async (categoryId?: string): Promise<void> => {
    set({ isLoading: true, errorMessage: undefined, selectedCategoryId: categoryId });

    try {
      const products = await productApi.getProducts(categoryId);
      set({ products, isLoading: false });
    } catch (error) {
      set({ errorMessage: getErrorMessage(error), isLoading: false });
    }
  },

  loadRankingProducts: async (): Promise<void> => {
    set({ isLoading: true, errorMessage: undefined });

    try {
      const rankingProducts = await productApi.getRankingProducts();
      set({ rankingProducts, isLoading: false });
    } catch (error) {
      set({ errorMessage: getErrorMessage(error), isLoading: false });
    }
  },

  loadProduct: async (productId: string): Promise<void> => {
    set({ isLoading: true, errorMessage: undefined, selectedProduct: undefined });

    try {
      const selectedProduct = await productApi.getProduct(productId);
      set({ selectedProduct, isLoading: false });
    } catch (error) {
      set({ errorMessage: getErrorMessage(error), isLoading: false });
    }
  },
}));
