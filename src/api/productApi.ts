import { httpClient } from './httpClient';
import { mockAdapter } from './mockAdapter';
import type { Category, Product } from '../types/product';

export const productApi = {
  async getCategories(): Promise<Category[]> {
    const response = await httpClient.request<Category[]>({
      url: '/categories',
      method: 'GET',
      adapter: mockAdapter,
    });

    return response.data;
  },

  async getProducts(categoryId?: string): Promise<Product[]> {
    const response = await httpClient.request<Product[]>({
      url: '/products',
      method: 'GET',
      params: { categoryId },
      adapter: mockAdapter,
    });

    return response.data;
  },

  async getRankingProducts(): Promise<Product[]> {
    const response = await httpClient.request<Product[]>({
      url: '/products/ranking',
      method: 'GET',
      adapter: mockAdapter,
    });

    return response.data;
  },

  async getProduct(productId: string): Promise<Product> {
    const response = await httpClient.request<Product>({
      url: `/products/${productId}`,
      method: 'GET',
      adapter: mockAdapter,
    });

    return response.data;
  },
};
