import { Product, Restaurant } from '@/types';

export const getRestaurants = async (
  page: number,
  limit: number
): Promise<{ data: Restaurant[]; hasMore: boolean }> => {
  const response = await fetch(`/api/restaurants?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch restaurants: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.data)) {
    console.warn("Expected array of restaurants in 'data', got:", data);
    return { data: [], hasMore: false };
  }

  return data; 
};

export const getProducts = async (
  restaurantId: string,
  page: number,
  limit: number,
): Promise<{ data: Product[]; hasMore: boolean }> => {
  const response = await fetch(`/api/restaurants/${restaurantId}/products?page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
};