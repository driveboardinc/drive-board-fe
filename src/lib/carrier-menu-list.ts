import {
  // Tag,
  Users,
  Settings,
  // Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Brain,
  Calendar,
  FileText,
} from "lucide-react";

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
    // {
    //   groupLabel: '',
    //   menus: [
    //     {
    //       href: '/carrier/dashboard',
    //       label: 'Dashboard',
    //       icon: LayoutGrid,
    //       submenus: [],
    //     },
    //   ],
    // },
    {
      groupLabel: "Jobs",
      menus: [
        {
          href: "/carrier/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/carrier/job-posts",
          label: "Job Posts",
          icon: SquarePen,
          // submenus: [
          //   {
          //     href: '/carrier/job-posts',
          //     label: 'All Posts',
          //   },
          // ],
        },
        {
          href: "/carrier/smart-sourcing",
          label: "Smart Sourcing",
          icon: Brain,
        },
        {
          href: "/carrier/interviews",
          label: "Interviews",
          icon: Calendar,
        },
        // {
        //   href: '/carrier/job-posts',
        //   label: 'Categories',
        //   icon: Bookmark,
        // },
        {
          href: "/carrier/candidates",
          label: "Candidates",
          icon: Users,
        },
        {
          href: "/carrier/other-details",
          label: "Other Details",
          icon: FileText,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/carrier/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/carrier/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
