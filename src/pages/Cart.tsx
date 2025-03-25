
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const CartPage = () => {
  const { items, removeFromCart, addToCart, clearCart } = useCart();
  
  // Calculate totals
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shipping + tax;
  
  const handleIncreaseQuantity = (item: any) => {
    addToCart(item);
  };
  
  const handleDecreaseQuantity = (item: any) => {
    removeFromCart(item.id);
  };
  
  const handleRemoveItem = (itemId: number) => {
    // Remove all instances of this item
    items.forEach(item => {
      if (item.id === itemId) {
        removeFromCart(itemId);
      }
    });
    toast.success("Item removed from cart");
  };
  
  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
  };
  
  // Group cart items and count quantities - no longer needed as CartContext already maintains quantities
  const groupedItems = items;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
      
      {groupedItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {groupedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/4 aspect-square sm:aspect-auto">
                    <img 
                      src={item.image.includes('unsplash') ? item.image : "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800"} 
                      alt={item.name} 
                      className="object-cover w-full h-full"
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.unit}</p>
                      </div>
                      <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Delivery Information</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Free shipping on orders over ₹500. Standard delivery 3-5 working days.
              </p>
              <p className="text-sm text-muted-foreground">
                Express delivery options available at checkout.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
