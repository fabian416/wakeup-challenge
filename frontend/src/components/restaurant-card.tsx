import { Restaurant } from '@/types';
import Link from 'next/link';

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{restaurant.name}</h5>
      </div>
    </Link>
  );
};