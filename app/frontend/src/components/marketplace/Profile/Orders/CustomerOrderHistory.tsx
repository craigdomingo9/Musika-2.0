"use client";
import Loading from "@/app/dashboard/loading";
import ListItem from "@/components/dashboard/ListItem";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { cn } from "@/lib/utils";
import useFetchOrders from "@/services/api/dashboard/hooks/orders/useFetchOrders";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";


function CustomerOrderHistory() {
  const { data: user } = useUserProfile();
  const { data: orderHistory, isLoading } = useFetchOrders({
    customer: user.uuid
  }, user);


  return (
    <div>

      <SectionHeader 
        HeaderTitle='Order History'
        SubText='The orders you have placed.'
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {orderHistory.map(order => (
            <div key={order.id}>
              <ListItem 
                className="px-2 my-2"
              >
                <p className="text-opacity">
                  You ordered {order.quantity} {order.product.product?.name}
                  &nbsp;from {order.business.profile.name}
                </p>
                <p className={cn("text-xs text-opacity", order.status == "pending" && "text-orange-300", order.status == "completed" && "text-green-500")}>{order.status}</p>
              </ListItem>
              <hr />
            </div>
          ))}
        </>
      )}
      
    </div>
  )
}

export default CustomerOrderHistory 