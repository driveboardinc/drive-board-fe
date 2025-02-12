"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SigninVector } from "@/components/svg-vector/signin-vector";
import { Icons } from "@/components/icon";

export default function SigninPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("%cForm Data (For Backend API):", "color: blue; font-weight: bold;");
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="w-full flex items-center overflow-hidden bg-white shadow-xl">
      <div className="w-1/2 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
        <SigninVector className="w-full h-auto max-h-[80vh]" />
      </div>
      <div className="w-1/2 flex flex-col items-start p-8">
        <div className="flex items-center gap-2 py-2">
          <Icons.truck className="w-10 h-10 text-custom-purple" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        </div>

        <Progress value={100} className="mb-6" />
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Label htmlFor="email" className="text-lg font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                onChange={handleInputChange}
                value={formData.email}
                placeholder="johndoe@example.com"
                required
                className="w-full h-12 font-inter"
              />

              <Label htmlFor="password" className="text-lg font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                onChange={handleInputChange}
                value={formData.password}
                placeholder="Enter your password"
                required
                className="w-full h-12"
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-end pt-4">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
