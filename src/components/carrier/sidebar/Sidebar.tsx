import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import Image from "next/image";
import companyLogo from "@/assets/images/logo.png";
import { Menu } from "./Menu";

export function CarrierSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="">
        <Image
          src={companyLogo}
          alt="Company logo"
          width={800}
          height={600}
          className="object-contain h-16 transition-transform"
          priority
        />
      </SidebarHeader>
      <SidebarContent className="mt-0 flex flex-col justify-between">
        <Menu isOpen={true} />
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/thumbnail.webp" // Replace with your avatar image path
                alt="User avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
