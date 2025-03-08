"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { resources } from "@/constants/resources";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  links?: { label: string; url: string }[];
}

const ResourceCard = ({ title, description, icon, action, links }: ResourceCardProps) => (
  <Card className="p-6 h-full shadow-none border-none flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-200">
    <div className="text-primary w-12 h-12 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
    {links ? (
      <div className="w-full space-y-2">
        {links.map((link, index) => (
          <Button key={index} variant="secondary" className="w-full text-sm">
            {link.label}
          </Button>
        ))}
      </div>
    ) : (
      <Button className="w-full">
        {action}
        <Download className="w-4 h-4 ml-2" />
      </Button>
    )}
  </Card>
);

export default function DriverResources() {
  return (
    <div className="px-[260px] min-h-screen bg-gradient-to-br from-blue-50 to-indigo-5">
      <div>
        <h1 className="text-[100px] text-custom-purple font-bold">Driver Resources</h1>
      </div>
      <div>
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Everything you need to succeed in your trucking career
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>

      <div className="flex flex-col items-center py-20">
        <h2 className="text-2xl font-bold mb-4">Need Additional Support?</h2>
        <p className="text-muted-foreground mb-6">
          Our team is here to help you find the right resources for your success
        </p>
        <Button variant="outline" size="lg">
          Contact Support
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
