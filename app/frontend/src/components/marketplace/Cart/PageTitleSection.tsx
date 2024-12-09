"use client";
import { Button } from '@/components/ui/button'
import { cartPageTitle, checkoutActionTitle } from '@/lib/constants'
import { roundNumber } from '@/lib/utils';
import UseCartStore from '@/store/CartStore'
import { useEffect, useState } from 'react';


function PageTitleSection() {
  const {items, getTotalPrice} = UseCartStore();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    setTotalPrice(roundNumber(getTotalPrice(), 2));
  }, [items])
  return (
    <div className='p-4 flex justify-between'>
      <p className='text-xl my-auto font-semibold text-opacity'>{cartPageTitle}</p>
      <div className=''>
        <Button className='mx-2'>{checkoutActionTitle} ${totalPrice}</Button>
      </div>
    </div>
  )
}

export default PageTitleSection
