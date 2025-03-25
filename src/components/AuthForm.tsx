
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { login, ADMIN_EMAIL } from '@/utils/auth';
import { toast } from 'sonner';

type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
};

const AuthForm = ({ type, onSubmit, isLoading = false }: AuthFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const isLogin = type === 'login';
  const title = isLogin ? 'Welcome Back' : 'Create an Account';
  const description = isLogin 
    ? 'Enter your credentials to access your account' 
    : 'Fill in the information to get started';
  const buttonText = isLogin ? 'Sign In' : 'Sign Up';
  const footerText = isLogin 
    ? "Don't have an account?" 
    : 'Already have an account?';
  const footerLinkText = isLogin ? 'Sign up' : 'Sign in';
  const footerLinkPath = isLogin ? '/signup' : '/login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      // Use the provided onSubmit handler if available
      onSubmit(email, password);
    } else if (isLogin) {
      // Use the default login logic if no onSubmit is provided
      if (login(email, password)) {
        toast.success('Logged in successfully!');
        navigate('/products');
      } else {
        toast.error('Invalid credentials. Please use admin@gmail.com and admin@4883');
      }
    } else {
      // For signup, always redirect to login
      toast.success('Account created! Please login with admin credentials.');
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-4 md:p-8">
        <Link to="/" className="absolute top-8 left-8">
          <Button variant="ghost" className="gap-2 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Home
          </Button>
        </Link>
        
        <div className="w-full max-w-md animate-fade-in">
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-2">
              <div className="mx-auto mb-2">
                <div className="bg-primary/90 text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
              <CardDescription className="text-center">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                {isLogin ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-normal">Remember me</Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>
                    </Label>
                  </div>
                )}
                <Button type="submit" className="w-full">{buttonText}</Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-2">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-muted-foreground w-full">
                {footerText}{' '}
                <Link to={footerLinkPath} className="text-primary font-medium hover:underline">
                  {footerLinkText}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-center bg-cover"
        style={{ 
          backgroundImage: isLogin 
            ? "url('https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1974')" 
            : "url('https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1974')"
        }}
      >
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary/60 to-transparent p-12">
          <div className="max-w-md">
            <div className="animate-slide-in-from-right">
              <h2 className="text-white text-4xl font-bold mb-6">
                {isLogin ? 'Welcome back to Fresh Market' : 'Join Fresh Market Today'}
              </h2>
            </div>
            <div className="animate-slide-in-from-right" style={{animationDelay: '100ms'}}>
              <p className="text-white/90 text-lg mb-8">
                {isLogin 
                  ? "We're delighted to have you back. Access your account to continue shopping for fresh, high-quality groceries."
                  : "Create an account to enjoy premium grocery shopping with fast delivery and exclusive deals on fresh produce."}
              </p>
            </div>
            <div className="animate-slide-in-from-right" style={{animationDelay: '200ms'}}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-white italic">
                  "Fresh Market has transformed how I shop for groceries. Their produce is always fresh and the delivery is consistently on time."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                  <div>
                    <p className="text-white font-medium">Sarah Johnson</p>
                    <p className="text-white/80 text-sm">Loyal Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
