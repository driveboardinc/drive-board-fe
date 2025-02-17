'use client';

import { BellSVG } from '@/assets/svg/Bell';
import { HelpSVG } from '@/assets/svg/HelpIcon';
import { MessagesSVG } from '@/assets/svg/Messages';
import { CarrierSidebar } from '@/components/carrier/sidebar/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
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
          <div className=" w-full h-full flex-1 flex">
            <div className="flex flex-col container mx-auto lg:px-4 py-6 w-full max-w-[1600px] h-full">
              <div className="flex w-full items-center justify-between mb-6">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Job List</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

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
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
