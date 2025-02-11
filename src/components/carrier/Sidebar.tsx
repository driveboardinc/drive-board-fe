import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import companyLogo from '@/assets/images/logo.png';
import {
  Home,
  Archive,
  CheckCircle,
  Briefcase,
  LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
  { title: 'All Jobs', href: '/carrier/job-list', icon: Briefcase },
  { title: 'Active Jobs', href: '/carrier/job-list?status=active', icon: Home },
  {
    title: 'Completed Jobs',
    href: '/carrier/job-list?status=completed',
    icon: CheckCircle,
  },
  {
    title: 'Archived Jobs',
    href: '/carrier/job-list?status=archived',
    icon: Archive,
  },
];

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
        <SidebarGroup>
          <SidebarGroupLabel>Jobs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
