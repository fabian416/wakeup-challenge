import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-500">{product.restaurant}</p>
      <p className="text-lg font-semibold">${product.price}</p>
    </div>
  );
};
