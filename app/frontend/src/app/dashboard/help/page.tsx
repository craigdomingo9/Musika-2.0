"use client";
import LinksPage from "@/components/dashboard/LinksPage";
import { getLinks } from "@/services/dashboard/links"
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";


function page() {
  const { config: {mode} }  = useDashboardConfigStore();
  const helpLinks: any = getLinks(mode, "Help")

  return (
    <LinksPage 
      links={helpLinks} 
    />
  )
}

export default page