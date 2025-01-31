"use client"

import * as React from "react"
import {
  Command,
  Map,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Users, Plane, Calendar, BarChart } from "lucide-react"
import { User } from "better-auth"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/Admin",
      icon: BarChart,
    },
    {
      title: "Users",
      url: "/Admin/users",
      icon: Users,
    },
    {
      title: "Trips",
      url: "/Admin/trips",
      icon: Plane,
    },
    {
      title: "Activities",
      url: "/Admin/activities",
      icon: Calendar,
    },
    {
      title: "Reservations",
      url: "/Admin/reservations",
      icon: Map,
    },

  ],
  navSecondary: [

  ],
  projects: [

  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">inMarrakesh</span>
                  <span className="truncate text-xs">Travel Agency</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
