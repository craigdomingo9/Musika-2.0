"use client"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig"
import { useEffect, useState } from "react"
import { agentMode, modes } from "@/lib/dashboard/constants"
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { correctImageUrl } from "@/services/utils"



export function ModeSwitcher({
  defaultMode
}: {
  defaultMode: string
}) {
  const { config, setConfig } = useDashboardConfigStore();
  const [selectedMode, setSelectedMode] = useState<any>(defaultMode);
  const { data: user } = useUserProfile();
  const [fullName, setFullName] = useState<string>();
  const [profilePicture, setProfilePicture] = useState<string>();
  
  useEffect(() => {
    if (!config.mode) return;

    setFullName(
      config.mode == agentMode() ? 
      user.agent_profile?.full_name : 
      user.business_profile?.profile.name
    );
    setProfilePicture(
      config.mode == agentMode() ? 
      correctImageUrl(user.agent_profile?.profile.profile_picture, window.location.href) :
      correctImageUrl(user.business_profile?.profile.logo, window.location.href)
    );

    setSelectedMode(config.mode);
  }, [config, user])


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="ring-0" asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-sidebar-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-10 aspect-square rounded-lg">
                <AvatarImage 
                  src={profilePicture} 
                  alt="@shadcn" 
                />
                <AvatarFallback>{fullName?.split(" ").map(str => str.charAt(0)).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{fullName}</span>
                <span className="">{selectedMode}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {modes.map((mode: any) => (
              <DropdownMenuItem
                key={mode}
                onSelect={() => {
                  setConfig("mode", mode);
                }}
              >
                {mode}{" "}
                {mode === selectedMode && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
