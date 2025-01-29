"use client";

import { useState } from "react";
import { Truck, Users, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const benefits = [
  {
    name: "For Drivers",
    description:
      "Find the best driving opportunities that match your qualifications. Access exclusive resources and discounts.",
    icon: Truck,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    name: "For Carriers",
    description:
      "Post jobs and find qualified drivers quickly. Manage applications and communicate with candidates all in one place.",
    icon: Users,
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
  },
  {
    name: "For Brokers",
    description:
      "Connect with reliable carriers and drivers. Streamline your operations with our advanced matching system.",
    icon: Clock,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
];

export function Benefits() {
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);

  return (
    <div className="px-4 py-24 sm:py-32 flex justify-center bg-gray-50">
      <div className="mx-auto w-full px-6 lg:px-8 border">
        <motion.div
          className="mx-auto max-w-2xl lg:text-center border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-base font-semibold leading-7 text-[#5852A1]">Why Choose Us</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to succeed in transportation
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            GoDriveBoard provides a comprehensive platform that serves all stakeholders in the transportation
            industry.
          </p>
        </motion.div>
        <motion.div
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.name}
                className="relative flex flex-col items-center text-center rounded-3xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredBenefit(benefit.name)}
                onHoverEnd={() => setHoveredBenefit(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-full h-full ${benefit.color} p-8`}>
                  <dt className="flex flex-col items-center gap-y-4 text-xl font-bold leading-7 text-white">
                    <div className="p-4 rounded-full bg-white bg-opacity-20">
                      <benefit.icon className="h-10 w-10 text-white" aria-hidden="true" />
                    </div>
                    {benefit.name}
                  </dt>
                </div>
                <AnimatePresence>
                  {hoveredBenefit === benefit.name && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black text-white p-6"
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <motion.p
                        className="text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {benefit.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
