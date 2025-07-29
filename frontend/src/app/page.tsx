"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { getProducts } from "@/services/products";
import { ProductList } from "@/components/product-list";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreProducts = async () => {
    setLoading(true);
    const newProducts = await getProducts(page, 10);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  const lastElementRef = useInfiniteScroll(loadMoreProducts);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <ProductList products={products} />
      <div ref={lastElementRef} />
      {loading && <p>Loading...</p>}
    </main>
  );
}
