'use client';

import { useRouter } from 'next/navigation';
import { BellSVG } from '@/assets/svg/Bell';
import { HelpSVG } from '@/assets/svg/HelpIcon';
import { MessagesSVG } from '@/assets/svg/Messages';
import { CarrierSidebar } from '@/components/carrier/sidebar/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Settings, LogOut } from 'lucide-react';
import { withCarrierAuth } from '@/components/auth/hocs/withCarrierAuth';
import { useDispatch } from 'react-redux';
import { logout, setLoggingOut } from '@/store/slice/authSlice';

function CarrierLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLoggingOut(true));
    dispatch(logout());
    router.push('/carrier/signin');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <CarrierSidebar />

        {/* Main Content */}
        <main className="flex-1 w-full h-screen overflow-hidden">
          <div className="w-full h-full flex flex-col">
            {/* Header section with sidebar trigger and actions */}
            <div className="flex w-full px-4 py-4 items-center justify-between shadow-sm">
              <div>
                <SidebarTrigger className="md:hidden" />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost">
                  <HelpSVG className="size-8" />
                </Button>
                <Button variant="ghost">
                  <MessagesSVG className="size-8" />
                </Button>
                <Button variant="ghost">
                  <BellSVG className="size-8" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Content container */}
            <div className="flex-1 container mx-auto pb-6 w-full max-w-[1600px]">
              {/* Scrollable content area */}
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default withCarrierAuth(CarrierLayout);
