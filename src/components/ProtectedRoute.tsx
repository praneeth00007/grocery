
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '@/utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // Force a check of the localStorage on every render
  const authenticated = isLoggedIn();
  
  useEffect(() => {
    console.log("ProtectedRoute - Auth check:", authenticated, "Current path:", location.pathname);
  }, [authenticated, location.pathname]);
  
  if (!authenticated) {
    console.log("ProtectedRoute - Not authenticated, redirecting to login from:", location.pathname);
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute - User is authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
