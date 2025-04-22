"use client";

import type React from "react";
import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction, selectIsLoggingOut } from "@/store/slice/authSlice";
import { RootState } from "@/store/store";

const DriverDashboardHeader: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggingOut = useSelector(selectIsLoggingOut);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

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
              <Link href="#" className="text-sm text-gray-600 hover:text-[#6B5ECD] transition-colors">
                Driver Resource
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-gray-600 hover:text-[#6B5ECD] transition-colors">
                Sponsored Companies
              </Link>
            </li>
            <li>
              <Link
                href="/driver/load-board"
                className="text-sm text-gray-600 hover:text-[#6B5ECD] transition-colors"
              >
                Load Board
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/driver/conversation" className="relative text-gray-600 hover:text-[#6B5ECD]">
          <MessageSquare className="h-5 w-5" />
          {/* <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span> */}
        </Link>
        <Link href="/driver/notification" className="relative text-gray-600 hover:text-[#6B5ECD]">
          <Bell className="h-5 w-5" />
          {/* <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            5
          </span> */}
        </Link>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-[#6B5ECD]">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              {user?.username || "My Account"}
              {user?.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/driver/profile-settings" className="w-full">
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/help-center" className="w-full">
                Help Center
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={handleLogout} disabled={isLoggingOut}>
                Logout
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DriverDashboardHeader;
