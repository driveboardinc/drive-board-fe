import {
  UserCheck,
  Shield,
  ShoppingBag,
  Users,
  Layers,
  FileText,
  List,
  Award,
  HelpCircle,
  Bot,
  MailWarning,
  MessageCircleWarning,
  Truck,
  MessagesSquare,
} from "lucide-react";

export function ServicesSection() {
  const services = [
    { icon: MailWarning, name: "Email Alerts" },
    { icon: MessageCircleWarning, name: "Sms Alerts" },
    { icon: MessagesSquare, name: "Messaging" },
    { icon: UserCheck, name: "Recruiting Tools" },
    { icon: Shield, name: "Insurance Discounts" },
    { icon: ShoppingBag, name: "Rental Discounts" },
    { icon: Users, name: "Driver Resources" },
    { icon: Truck, name: "Load Board" },
    { icon: Layers, name: "Dedicated Lanes" },
    { icon: FileText, name: "Job Posting" },
    { icon: Bot, name: "AI Pre-Screening" },
    { icon: List, name: "Mass Job Posting" },
    { icon: Award, name: "Internal Scoring" },
    { icon: HelpCircle, name: "Large Vetted Driver Database" },
    { icon: HelpCircle, name: "Customer Support" },
  ];

  return (
    <div className="py-16 px-4 md:px-80 lg:px-80 bg-gradient-to-br from-white to-purple-50 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Explore Our Key Features
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group py-8 ">
              <div className="w-16 h-16 rounded-full  flex items-center justify-center mb-4 bg-white shadow-lg group-hover:shadow-xl  transition-shadow">
                <service.icon
                  className={`w-8 h-8  ${index % 2 === 0 ? "text-custom-purple" : "text-custom-purple"} `}
                />
              </div>
              <p className="text-gray-700 font-medium ">{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
