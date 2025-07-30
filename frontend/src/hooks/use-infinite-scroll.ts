import { useRef, useCallback } from 'react';

const useInfiniteScroll = (
  loadMore: () => Promise<{ hasMore: boolean }>
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const result = await loadMore();
        if (!result.hasMore && observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [loadMore]);

  return lastElementRef;
};

export default useInfiniteScroll;