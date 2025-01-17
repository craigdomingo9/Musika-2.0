"use client";
import AgentProfile from "@/components/dashboard/Profile/AgentProfile";
import BusinessProfile from "@/components/dashboard/Profile/BusinessProfile";
import PageContainer from "@/components/marketplace/PageContainer";
import { agentMode, businessMode } from "@/lib/dashboard/constants";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig"



function page() {

  const { config } = useDashboardConfigStore();

  
  return (
    <PageContainer>
      {config.mode == agentMode() && <AgentProfile />}
      {config.mode == businessMode() && <BusinessProfile />}
    </PageContainer>
  )
}

export default page