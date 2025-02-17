import {
  // Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getCarrierMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/carrier/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Jobs',
      menus: [
        {
          href: '',
          label: 'Job Posts',
          icon: SquarePen,
          submenus: [
            {
              href: '/carrier/job-posts',
              label: 'All Posts',
            },
          ],
        },
        {
          href: '/carrier/job-posts',
          label: 'Categories',
          icon: Bookmark,
        },
      ],
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/carrier/users',
          label: 'Users',
          icon: Users,
        },
        {
          href: '/carrier/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ];
}
