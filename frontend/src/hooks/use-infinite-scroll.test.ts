import { renderHook } from '@testing-library/react';
import useInfiniteScroll from './use-infinite-scroll';

describe('useInfiniteScroll', () => {
  it('should call loadMore when the last element is intersecting', () => {
    const loadMore = jest.fn().mockResolvedValue({ hasMore: true });
    const { result } = renderHook(() => useInfiniteScroll(loadMore));

    const observe = jest.fn();
    const disconnect = jest.fn();
    const mockIntersectionObserver = jest.fn((callback) => ({
      observe,
      disconnect,
      unobserve: jest.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: jest.fn(),
    }));

    (global as any).IntersectionObserver = mockIntersectionObserver;

    const lastElement = document.createElement('div');
    result.current(lastElement);

    const [callback] = mockIntersectionObserver.mock.calls[0];
    callback([{ isIntersecting: true }]);

    expect(loadMore).toHaveBeenCalled();
  });
});
