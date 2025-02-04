import SectionHeader from "../SectionHeader"
import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import Loading from "@/app/dashboard/loading";
import Order from "./Order";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";


function CompletedOrders() {
  const { data: user } = useUserProfile();
  const business = user.business_profile;
  const { data: completedOrders, isLoading } = useFetchOrders({
    status: "completed",
    business: business?.code,
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