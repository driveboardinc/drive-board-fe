"use client";

import { CallToAction } from "@/components/cta";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Users, Building2, Shield, Zap, Gift } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AboutUsPage() {
  return (
    <div className="px-[260px] py-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <section>
        <h1 className="text-[100px] text-custom-purple font-bold">About Us</h1>
      </section>
      <section className="mb-20">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Driving the Future of Transportation
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Drive Board is a Houston-based SaaS company founded by transportation professionals for
          transportation professionals. We&apos;re revolutionizing the way drivers connect with delivery
          opportunities.
        </motion.p>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeatureCard
            icon={<Truck className="w-12 h-12 text-blue-500" />}
            title="Tech-Driven Job Board"
            description="Connecting vetted drivers to great delivery opportunities for Owner Operators, Contractors, and Company Drivers."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-green-500" />}
            title="For Carriers"
            description="Our proprietary software vets and pre-screens drivers and Owner Operators, saving your team time and presenting the best candidates."
          />
          <FeatureCard
            icon={<Building2 className="w-12 h-12 text-purple-500" />}
            title="For Brokers"
            description="Efficient mass job posting and recommendations for carriers with multiple trucks and reliable contractors."
          />
        </motion.div>
      </section>

      <section className="mb-20">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Marketplace
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Drive Board is more than just a job board. We&apos;re creating a comprehensive marketplace for the
          transportation industry.
        </motion.p>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-yellow-500" />}
            title="Load Connections"
            description="Connect drivers and companies for last-minute or scheduled and dedicated lanes."
          />
          <FeatureCard
            icon={<Gift className="w-12 h-12 text-red-500" />}
            title="Exclusive Discounts"
            description="Partnerships with insurance, rental, and equipment companies for driver discounts."
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-indigo-500" />}
            title="Lifetime Partnership"
            description="Join Drive Board for a lifetime partner in your transportation industry success."
          />
        </motion.div>
      </section>

      <section className="mb-20">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Who We Serve
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Drive Board caters to a wide range of professionals in the transportation industry:
        </motion.p>
        <motion.ul
          className="grid md:grid-cols-2 gap-4 text-lg text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            "Delivery Couriers",
            "Cargo Van Contractors",
            "Box Truck Owner/Operators",
            "Semi Truck Owner Operators",
            "Job Seekers",
          ].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center bg-white rounded-lg shadow-sm p-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-6 h-6 text-blue-500 mr-2" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </section>
      <CallToAction />
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex  gap-2 pb-2">
        {icon}
        <h3 className="flex items-end text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
