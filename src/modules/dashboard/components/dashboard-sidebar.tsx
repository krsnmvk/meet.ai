'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardUserButton from './dashboard-user-button';

const firstSection = [
  { icon: VideoIcon, label: 'Meetings', href: '/meetings' },
  { icon: BotIcon, label: 'Agents', href: '/agents' },
];

const secondSection = [{ icon: StarIcon, label: 'Upgrade', href: '/upgrade' }];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" alt="Meet.AI" height={36} width={36} />
          <span className="text-2xl font-semibold text-white">Meet.AI</span>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <SidebarSeparator className="opacity-10 text-[#5d6b68]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map(({ href, icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'h-10 border border-transparent hover:border-[#5d6b68]/10 hover:bg-linear-to-r/oklch from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                      pathname === href &&
                        'bg-linear-to-r/oklch border-[#5d6b68]/10'
                    )}
                  >
                    <Link href={href}>
                      <Icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-2">
          <SidebarSeparator className="opacity-10 text-[#5d6b68]" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map(({ href, icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      'h-10 border border-transparent hover:border-[#5d6b68]/10 hover:bg-linear-to-r/oklch from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50',
                      pathname === href &&
                        'bg-linear-to-r/oklch border-[#5d6b68]/10'
                    )}
                  >
                    <Link href={href}>
                      <Icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
