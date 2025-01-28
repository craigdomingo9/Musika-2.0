"use client";
import Loading from '@/app/dashboard/loading';
import ListItem from '@/components/dashboard/ListItem';
import Ribbon from '@/components/dashboard/Ribbon';
import SectionHeader from '@/components/dashboard/SectionHeader';
import { cn } from '@/lib/utils';
import useFetchOrders from '@/services/api/dashboard/hooks/orders/useFetchOrders';
import useFetchUserProfileInfo from '@/services/api/marketplace/hooks/useFetchUserProfileinfo';


function CustomerPendingOffers() {
  const { data: user } = useFetchUserProfileInfo();
  const { data: pendingOrders, isLoading } = useFetchOrders({
    status: "pending",
    customer: user.uuid
  }, user);


  return (
    <div>

      <SectionHeader 
        HeaderTitle='Pending Orders'
        SubText='Orders yet to be fulfilled.'
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Ribbon>
            You must provide the fulfillment code upon order collection.
          </Ribbon>
          {pendingOrders.map(order => (
              <ListItem 
                className="px-2 my-2 h-[4.5rem]"
                key={order.id}
              >
                <div className='grid'>
                  <p className="text-opacity pt-1 sm:pt-2">
                    You ordered {order.quantity} {order.product.product?.name}
                    &nbsp;from {order.business.profile.name}
                  </p>
                  <p className='text-[0.7rem] text-opacity pt-2'>fulfillment code: {order.fulfillment_code}</p>
                </div>
                <p className={cn("text-xs text-opacity", "text-orange-300")}>Pending</p>
              </ListItem>
          ))}
        </>
      )}
      
    </div>
  )
}

export default CustomerPendingOffers