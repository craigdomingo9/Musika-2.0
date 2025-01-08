import { useEffect } from "react";

import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import DateFilter from "./DateFilter";
import EarningsTable from "./EarningsTable";
import { roundNumber } from "@/lib/utils";
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import { businessMode } from "@/lib/dashboard/constants";
import createEntityStore from "@/store/dashboard/EntityStore";



export const useOrderStore = createEntityStore<Order[]>([]);


function Earnings() {
  const { config } = useDashboardConfigStore();
  const { entities, setEntities } = useOrderStore();
  const { data, isLoading, error} = useFetchOrders({
    status: "completed",
  });


  const totalAmount = roundNumber(entities.reduce((acc, order) => acc + parseInt(config.mode == businessMode() ? order.business_earning || "0" : order.agent_earning || "0"), 0),2)

  useEffect(() => {
    setEntities(data)
  }, [data])
  
  return (
    <>
      <div className="flex justify-between my-4 text-lg font-semibold">
        <h1>Total Earnings</h1>
        <p className="text-[--baseColor]">+${totalAmount}</p>
      </div>
      <DateFilter data={data} />
      <EarningsTable />
    </>

  )
}

export default Earnings