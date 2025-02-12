"use client";

import { useState, useRef, useEffect } from "react";
import { Truck, Users, Clock, ChevronDown } from "lucide-react";
import gsap from "gsap";

const benefits = [
  {
    id: "drivers",
    name: "For Drivers",
    description:
      "Find the best driving opportunities that match your qualifications. Access exclusive resources and discounts.",
    icon: Truck,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: "carriers",
    name: "For Carriers",
    description:
      "Post jobs and find qualified drivers quickly. Manage applications and communicate with candidates all in one place.",
    icon: Users,
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
  },
  {
    id: "brokers",
    name: "For Brokers",
    description:
      "Connect with reliable carriers and drivers. Streamline your operations with our advanced matching system.",
    icon: Clock,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
];

export function Benefits() {
  const [expandedBenefitId, setExpandedBenefitId] = useState<string | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header on mount
    gsap.from(headerRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    });

    // Animate benefits cards
    gsap.from(".benefit-card", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      delay: 0.4,
    });
  }, []);

  const toggleExpand = (id: string) => {
    const contentElement = contentRefs.current[id];
    if (!contentElement) return;

    if (expandedBenefitId === id) {
      // Collapse animation
      gsap.to(contentElement, {
        height: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => setExpandedBenefitId(null),
      });
    } else {
      // If there's an expanded benefit, collapse it first
      if (expandedBenefitId && contentRefs.current[expandedBenefitId]) {
        gsap.to(contentRefs.current[expandedBenefitId], {
          height: 0,
          opacity: 5,
          duration: 1,
          ease: "power2.inOut",
        });
      }

      // Set height to auto temporarily to get the natural height
      gsap.set(contentElement, { height: "auto", opacity: 1 });
      const naturalHeight = contentElement.offsetHeight;

      // Set back to 0 and animate to natural height
      gsap.fromTo(
        contentElement,
        { height: 0, opacity: 0 },
        {
          height: naturalHeight,
          opacity: 5,
          duration: 0.7,
          ease: "power2.out",
          onStart: () => setExpandedBenefitId(id),
        }
      );
    }
  };

  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-40">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center">
          <h2 className="text-base font-semibold text-[#5852A1]">Why Choose Us</h2>
          <h3 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to succeed in transportation
          </h3>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            GoDriveBoard provides a comprehensive platform that serves all stakeholders in the transportation
            industry.
          </p>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="relative benefit-card">
                <div className={`rounded-2xl shadow-lg ${benefit.color}`}>
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center text-xl font-bold">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 mr-4">
                          <benefit.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        {benefit.name}
                      </dt>
                      <button
                        onClick={() => toggleExpand(benefit.id)}
                        className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      >
                        <ChevronDown
                          className={`h-6 w-6 transition-transform duration-300 ${
                            expandedBenefitId === benefit.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => (contentRefs.current[benefit.id] = el)}
                  className="absolute left-0 right-0 w-full overflow-hidden"
                  style={{
                    top: "calc(100% - 16px)",
                    zIndex: 10,
                    height: 0,
                    opacity: 0,
                  }}
                >
                  <div className={`${benefit.color} rounded-b-2xl shadow-lg`}>
                    <div className="p-6 text-white">
                      <p className="text-lg">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
