
import { getRestaurants, getProducts } from './api';
import { Restaurant, Product } from '@/types';

// Mock the global fetch function
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('API Service', () => {
  afterEach(() => {
    mockFetch.mockClear();
  });

  describe('getRestaurants', () => {
    it('should fetch restaurants successfully', async () => {
      const mockRestaurants: Restaurant[] = [
        { id: '1', name: 'Restaurant A', products: [] },
        { id: '2', name: 'Restaurant B', products: [] },
      ];
      const mockResponse = { data: mockRestaurants, hasMore: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getRestaurants(1, 10);

      expect(mockFetch).toHaveBeenCalledWith('/api/restaurants?page=1&limit=10');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getRestaurants(1, 10)).rejects.toThrow(
        'Failed to fetch restaurants: 500'
      );
    });
  });

  describe('getProducts', () => {
    it('should fetch products for a restaurant successfully', async () => {
      const mockProducts: Product[] = [
        { id: 'p1', name: 'Product A', price: 10 },
        { id: 'p2', name: 'Product B', price: 20 },
      ];
      const mockResponse = { data: mockProducts, hasMore: false };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getProducts('res1', 1, 5);

      expect(mockFetch).toHaveBeenCalledWith('/api/restaurants/res1/products?page=1&limit=5');
      expect(result).toEqual(mockResponse);
    });
  });
});
