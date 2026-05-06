import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { categories, products } from '../data/mockProducts';
import type { Category, Product } from '../types/product';

type MockResponseData = Product[] | Category[] | Product;

const createResponse = <T extends MockResponseData>(config: InternalAxiosRequestConfig, data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
});

export const mockAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 180);
  });

  const url = config.url ?? '';

  if (url === '/categories') {
    return createResponse(config, categories);
  }

  if (url === '/products/ranking') {
    return createResponse(
      config,
      [...products].sort((first, second) => first.rank - second.rank),
    );
  }

  if (url.startsWith('/products/')) {
    const requestedId = url.replace('/products/', '');
    const normalizedId = requestedId.startsWith('p') && !requestedId.startsWith('p-')
      ? `p-${requestedId.slice(1).padStart(3, '0')}`
      : requestedId;
    const product = products.find((item) => item.id === normalizedId);

    if (!product) {
      return Promise.reject(new Error('상품을 찾을 수 없습니다.'));
    }

    return createResponse(config, product);
  }

  if (url.startsWith('/products')) {
    const params = config.params as { categoryId?: string } | undefined;
    const categoryId = params?.categoryId;
    const filteredProducts = categoryId
      ? products.filter((product) => product.categoryId === categoryId)
      : products;

    return createResponse(config, filteredProducts);
  }

  return Promise.reject(new Error(`Mock endpoint not found: ${url}`));
};
