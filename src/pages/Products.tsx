
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Star, Search } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [visibleProducts, setVisibleProducts] = useState<typeof allProducts>([]);
  
  const categories = Array.from(new Set(allProducts.map(product => product.category)));
  
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Load products in smaller batches for better performance
  useEffect(() => {
    // Initial batch of products
    setVisibleProducts(filteredProducts.slice(0, 9));
    
    // Only load the rest if there are more than 9 products
    if (filteredProducts.length > 9) {
      const timer = setTimeout(() => {
        setVisibleProducts(filteredProducts);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [filteredProducts]);
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: product.unit
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Check for saved category from session storage (when coming from Categories page)
  useEffect(() => {
    const savedCategory = sessionStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
      // Clear it after use
      sessionStorage.removeItem('selectedCategory');
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our wide selection of fresh, organic, and locally-sourced groceries.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Filters */}
        <div className="md:w-1/4">
          <div className="bg-card rounded-xl border p-6 sticky top-24">
            <h2 className="font-medium text-lg mb-4">Filters</h2>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === null ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="md:w-3/4">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden border-none bg-card rounded-xl shadow-sm h-full card-hover">
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="relative">
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={product.image.includes('unsplash') ? product.image : "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800"}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{product.unit}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">₹{product.price.toFixed(2)}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="rounded-full w-9 h-9 p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Add to cart</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
