import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Clock, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const Index = () => {
  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Free Delivery",
      description: "Free delivery on all orders over $50"
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Fresh Products",
      description: "Locally sourced and organic produce"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick Delivery",
      description: "Same-day delivery available"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Secure Payment",
      description: "Multiple secure payment options"
    }
  ];

  // Display only the first 4 categories
  const featuredCategories = categories.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="animate-fade-in"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border transition-all-300 hover:shadow-md">
                    <div className="p-3 bg-primary/10 rounded-full text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our wide selection of categories to find exactly what you're looking for.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category, index) => (
                <div 
                  key={category.id}
                  className="animate-fade-in"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <Link 
                    to={`/products`}
                    onClick={() => sessionStorage.setItem('selectedCategory', category.name)}
                    className="block h-full"
                  >
                    <div className="group relative rounded-xl overflow-hidden aspect-[4/3] card-hover">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full transition-transform-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                        <h3 className="font-semibold text-xl mb-1">{category.name}</h3>
                        <p className="text-white/80 text-sm mb-3">{category.productCount} products</p>
                        <div className="bg-white/20 backdrop-blur-sm border border-white/10 rounded-full py-1 px-4 text-sm inline-flex items-center justify-center">
                          Shop Now
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/categories">
                <Button variant="outline" className="rounded-full px-8">View All Categories</Button>
              </Link>
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="animate-slide-in-from-left">
                <div className="max-w-lg md:pr-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Download Our Mobile App</h2>
                  <p className="mb-6">
                    Get exclusive offers, easy ordering, and real-time delivery tracking with our mobile app. Available for iOS and Android.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="secondary" 
                      className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M17.5,2 C17.5,2 17.5,2 17.5,2 C14.8,2 13.1,3.3 12,4.5 C10.9,3.3 9.2,2 6.5,2 C6.5,2 6.5,2 6.5,2 C3.5,2 1,4.5 1,7.5 C1,10.5 2.6,12.9 4.1,14.8 L4.1,14.9 C7,18.8 12,22 12,22 C12,22 17,18.8 19.9,14.9 L19.9,14.8 C21.4,12.9 23,10.4 23,7.5 C23,4.5 20.5,2 17.5,2 Z"></path>
                      </svg>
                      App Store
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                        <path d="M3.1,15.4 L3.1,8.6 C3.1,8.1 3.5,7.6 4,7.5 L12.9,12.3 C13,12.4 13,12.5 13,12.6 C13,12.7 13,12.8 12.9,12.9 L4,17.6 C3.5,17.4 3.1,17 3.1,16.4 L3.1,15.4 Z"></path>
                        <path d="M15.6,13.8 L17.9,12.6 L20.4,14 C20.8,14.2 21,14.6 21,15 C21,15.4 20.8,15.8 20.4,16 L17.9,17.4 L15.6,16.2 L17.9,15 L15.6,13.8 Z"></path>
                        <path d="M17.9,8.6 L15.6,7.4 L17.9,6.2 L20.4,7.6 C20.8,7.8 21,8.2 21,8.6 C21,9 20.8,9.4 20.4,9.6 L17.9,11 L15.6,9.8 L17.9,8.6 Z"></path>
                        <path d="M4,6.4 L12.9,11.1 C13,11.2 13,11.3 13,11.4 C13,11.5 13,11.6 12.9,11.7 L4,16.4 L4,16.4 C3.5,16.2 3.1,15.8 3.1,15.2 L3.1,8.4 C3.1,7.9 3.5,7.4 4,7.2 L4,6.4 Z"></path>
                      </svg>
                      Google Play
                    </Button>
                  </div>
                </div>
              </div>
              <div className="animate-slide-in-from-right">
                <div className="w-full max-w-xs">
                  <div className="relative">
                    <div className="aspect-[9/16] bg-white/10 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-xl">
                      <div className="absolute inset-0 p-2">
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1976" 
                            alt="Mobile App Screenshot" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </div>
                    </div>
                    {/* App badge floating element */}
                    <div className="absolute -bottom-4 -right-4 py-2 px-4 bg-card rounded-full shadow-lg border border-border animate-float">
                      <div className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                        <span className="text-sm font-medium">4.9 Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
