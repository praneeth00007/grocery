
// Fixed credentials
export const ADMIN_EMAIL = 'admin@gmail.com';
export const ADMIN_PASSWORD = 'admin@4883';

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  try {
    // Get the value and convert to boolean explicitly
    const value = localStorage.getItem('isLoggedIn');
    const status = value === 'true';
    console.log("Auth check: localStorage value =", value, "isLoggedIn =", status);
    return status;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

// Login function
export const login = (email: string, password: string): boolean => {
  console.log("Login attempt with:", email);
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    console.log("Login successful, setting isLoggedIn to true");
    localStorage.setItem('isLoggedIn', 'true');
    return true;
  }
  console.log("Login failed, credentials don't match");
  return false;
};

// Logout function
export const logout = (): void => {
  console.log("Logging out, removing isLoggedIn from localStorage");
  localStorage.removeItem('isLoggedIn');
  // Force a refresh of the page
  window.location.href = '/';
};
