import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import companyLogo from '@/assets/images/logo.png';
import { Menu } from './Menu';

export function CarrierSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Image
          src={companyLogo}
          alt="Company logo"
          width={800}
          height={600}
          className="object-contain h-16 transition-transform"
          priority
        />
      </SidebarHeader>
      <SidebarContent>
        <Menu isOpen={true} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
