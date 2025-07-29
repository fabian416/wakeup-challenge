import { Product } from '@/types';

export const ProductCard = ({
  product,
  onAddToOrder,
}: {
  product: Product;
  onAddToOrder: (product: Product) => void;
}) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product.name}</h5>
          <p className="font-normal text-gray-700">${product.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onAddToOrder(product)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};
