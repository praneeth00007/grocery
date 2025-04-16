
export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  rating: number;
  image: string;
  badge?: string;
  category: string;
  description: string;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Avocados",
    price: 49.9,
    unit: "pack of 4",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=2070",
    badge: "Organic",
    category: "Fruits",
    description: "Fresh organic avocados. Rich in healthy fats and perfect for guacamole, salads, or spreading on toast.",
    stock: 25
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    price: 34.9,
    unit: "250g",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070",
    badge: "Local",
    category: "Fruits",
    description: "Sweet and juicy strawberries, locally grown and hand-picked at peak ripeness.",
    stock: 40
  },
  {
    id: 3,
    name: "Sourdough Bread",
    price: 59.9,
    unit: "loaf",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1597604391235-a7429b4b350c?q=80&w=1974",
    badge: "Artisan",
    category: "Bakery",
    description: "Artisanal sourdough bread made with a traditional 24-hour fermentation process for maximum flavor and digestibility.",
    stock: 15
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    price: 6.49,
    unit: "dozen",
    rating: 4.6,
    image: "https://plus.unsplash.com/premium_photo-1708715380817-31e20c61b18d?q=80&w=2069",
    badge: "Free Range",
    category: "Dairy & Eggs",
    description: "Ethically sourced free-range eggs from hens raised on open pastures with natural diets.",
    stock: 30
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 29.9,
    unit: "200g",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080",
    badge: "Organic",
    category: "Vegetables",
    description: "Fresh organic spinach, rich in iron and vitamins. Perfect for salads, smoothies, or cooking.",
    stock: 45
  },
  {
    id: 6,
    name: "Greek Yogurt",
    price: 42.9,
    unit: "500g",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974",
    category: "Dairy & Eggs",
    description: "Creamy Greek yogurt with high protein content and probiotic cultures. Great for breakfast or as a healthy snack.",
    stock: 20
  },
  {
    id: 7,
    name: "Wild Salmon Fillets",
    price: 129.9,
    unit: "2 fillets",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=1974",
    badge: "Wild Caught",
    category: "Seafood",
    description: "Premium wild-caught salmon fillets, rich in omega-3 fatty acids and full of flavor.",
    stock: 15
  },
  {
    id: 8,
    name: "Organic Honey",
    price: 84.9,
    unit: "340g",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=1980",
    badge: "Raw & Unfiltered",
    category: "Pantry",
    description: "Raw, unfiltered organic honey sourced from local beekeepers. Perfect natural sweetener with health benefits.",
    stock: 35
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Fruits",
    description: "Fresh seasonal fruits from local and international farms",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2070",
    productCount: 24
  },
  {
    id: 2,
    name: "Vegetables",
    description: "Organic and conventional vegetables for all your cooking needs",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2012",
    productCount: 32
  },
  {
    id: 3,
    name: "Bakery",
    description: "Freshly baked bread, pastries, and desserts",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2032",
    productCount: 18
  },
  {
    id: 4,
    name: "Dairy & Eggs",
    description: "Quality dairy products and farm-fresh eggs",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1974",
    productCount: 15
  },
  {
    id: 5,
    name: "Meat & Poultry",
    description: "Premium cuts of meat and poultry products",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070",
    productCount: 20
  },
  {
    id: 6,
    name: "Seafood",
    description: "Fresh and frozen seafood options",
    image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?q=80&w=2066",
    productCount: 12
  },
  {
    id: 7,
    name: "Pantry",
    description: "Essential pantry staples and gourmet ingredients",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1974",
    productCount: 45
  },
  {
    id: 8,
    name: "Beverages",
    description: "Refreshing drinks and specialty beverages",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=2070",
    productCount: 28
  }
];

// Helper functions to work with the data
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryName: string): Product[] => {
  return products.filter(product => product.category === categoryName);
};

export const getFeaturedProducts = (count: number = 4): Product[] => {
  // For now, just return the first 'count' products as featured
  return products.slice(0, count);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return categories.find(category => category.name === name);
};
