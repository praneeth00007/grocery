
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Package, ShieldCheck, Truck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const missionPoints = [
    {
      icon: <Leaf className="h-6 w-6 text-primary" />,
      title: "Sustainability",
      description: "We are committed to sustainable practices across our entire supply chain."
    },
    {
      icon: <Package className="h-6 w-6 text-primary" />,
      title: "Quality",
      description: "We ensure the highest quality products sourced from trusted suppliers."
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Convenience",
      description: "Fast and reliable delivery to make your shopping experience seamless."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Trust",
      description: "Building customer trust through transparent practices and reliable service."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Our Store</h1>
          <p className="text-muted-foreground text-lg">
            Fresh, affordable groceries delivered to your doorstep
          </p>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>How we started and where we're going</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Founded in 2020, our grocery store was established with a simple mission: to provide fresh, high-quality groceries at affordable prices while making shopping convenient for busy families.
            </p>
            <p>
              What started as a small local shop has grown into a trusted online platform serving thousands of customers. We've built our reputation on reliability, quality products, and exceptional customer service.
            </p>
            <p>
              Today, we continue to innovate and expand our services, always keeping our customers' needs at the center of everything we do.
            </p>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPoints.map((point, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{point.icon}</div>
                    <div>
                      <h3 className="font-medium text-lg mb-2">{point.title}</h3>
                      <p className="text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>The people behind our success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-8">
              <div className="bg-muted rounded-full p-6 mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <p className="text-center max-w-2xl">
                Our dedicated team consists of experienced professionals passionate about food, technology, and customer service. From our product specialists who carefully select the finest groceries, to our delivery experts ensuring your order arrives fresh and on time, every team member plays a crucial role in providing you with the best shopping experience.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Get in touch with us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Address:</strong> 123 Grocery Lane, Fresh City, FC 12345</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> support@grocerystore.com</p>
            <p><strong>Hours:</strong> Monday-Friday: 8am-8pm, Saturday-Sunday: 9am-6pm</p>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
