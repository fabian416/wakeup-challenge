"use client"
import { useEffect, useRef, useState } from "react";
import { Restaurant } from "@/types";
import { getRestaurants } from "@/services/api";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { RestaurantCard } from "./restaurant-card";

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1); 

  const loadMoreRestaurants = async (): Promise<{ hasMore: boolean }> => {
    if (loading || !hasMore) return { hasMore: false };
  
    setLoading(true);
  
    try {
      const { data: newRestaurants, hasMore: newHasMore } = await getRestaurants(pageRef.current, 10);
  
      setRestaurants((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const uniqueNew = newRestaurants.filter((r) => !existingIds.has(r.id));
        return [...prev, ...uniqueNew];
      });
  
      if (newHasMore) {
        pageRef.current += 1;
      }
  
      setHasMore(newHasMore);
      return { hasMore: newHasMore }; 
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      return { hasMore: false };
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMoreRestaurants();
  }, []);

  const lastElementRef = useInfiniteScroll(loadMoreRestaurants);

  return (
    <div className="grid grid-cols-1 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
      {hasMore && <div ref={lastElementRef} />}
      {loading && <p>Loading...</p>}
      {!hasMore && !loading && <p className="text-center">No more restaurants to load.</p>}
    </div>
  );
};