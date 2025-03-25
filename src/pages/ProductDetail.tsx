
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ChevronLeft, Minus, Plus, Heart } from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = getProductById(Number(id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't seem to exist.</p>
        <Link to="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    // Adding multiple items at once
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        unit: product.unit
      });
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  // Fix broken image URLs
  const productImage = product.image.includes('unsplash') ? 
    product.image : 
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800";

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link to="/products" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors">
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="aspect-square relative">
            <img 
              src={productImage} 
              alt={product.name} 
              className="object-cover w-full h-full" 
              loading="lazy"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                {product.badge}
              </span>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          
          <div className="text-2xl font-bold mb-4">₹{product.price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span></div>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="p-4 bg-muted/50 rounded-lg mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              {product.stock > 0 && (
                <span className="text-muted-foreground">({product.stock} available)</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center h-10 rounded-md border border-input bg-background">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-full rounded-r-none"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <div className="h-full px-4 flex items-center justify-center min-w-[3rem]">
                {quantity}
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-full rounded-l-none"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            
            <Button 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium mb-1">Category</p>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="font-medium mb-1">Type</p>
              <p className="text-muted-foreground">{product.badge || "Standard"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
