"use client";
import ListItem from '@/components/dashboard/ListItem';
import { roundNumber } from '@/lib/utils';
import UseCartStore from '@/store/CartStore';
import { useEffect, useState } from 'react';

function CheckoutProducts() {
  const {items, getTotalPrice} = UseCartStore();
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    setCheckoutTotal(roundNumber(getTotalPrice(), 2));
  }, [])

  return (
    <div>
      <div className="flex flex-col">
        {items.map(item => {
          const totalPrice = parseInt(item.on_sale ? item.sale_price : item.price) * item.quantity;
          const attr = item.attributes.at(0);
          const attrName = attr?.value + " " + attr?.name

          return (
            <ListItem 
              key={item.variant_id}
              className="mx-2 px-2 flex justify-between h-12 rounded-none my-0 shadow-none border "
            >
              <p>{`${attrName} ${item.name} x ${item.quantity}`}</p>
              <p className="text-[--baseColor]">${totalPrice}</p>
            </ListItem>
          )
        })}
        <div className="self-end text-lg p-4 underline underline-offset-1 text-[--baseColor]">${checkoutTotal}</div>
      </div>
    </div>
  )
}

export default CheckoutProducts