import React, { useState } from 'react';
import { Star, X, Heart, MapPin, Clock, DollarSign } from 'lucide-react';
import { Restaurant, Review } from '../types';
import { StarRating } from './StarRating';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
  onAddReview: (restaurantId: number, review: Omit<Review, 'id' | 'date'>) => void;
  onToggleFavorite: (restaurantId: number) => void;
  isFavorite: boolean;
}

export const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurant,
  onClose,
  onAddReview,
  onToggleFavorite,
  isFavorite
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [visitDate, setVisitDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview(restaurant.id, {
      userName,
      rating,
      comment,
      visitDate
    });
    setRating(5);
    setComment('');
    setUserName('');
    setVisitDate('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => onToggleFavorite(restaurant.id)}
              className="bg-white/90 p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="bg-white/90 p-2 rounded-full text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative h-80">
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-4xl font-bold text-white">{restaurant.name}</h2>
                    <span className="px-3 py-1 bg-blue-500/80 text-white rounded-full text-sm">
                      {restaurant.cuisine}
                    </span>
                  </div>
                  <span className="text-white text-xl font-medium">
                    {Array(restaurant.priceRange.length).fill('$').join('')}
                  </span>
                </div>
                <div className="flex items-center text-white/90 gap-4">
                  <div className="flex items-center">
                    <Star className="rating-star fill-current" />
                    <span className="ml-1 font-medium">{restaurant.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5" />
                    <span className="ml-1">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5" />
                    <span className="ml-1">{restaurant.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{restaurant.description}</p>
            
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Reviews</h3>
              <div className="space-y-4">
                {restaurant.reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg">{review.userName}</span>
                      <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Visited: {review.visitDate}</span>
                      <span>Posted: {review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="border-t border-gray-100 pt-8">
              <h3 className="text-2xl font-bold mb-6">Add Your Review</h3>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input-field"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Visit Date
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="input-field"
                  required
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Rating
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input-field h-32 resize-none"
                  required
                  placeholder="Share your dining experience..."
                />
              </div>
              
              <button type="submit" className="btn-primary">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};