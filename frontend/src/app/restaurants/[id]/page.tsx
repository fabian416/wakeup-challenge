"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/types";
import { getProducts } from "@/services/api";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";

export default function RestaurantPage() {
  const params = useParams();
  const id = params.id as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<Map<string, { product: Product; quantity: number }>>(new Map());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return { hasMore: false };
  
    setLoading(true);
  
    try {
      const { data: newProducts, hasMore: newHasMore } = await getProducts(id, page, 10);
      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew = newProducts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });
      setPage((prevPage) => prevPage + 1);
      setHasMore(newHasMore);
      return { hasMore: newHasMore };
    } catch (err) {
      console.error("Error fetching products:", err);
      return { hasMore: false };
    } finally {
      setLoading(false);
    }
  }, [hasMore, id, loading, page]);

  useEffect(() => {
    loadMoreProducts();
  }, [loadMoreProducts]);

  const lastElementRef = useInfiniteScroll(loadMoreProducts);

  const handleAddToOrder = (product: Product) => {
    setOrder((prevOrder) => {
      const newOrder = new Map(prevOrder);
      if (newOrder.has(product.id)) {
        const existing = newOrder.get(product.id)!;
        newOrder.set(product.id, { ...existing, quantity: existing.quantity + 1 });
      } else {
        newOrder.set(product.id, { product, quantity: 1 });
      }
      return newOrder;
    });
  };

  const handleSubmitOrder = async () => {
    const productIds = Array.from(order.values()).flatMap((item) =>
      Array(item.quantity).fill(item.product.id),
    );

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productIds }),
    });

    if (response.ok) {
      alert('Order submitted successfully!');
      setOrder(new Map()); // Clear the order
    } else {
      alert('Failed to submit order.');
    }
  };

  return (
    <main className="container mx-auto p-4">
      <Link href="/">
        <div className="text-blue-500 hover:underline">Back to Restaurants</div>
      </Link>
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex flex-col items-end">
          <h2 className="text-2xl font-bold">Order</h2>
          {order.size === 0 ? (
            <p>No items in order</p>
          ) : (
            <ul>
              {Array.from(order.values()).map((item) => (
                <li key={item.product.id}>
                  {item.product.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSubmitOrder}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 cursor-pointer"
            disabled={order.size === 0}
          >
            Submit Order
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToOrder={handleAddToOrder} />
        ))}
      </div>
      {hasMore && <div ref={lastElementRef} />}
      {loading && <p>Loading...</p>}
      {!hasMore && !loading && <p className="text-center">No more products to load.</p>}
    </main>
  );
}
