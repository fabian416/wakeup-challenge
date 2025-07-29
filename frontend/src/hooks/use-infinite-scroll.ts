import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (loadMore: () => Promise<{ hasMore: boolean }>) => {
  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore().then((response) => {
            if (!response.hasMore) {
              if (observer.current) observer.current.disconnect();
            }
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore],
  );

  return lastElementRef;
};

export default useInfiniteScroll;
