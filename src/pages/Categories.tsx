
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import { Motion } from "@/components/ui/motion";

const CategoriesPage = () => {
  const [visibleCategories, setVisibleCategories] = useState<typeof categories>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initially load just the first batch
    setVisibleCategories(categories.slice(0, 4));
    
    // Set up intersection observer to load more categories as the user scrolls
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Load all categories when the container is visible
        setVisibleCategories(categories);
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our wide selection of categories to find exactly what you're looking for.
        </p>
      </div>
      
      <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleCategories.map((category, index) => (
          <Motion
            key={category.id}
            animation="fade-in"
            delay={index * 100}
          >
            <Link 
              to={`/products`}
              onClick={() => sessionStorage.setItem('selectedCategory', category.name)}
              className="block h-full"
            >
              <Card className="overflow-hidden border-none shadow-sm h-full card-hover">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={category.image.includes('unsplash') ? category.image : "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800"}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.productCount} products</span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Shop Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Motion>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
