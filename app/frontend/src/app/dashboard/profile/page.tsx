"use client";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig"



function page() {

  const { config } = useDashboardConfigStore();

  
  return (
    <div>
      hi {config.mode}
    </div>
  )
}

export default page