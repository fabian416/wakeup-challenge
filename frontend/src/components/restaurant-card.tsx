import { Restaurant } from '@/types';
import Link from 'next/link';

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-102 hover:shadow-lg cursor-pointer">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-800">{restaurant.name}</h5>
      </div>
    </Link>
  );
};