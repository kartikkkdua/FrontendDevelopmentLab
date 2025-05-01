import React, { useState, useMemo } from 'react';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetail } from './components/RestaurantDetail';
import { CategoryFilter } from './components/CategoryFilter';
import { restaurants as initialRestaurants } from './data/restaurants';
import { Restaurant, Review, Cuisine } from './types';
import { Search, SlidersHorizontal, ArrowUpDown, Utensils } from 'lucide-react';

type SortOption = 'rating' | 'reviews' | 'name' | 'newest';

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('rating');

  const cuisines: Cuisine[] = useMemo(() => {
    const uniqueCuisines = Array.from(new Set(restaurants.map(restaurant => restaurant.cuisine)));
    return uniqueCuisines.map(cuisine => ({
      id: cuisine,
      name: cuisine
    }));
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (showOnlyFavorites) {
      result = result.filter(restaurant => favoriteRestaurants.includes(restaurant.id));
    }

    if (selectedCuisine) {
      result = result.filter(restaurant => restaurant.cuisine === selectedCuisine);
    }

    if (searchTerm) {
      result = result.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews.length - a.reviews.length);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => b.establishedYear - a.establishedYear);
        break;
    }

    return result;
  }, [restaurants, searchTerm, selectedCuisine, favoriteRestaurants, showOnlyFavorites, sortBy]);

  const handleAddReview = (restaurantId: number, review: Omit<Review, 'id' | 'date'>) => {
    setRestaurants(restaurants.map(restaurant => {
      if (restaurant.id === restaurantId) {
        const newReview: Review = {
          ...review,
          id: Math.max(0, ...restaurant.reviews.map(r => r.id)) + 1,
          date: new Date().toISOString().split('T')[0]
        };
        
        const newRating = (restaurant.rating * restaurant.reviews.length + review.rating) / (restaurant.reviews.length + 1);
        
        return {
          ...restaurant,
          rating: Number(newRating.toFixed(1)),
          reviews: [...restaurant.reviews, newReview]
        };
      }
      return restaurant;
    }));
  };

  const toggleFavorite = (restaurantId: number) => {
    setFavoriteRestaurants(prev => 
      prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <Utensils className="w-10 h-10" />
            <h1 className="text-5xl font-bold">
              Restaurant Reviews
            </h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Discover the finest dining experiences in town. Read reviews, share your experiences, and find your next favorite restaurant.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12 py-3 text-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CategoryFilter
              categories={cuisines}
              selectedCategory={selectedCuisine}
              onSelectCategory={setSelectedCuisine}
            />

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Newest First</option>
              </select>

              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  showOnlyFavorites
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={setSelectedRestaurant}
              isFavorite={favoriteRestaurants.includes(restaurant.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
          </div>
        )}

        {selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
            onAddReview={handleAddReview}
            onToggleFavorite={toggleFavorite}
            isFavorite={favoriteRestaurants.includes(selectedRestaurant.id)}
          />
        )}
      </main>
    </div>
  );
}

export default App;