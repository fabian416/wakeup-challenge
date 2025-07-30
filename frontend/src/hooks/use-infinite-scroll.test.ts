import { renderHook } from '@testing-library/react';
import useInfiniteScroll from './use-infinite-scroll';

describe('useInfiniteScroll', () => {
  it('should call loadMore when the last element is intersecting', () => {
    const loadMore = jest.fn().mockResolvedValue({ hasMore: true });
    const { result } = renderHook(() => useInfiniteScroll(loadMore));

    const observe = jest.fn();
    const disconnect = jest.fn();

    const mockIntersectionObserver = jest.fn((callback: IntersectionObserverCallback) => ({
      observe,
            disconnect,
      unobserve: jest.fn(),
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: jest.fn(),
    }));

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: mockIntersectionObserver,
    });

    const lastElement = document.createElement('div');
    result.current(lastElement);

    // Simulate intersection
    mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver);

    expect(loadMore).toHaveBeenCalled();
  });
});
