
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Motion } from '@/components/ui/motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-10 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="flex-1 text-center md:text-left">
            <Motion animation="slide-in-from-left">
              <p className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                Fresh Grocery Delivery
              </p>
            </Motion>
            
            <Motion animation="slide-in-from-left" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span className="block">Fresh Groceries,</span>
                <span className="block text-primary">Delivered to You</span>
              </h1>
            </Motion>
            
            <Motion animation="slide-in-from-left" delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                Shop premium quality, locally-sourced groceries from the comfort of your home. Fast delivery, incredible service.
              </p>
            </Motion>
            
            <Motion animation="slide-in-from-left" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/products">
                  <Button size="lg" className="rounded-full px-8">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </Motion>
          </div>
          
          <Motion 
            animation="slide-in-from-right" 
            delay={300}
            className="flex-1 relative w-full max-w-xl"
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Main image with overlay */}
              <div className="aspect-[4/3] md:aspect-[16/9] w-full">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074" 
                  alt="Fresh vegetables and fruits" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-grocery-800/40 to-transparent"></div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 p-5 glass-morphism rounded-xl shadow-lg max-w-[180px] text-center transform rotate-2 animate-float">
                <div className="font-semibold mb-1">30min</div>
                <div className="text-xs text-muted-foreground">Fast Delivery</div>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
