import { Product, Restaurant } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '');

export const getRestaurants = async (
  page: number,
  limit: number
): Promise<{ data: Restaurant[]; hasMore: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/restaurants?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch restaurants: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getProducts = async (
  restaurantId: string,
  page: number,
  limit: number,
): Promise<{ data: Product[]; hasMore: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/restaurants/${restaurantId}/products?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
};