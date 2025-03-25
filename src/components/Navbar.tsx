import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all-300 w-full',
        isScrolled ? 
          'py-2 bg-white/80 dark:bg-grocery-950/80 backdrop-blur-lg shadow-sm' : 
          'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="sr-only">Fresh Market</span>
          <div className="bg-primary/90 text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span className="font-semibold text-xl">Fresh Market</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            {cartItemCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full" 
                variant="destructive"
              >
                {cartItemCount}
              </Badge>
            )}
          </Link>
          <Link to="/login">
            <Button variant="outline" className="rounded-full">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="rounded-full">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartItemCount > 0 && (
              <Badge 
                className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full" 
                variant="destructive"
              >
                {cartItemCount}
              </Badge>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-x-0 bg-white/90 dark:bg-grocery-950/90 backdrop-blur-lg transition-all duration-300 ease-in-out z-40",
          mobileMenuOpen ? "top-[56px] opacity-100" : "top-[-100%] opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-base font-medium transition-colors px-4 py-2 rounded-md',
                  location.pathname === link.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-primary/5 text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </div>
            <div className="flex gap-3 mt-2">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full rounded-full">Login</Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full rounded-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
