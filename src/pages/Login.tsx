
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { login, isLoggedIn } from "@/utils/auth";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the redirect path from state, or default to products
  const from = location.state?.from?.pathname || "/products";
  
  console.log("Login page - Redirect path:", from);
  
  // If already logged in, redirect to the target page
  useEffect(() => {
    if (isLoggedIn()) {
      console.log("Already logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [from, navigate]);
  
  const handleLoginSuccess = (email: string, password: string) => {
    setIsLoading(true);
    
    // Attempt to log in
    const success = login(email, password);
    
    if (success) {
      toast.success("Login successful!");
      console.log("Login successful, redirecting to:", from);
      // Navigate to the page they tried to visit or products
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid email or password");
      console.log("Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AuthForm 
        type="login" 
        onSubmit={handleLoginSuccess}
        isLoading={isLoading}
      />
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Use these credentials to login:</p>
        <p>Email: admin@gmail.com</p>
        <p>Password: admin@4883</p>
      </div>
    </div>
  );
};

export default Login;
