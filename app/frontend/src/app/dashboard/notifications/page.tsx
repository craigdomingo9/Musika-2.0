"use client";
import Notifications from "@/components/dashboard/Notifications/Notifications"
import PageContainer from "@/components/dashboard/PageContainer";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig"


function Page() {


  const { config } = useDashboardConfigStore()

  return (
    <PageContainer className="mx-2">
      <Notifications />
    </PageContainer>
  )
}

export default Page