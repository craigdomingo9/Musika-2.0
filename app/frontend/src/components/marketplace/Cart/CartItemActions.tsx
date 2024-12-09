import { Button } from "@/components/ui/button";
import UseCartStore from "@/store/CartStore";
import { useEffect } from "react";

type Props = {
  item: CartProduct,
}

function CartItemActions({item}: Props) {
  const {incrementQuantity, decrementQuantity, resetBag} = UseCartStore();
  

  return (
    <>
      <div className="flex gap-x-2 text-opacity">
        <Button 
          className="h-6 w-2 my-auto bg-primary/90" 
          onClick={() => decrementQuantity(item)}>
            -
        </Button>

        <p className="my-auto text-opacity text-sm text-opacity font-semibold">{item.quantity}</p>

        <Button 
          className="h-6 w-2 my-auto bg-primary/90" 
          onClick={() => incrementQuantity(item)}>
            +
        </Button>
      </div>
      <Button className="h-8">Buy</Button>
    </>
  )
}

export default CartItemActions
