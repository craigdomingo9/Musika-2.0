import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness";
import SectionHeader from "../SectionHeader"
import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import { testBusiness } from "@/lib/constants";
import Loading from "@/app/dashboard/loading";
import Order from "./Order";


function CompletedOrders() {
  const { data: business} = useFetchBusiness();
  const { data: completedOrders, isLoading } = useFetchOrders({
    status: "completed",
    business: testBusiness,
  }, business);

  return (
    <div className="page-width">
      <SectionHeader 
        HeaderTitle="Completed Orders"
        SubText="Orders that have been fulfilled."
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {completedOrders && (
            <div>
              {completedOrders.map(order => (
                <Order 
                  key={order.id}
                  order={order}
                  status="Completed"
                />
              ))}
            </div>
          )}
          {!completedOrders.length && (
            <div className="text-sm mt-48 text-center text-opacity">No orders have been placed yet.</div>
          )}
        </>
      )}
    </div>
  )
}

export default CompletedOrders