"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Driver Resources", href: "/resources" },
  { name: "Live Board", href: "/board" },
  { name: "Contact Us", href: "/contact-us" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              <Image src="/uploads/driveboard_logo.png" alt="logo" width={100} height={100} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Login/Signup */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button className="w-full">Sign Up</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
