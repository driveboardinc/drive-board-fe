import { GraduationCap, Truck, ShieldCheck, Building, Calculator, Wrench } from "lucide-react";

export const resources = [
  {
    title: "Build Your Driving Business",
    description: "Essential tools and guidance for starting and growing your trucking business",
    icon: <Building className="w-full h-full" />,
    action: "Learn More",
  },
  {
    title: "Automotive & Truck Supplies",
    description: "Access quality parts and supplies from trusted providers",
    icon: <Truck className="w-full h-full" />,
    links: [
      { label: "Goodyear", url: "/suppliers/goodyear" },
      { label: "Discount Tires", url: "/suppliers/discount-tires" },
      { label: "Find It Parts", url: "/suppliers/find-it-parts" },
    ],
  },
  {
    title: "Insurance Resources",
    description: "Find the right coverage to protect your business and career",
    icon: <ShieldCheck className="w-full h-full" />,
    action: "Compare Plans",
  },
  {
    title: "Maintenance Tools",
    description: "Keep your truck in top condition with our maintenance resources",
    icon: <Wrench className="w-full h-full" />,
    action: "View Tools",
  },
  {
    title: "Career Development",
    description: "Access CDL training resources, certification guides, and advancement opportunities",
    icon: <GraduationCap className="w-full h-full" />,
    action: "Explore Resources",
  },
  {
    title: "Cost Calculator",
    description: "Plan your expenses and estimate earnings with our specialized calculators",
    icon: <Calculator className="w-full h-full" />,
    action: "Calculate Now",
  },
];
