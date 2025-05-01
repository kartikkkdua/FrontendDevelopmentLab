import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Taj Palace",
    establishedYear: 2008,
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800",
    rating: 4.8,
    cuisine: "Indian",
    priceRange: "$$$",
    address: "42 Spice Lane, Cultural District",
    openingHours: "Tue-Sun: 12:00-23:00",
    description: "Experience authentic North Indian cuisine with our master chefs from Punjab. Known for our tandoori specialties and rich curries made with hand-ground spices.",
    reviews: [
      {
        id: 1,
        userName: "SpiceLover",
        rating: 5,
        comment: "The butter chicken and naan bread were absolutely divine! True Indian flavors.",
        date: "2024-02-15",
        visitDate: "2024-02-14"
      },
      {
        id: 2,
        userName: "CurryKing",
        rating: 4.5,
        comment: "Exceptional biryani and great ambiance. The service is impeccable.",
        date: "2024-02-10",
        visitDate: "2024-02-08"
      }
    ]
  },
  {
    id: 2,
    name: "Dosa House",
    establishedYear: 2015,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800",
    rating: 4.9,
    cuisine: "South Indian",
    priceRange: "$$",
    address: "28 Kerala Street, Downtown",
    openingHours: "Mon-Sun: 8:00-22:00",
    description: "Authentic South Indian cuisine specializing in dosas, idlis, and uttapams. Our recipes come straight from the streets of Chennai.",
    reviews: [
      {
        id: 3,
        userName: "DosaFanatic",
        rating: 5,
        comment: "Best masala dosa in town! The coconut chutney is heavenly.",
        date: "2024-01-20",
        visitDate: "2024-01-19"
      }
    ]
  },
  {
    id: 3,
    name: "Global Fusion",
    establishedYear: 2019,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800",
    rating: 4.7,
    cuisine: "Fusion",
    priceRange: "$$$",
    address: "15 International Ave, Metropolis",
    openingHours: "Wed-Mon: 17:00-23:30",
    description: "A unique dining experience blending global flavors. Try our Korean-Mexican tacos or Indian-Italian fusion pasta.",
    reviews: [
      {
        id: 4,
        userName: "FusionFoodie",
        rating: 4.8,
        comment: "The tandoori pizza is innovative and delicious! Love the creative menu.",
        date: "2024-02-01",
        visitDate: "2024-01-30"
      }
    ]
  },
  {
    id: 4,
    name: "Spice Garden",
    establishedYear: 2012,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800",
    rating: 4.6,
    cuisine: "Indian",
    priceRange: "$$",
    address: "78 Curry Lane, Foodie District",
    openingHours: "Mon-Sun: 11:30-22:30",
    description: "Family-owned restaurant serving authentic Indian street food and thalis. Famous for our chaat corner and regional specialties.",
    reviews: [
      {
        id: 5,
        userName: "ChatLover",
        rating: 4.7,
        comment: "The pani puri and bhel puri transport you straight to Mumbai's streets!",
        date: "2024-02-05",
        visitDate: "2024-02-04"
      }
    ]
  },
  {
    id: 5,
    name: "World Kitchen",
    establishedYear: 2020,
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800",
    rating: 4.5,
    cuisine: "International",
    priceRange: "$$$",
    address: "100 Global Plaza, City Center",
    openingHours: "Tue-Sun: 12:00-23:00",
    description: "A culinary journey around the world featuring signature dishes from different continents. Monthly rotating menu with guest chefs.",
    reviews: [
      {
        id: 6,
        userName: "WorldTraveler",
        rating: 4.6,
        comment: "Amazing concept! Loved the Japanese-Peruvian fusion dishes this month.",
        date: "2024-02-12",
        visitDate: "2024-02-11"
      }
    ]
  }
];