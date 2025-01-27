import { Button } from "@/components/ui/button";
import { checkoutActionTitle } from "@/lib/constants";
import { roundNumber } from "@/lib/utils";
import UseCartStore from "@/store/CartStore";
import Link from "next/link";
import { useEffect, useState } from "react";


function CheckoutButton() {
  const {items, getTotalPrice} = UseCartStore();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    setTotalPrice(roundNumber(getTotalPrice(), 2));
  }, [items])

  return (
    <Link href={'/checkout'} className=''>
      <Button className='mx-2'>{checkoutActionTitle} ${totalPrice}</Button>
    </Link>
  )
}

export default CheckoutButton