import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import SectionHeader from "../SectionHeader"
import Loading from "@/app/dashboard/loading";
import Order from "./Order";
import createEntityStore from "@/store/dashboard/EntityStore";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";

export const useOrderAction = createEntityStore(false);

function PendingOrders() {
  const { entities: action } = useOrderAction();
  const { data: user } = useUserProfile();
  const business = user.business_profile;
  const { data: pendingOrders, isLoading } = useFetchOrders({
    status: "pending",
    business: business?.code,
  }, `${business}${action}${user.business_profile}`);

  return (
    <div className="page-width">

      <SectionHeader 
        HeaderTitle="Pending Orders"
        SubText="Orders that have yet to be fulfilled."
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {pendingOrders && (
            <div>
              {pendingOrders.map((order, index) => (
                <Order 
                  key={order.id}
                  order={order}
                  open={index==0}
                  status="Pending"
                  collapse
                />
              ))}
            </div>
          )}
          {!pendingOrders.length && (
            <div className="text-sm mt-48 text-center text-opacity">No orders have been placed yet.</div>
          )}
        </>
      )}
    </div>
  )
}

export default PendingOrders