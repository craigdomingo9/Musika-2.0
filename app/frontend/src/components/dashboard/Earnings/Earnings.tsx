import { useEffect } from "react";

import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import DateFilter from "./DateFilter";
import EarningsTable from "./EarningsTable";
import { roundNumber } from "@/lib/utils";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import { agentMode, businessMode } from "@/lib/dashboard/constants";
import createEntityStore from "@/store/dashboard/EntityStore";
import SectionHeader from "../SectionHeader";
import useFetchAgent from "@/services/api/dashboard/hooks/agent/useFetchAgent";
import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness";



export const useOrderStore = createEntityStore<Order[]>([]);


function Earnings() {
  const { data: agent } = useFetchAgent();
  const { data: business} = useFetchBusiness();
  const { config: settings } = useDashboardConfigStore();
  const { entities, setEntities } = useOrderStore();
  const { data, isLoading, error} = useFetchOrders({
    status: "completed",
    agent: settings.mode == agentMode() ? agent.code : "",
    business: settings.mode == businessMode() ? business.code : "",
  }, `${agent.code}${business.code}`);


  const totalAmount = roundNumber(entities.reduce((acc, order) => acc + parseInt(settings.mode == businessMode() ? order.business_earning || "0" : order.agent_earning || "0"), 0),2)

  useEffect(() => {
    setEntities(data)
  }, [data])
  
  return (
    <>
      <div className="flex justify-between my-4 text-lg font-semibold w-full">
        <SectionHeader 
          HeaderTitle="Earnings"
          SubText="Assess your earnings."
          Action={<p className="text-[--baseColor]">+${totalAmount}</p>}
        />
      </div>
      <DateFilter data={data} />
      <EarningsTable />
    </>

  )
}

export default Earnings