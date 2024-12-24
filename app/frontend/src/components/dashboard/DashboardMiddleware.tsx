"use client";
import { agentMode, businessMode } from "@/lib/dashboard/constants";
import useFetchProfile from "@/services/api/marketplace/hooks/profile/useFetchProfile";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import { useEffect } from "react";



function DashboardMiddleware() {
  const {data: user} = useFetchProfile();
  const {config, setConfig} = useDashboardConfigStore()


  useEffect(() => {
    if (config.mode) return;

    if (user.is_business) return setConfig("mode", businessMode());
    if (user.is_agent) return setConfig("mode", agentMode());
  }, [user])



  return null
}

export default DashboardMiddleware