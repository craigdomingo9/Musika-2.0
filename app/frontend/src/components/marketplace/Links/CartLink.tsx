"use client";
import IconLink from "../Header/IconLink"
import UseCartStore from "@/store/CartStore"
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

function CartLink() {
  const { getTotalItems, items } = UseCartStore();
  const [totalCartItems, setTotalCartItems] = useState<number>(0);

  useEffect(() => {
    setTotalCartItems(getTotalItems());
  }, [items])

  return (
    <IconLink Icon={
      <ShoppingCart strokeWidth={1.5} />
    } count={totalCartItems} pathName="/cart" />
  )
}

export default CartLink
