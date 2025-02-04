"use client";
import LinksPage from "@/components/dashboard/LinksPage";
import { getLinks } from "@/services/dashboard/links"
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";


function page() {
  const { config: {mode} }  = useDashboardConfigStore();
  const moreLinks: any = getLinks(mode, "More")

  return (
    <LinksPage 
      links={moreLinks} 
    />
  )
}

export default page