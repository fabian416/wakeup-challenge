import { Product } from '@/types';

export const getProducts = async (page: number, limit: number): Promise<Product[]> => {
  const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
};
