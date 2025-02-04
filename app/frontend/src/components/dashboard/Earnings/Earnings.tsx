import { useEffect } from "react";

import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import DateFilter from "./DateFilter";
import EarningsTable from "./EarningsTable";
import { roundNumber } from "@/lib/utils";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import { agentMode, businessMode } from "@/lib/dashboard/constants";
import createEntityStore from "@/store/dashboard/EntityStore";
import SectionHeader from "../SectionHeader";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";
import Loading from "@/app/dashboard/loading";



export const useOrderStore = createEntityStore<Order[]>([]);


function Earnings() {
  const { data: user } = useUserProfile();
  const { config: settings } = useDashboardConfigStore();
  const { entities, setEntities } = useOrderStore();
  const { data: orders, isLoading} = useFetchOrders({
    status: "completed",
    agent: settings.mode == agentMode() ? user?.agent_profile?.code : "",
    business: settings.mode == businessMode() ? user?.business_profile?.code : "",
  }, user);

  const totalAmount = roundNumber(
    entities.reduce(
      (acc, order) =>
        acc + parseInt(settings.mode === businessMode() ? order.business_earning || "0" : order.agent_earning || "0"),
      0
    ),
    2
  );
  
  useEffect(() => {
    setEntities(orders)
  }, [orders])
  
  return (
    <>
      <div className="flex justify-between my-4 text-lg font-semibold w-full page-width">
        <SectionHeader 
          HeaderTitle="Earnings"
          SubText="Assess your earnings."
          Action={<p className="text-[--baseColor]">+${totalAmount}</p>}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DateFilter data={orders} />
          <EarningsTable />
        </>
      )}
    </>

  )
}

export default Earnings