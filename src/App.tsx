
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { isLoggedIn } from "./utils/auth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/Products";
import CategoriesPage from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";

// Create a new query client
const queryClient = new QueryClient();

// Log initial auth state
console.log("App initialization - User logged in:", isLoggedIn());

const App = () => {
  const authenticated = isLoggedIn();
  console.log("App render - Auth state:", authenticated);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route 
                path="/products" 
                element={
                  <ProtectedRoute>
                    <Layout><ProductsPage /></Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/products/:id" 
                element={
                  <ProtectedRoute>
                    <Layout><ProductDetail /></Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute>
                    <Layout><CategoriesPage /></Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Layout><CartPage /></Layout>
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
