import React from 'react';
import { Star, Heart, Clock, DollarSign } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
  isFavorite: boolean;
  onToggleFavorite: (restaurantId: number) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  isFavorite,
  onToggleFavorite
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(restaurant.id);
  };

  return (
    <div className="restaurant-card" onClick={() => onClick(restaurant)}>
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-64 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors duration-300 z-10"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="restaurant-title text-xl font-semibold text-white">{restaurant.name}</h3>
              <span className="px-2 py-1 bg-blue-500/80 text-white text-sm rounded-full">
                {restaurant.cuisine}
              </span>
            </div>
            <span className="text-white font-medium">
              {Array(restaurant.priceRange.length).fill('$').join('')}
            </span>
          </div>
          <div className="restaurant-info flex items-center text-white/90">
            <Star className="rating-star fill-current" />
            <span className="ml-1 font-medium">{restaurant.rating.toFixed(1)}</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4" />
            <span className="ml-1">{restaurant.openingHours.split(':')[0]}</span>
            <span className="mx-2">•</span>
            <span>{restaurant.reviews.length} reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};