import type React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, MessageSquare, User } from "lucide-react";
import Image from "next/image";

const DriverDashboardHeader: React.FC = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold">
            <Image src="/uploads/driveboard_logo.png" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-[#6B5ECD] transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/schedule" className="text-sm text-gray-600 hover:text-[#6B5ECD] transition-colors">
                Schedule
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-[#6B5ECD]">
          <MessageSquare className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-[#6B5ECD]">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            5
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#6B5ECD]">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Link href="/logout" className="w-full">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DriverDashboardHeader;
