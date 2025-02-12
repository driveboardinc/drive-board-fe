'use client';

import { CarrierSidebar } from '@/components/carrier/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function CarrierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <CarrierSidebar />

        {/* Main Content */}
        <main className="flex-1 px-4 w-full ">
          <div className="lg:hidden">
            <SidebarTrigger />
          </div>
          <div className=" w-full h-full flex-1 flex">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
