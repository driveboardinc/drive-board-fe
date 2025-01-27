import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Search, MessageSquare, Wallet, Map, Shield } from "lucide-react";

const features = [
  {
    name: "Real-time Notifications",
    description: "Get instant alerts for new jobs, loads, and messages that match your preferences.",
    icon: Bell,
  },
  {
    name: "Advanced Search",
    description: "Find exactly what you're looking for with our powerful search and filtering system.",
    icon: Search,
  },
  {
    name: "Secure Messaging",
    description: "Communicate directly with carriers, drivers, and brokers through our platform.",
    icon: MessageSquare,
  },
  {
    name: "Payment Integration",
    description: "Handle all your transactions securely within the platform.",
    icon: Wallet,
  },
  {
    name: "Route Planning",
    description: "Optimize your routes and find the most efficient paths for your deliveries.",
    icon: Map,
  },
  {
    name: "Verified Users",
    description: "All users are verified to ensure a safe and trustworthy environment.",
    icon: Shield,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Platform Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful tools for the modern transportation industry
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform is packed with features designed to make your work easier and more efficient.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.name}>
                <CardHeader>
                  <feature.icon className="h-6 w-6 text-blue-600" />
                  <CardTitle className="mt-4">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
