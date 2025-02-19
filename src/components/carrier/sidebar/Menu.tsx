'use client';

import Link from 'next/link';
import { Ellipsis } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { getCarrierMenuList } from '@/lib/carrier-menu-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { CollapseMenuButton } from './CollapseMenuButton';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getCarrierMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <div className=" h-auto w-full">
        <ul className="flex flex-col h-auto items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-2' : '')} key={index}>
              <SidebarGroup>
                {groupLabel && (
                  <>
                    {isOpen || isOpen === undefined ? (
                      <SidebarGroupLabel className="px-2 pb-2">
                        {groupLabel}
                      </SidebarGroupLabel>
                    ) : (
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger className="w-full">
                            <div className="w-full flex justify-center items-center">
                              <Ellipsis className="h-5 w-5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{groupLabel}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menus.map(
                      ({ href, label, icon: Icon, active, submenus }, index) =>
                        !submenus || submenus.length === 0 ? (
                          <SidebarMenuItem key={index}>
                            <TooltipProvider disableHoverableContent>
                              <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                  <SidebarMenuButton
                                    variant={
                                      (active === undefined &&
                                        pathname.startsWith(href)) ||
                                      active
                                        ? 'secondary'
                                        : 'default'
                                    }
                                    className="w-full justify-start h-10 mb-1"
                                    asChild
                                  >
                                    <Link href={href}>
                                      <span
                                        className={cn(
                                          isOpen === false ? '' : 'mr-4'
                                        )}
                                      >
                                        <Icon size={18} />
                                      </span>
                                      <p
                                        className={cn(
                                          'max-w-[200px] truncate',
                                          isOpen === false
                                            ? '-translate-x-96 opacity-0'
                                            : 'translate-x-0 opacity-100'
                                        )}
                                      >
                                        {label}
                                      </p>
                                    </Link>
                                  </SidebarMenuButton>
                                </TooltipTrigger>
                                {isOpen === false && (
                                  <TooltipContent side="right">
                                    {label}
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </TooltipProvider>
                          </SidebarMenuItem>
                        ) : (
                          <SidebarMenuItem key={index}>
                            <CollapseMenuButton
                              icon={Icon}
                              label={label}
                              active={
                                active === undefined
                                  ? pathname.startsWith(href)
                                  : active
                              }
                              submenus={submenus}
                              isOpen={isOpen}
                            />
                          </SidebarMenuItem>
                        )
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </li>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
