"use client";
import Earnings from "@/components/dashboard/Earnings/Earnings";
import PageContainer from "@/components/dashboard/PageContainer";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import { useEffect } from "react";



function page() {
  const { config } = useDashboardConfigStore();
  useEffect(() => {}, [config])
  
  return (
    <PageContainer>
      <Earnings />
    </PageContainer>
  )
}

export default page