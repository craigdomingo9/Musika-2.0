"use client";
import LinksPage from "@/components/dashboard/LinksPage";
import { getLinks } from "@/services/dashboard/links"
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";


function page() {
  const { config: {mode} }  = useDashboardConfigStore();
  const workspaceLinks: any = getLinks(mode, "Workspace")

  return (
    <LinksPage 
      links={workspaceLinks} 
    />
  )
}

export default page