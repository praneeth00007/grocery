
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Motion } from "@/components/ui/motion";
import { useEffect, useRef, useState } from "react";

const FeaturedProducts = () => {
  const products = getFeaturedProducts();
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/50">
      {isVisible && (
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our handpicked selection of premium quality groceries that our customers love.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <Motion 
                key={product.id}
                animation="fade-in"
                delay={index * 100}
                className="card-hover"
              >
                <Card className="overflow-hidden border-none bg-card rounded-xl shadow-sm h-full">
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
                    <p className="text-sm text-muted-foreground mb-4">{product.unit}</p>
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
              </Motion>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="animate-fade-in" style={{animationDelay: '400ms'}}>
              <Link to="/products">
                <Button variant="outline" className="rounded-full px-8">View All Products</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
