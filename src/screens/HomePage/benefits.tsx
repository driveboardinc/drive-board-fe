import { Truck, Users, Clock, Shield } from "lucide-react";

const benefits = [
  {
    name: "For Carriers",
    description:
      "Post jobs and find qualified drivers quickly. Manage applications and communicate with candidates all in one place.",
    icon: Users,
  },
  {
    name: "For Drivers",
    description:
      "Find the best driving opportunities that match your qualifications. Access exclusive resources and discounts.",
    icon: Truck,
  },
  {
    name: "For Brokers",
    description:
      "Connect with reliable carriers and drivers. Streamline your operations with our advanced matching system.",
    icon: Clock,
  },
  {
    name: "Secure Platform",
    description:
      "Your data is protected with enterprise-grade security. We verify all users to ensure trust and safety.",
    icon: Shield,
  },
];

export function Benefits() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed in transportation
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            GoDriveBoard provides a comprehensive platform that serves all stakeholders in the transportation
            industry.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <benefit.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {benefit.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
