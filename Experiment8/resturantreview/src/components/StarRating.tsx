import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  max?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, max = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(index + 1)}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-all duration-200 ${
              index < value
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } hover:scale-110`}
          />
        </button>
      ))}
    </div>
  );
};