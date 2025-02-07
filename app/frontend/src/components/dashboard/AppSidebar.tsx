"use client"
import { Minus, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { getBreadCrumbs, getLinks } from "@/services/dashboard/links"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { ModeSwitcher } from "./ModeSwitcher"
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig"
import { useEffect, useState } from "react"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [links, setLinks] = useState<any>([]);
  const { config } = useDashboardConfigStore();
  const pathName = usePathname();

  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const crumb = getBreadCrumbs(pathName);


  useEffect(() => {
    if (!config.mode) return;

    setLinks(getLinks(config.mode))
  }, [config])


  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <ModeSwitcher defaultMode={config.mode} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((item: any, index: number) => (
              <Collapsible
              key={item.title}
              defaultOpen={true}
              className="group/collapsible"
            >
              <hr />
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <Link href={item.url}>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      {item.items && (
                        <>
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>
                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((item: any) => (
                        <SidebarMenuSubItem 
                          onClick={() => {
                            if (isMobile) toggleSidebar();
                          }} key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={(crumb.base?.title == item.title || crumb.children[0]?.title == item.title)}
                          >
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
