"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  title?: string;
  description?: string;
}

export function CountdownTimer({
  targetDate,
  title = "Coming Soon",
  description = "We're launching an exciting new feature!",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // If the target date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clean up on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  // Format numbers to always have two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="mb-8 perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="overflow-hidden border-none shadow-xl">
          {/* Background with animated gradient */}
          <div className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-6 md:p-8">
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: Math.random() * 8 + 2,
                    height: Math.random() * 8 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
              </div>

              <p className="text-lg text-purple-100 mb-8 max-w-2xl">{description}</p>

              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {[
                  { value: timeLeft.days, label: "Days", icon: Calendar },
                  { value: timeLeft.hours, label: "Hours", icon: Clock },
                  { value: timeLeft.minutes, label: "Minutes", icon: Clock },
                  { value: timeLeft.seconds, label: "Seconds", icon: Clock },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 md:p-4 text-center border border-white/20 shadow-lg relative overflow-hidden group">
                      {/* Animated highlight on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full" />

                      <div className="flex justify-center mb-1">
                        <item.icon className="h-5 w-5 text-purple-300" />
                      </div>

                      <motion.div
                        key={item.value}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-1"
                      >
                        {formatNumber(item.value)}
                      </motion.div>

                      <div className="text-xs md:text-sm text-purple-200">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Launch date */}
              <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-purple-200">
                <Star className="h-4 w-4" />
                <span>
                  Launch Date:{" "}
                  {targetDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
