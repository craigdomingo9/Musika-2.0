"use client"

import * as React from "react"
import {
  Command,
  Home,
  MessageCircleQuestion,
  Search,
  Settings2,
  ShoppingCart
} from "lucide-react"

import { NavMain } from "@/components/sidebar/NavMain"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { SideBarBranding } from "./SideBarBranding"
import { NavUser } from "./navUser"

const data = {
  brand: 
    {
      name: "Musika Inc",
      logo: Command,
    },
  user: 
    {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  navMain: [
    {
      title: "Search",
      url: "#search",
      icon: Search,
    },
    {
      title: "Home",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Cart",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" variant="inset" {...props}>
      <SidebarHeader>
        <SideBarBranding brand={data.brand} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
      <SidebarSeparator />
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
