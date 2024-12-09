"use client";
import UseCartStore from "@/store/CartStore"
import Image from "next/image";
import Link from "next/link";
import CartItemActions from "./CartItemActions";
import { cartIsEmptyLabel } from "@/lib/constants";



export function EmptyCartProducts() {
  return (
    <div className="min-h-full h-96 grid">
      <p className="items-center m-auto">{cartIsEmptyLabel}</p>
    </div>
  )
}


function CartProducts() {
  const { items } = UseCartStore();
  
  if (items.length < 1) return <EmptyCartProducts />

  if (items)
  return (
    <div className="grid mb-6 sm:grid-cols-2">
      {items.map(item => (
        <div key={item.variant_id} className="grid grid-cols-[40%_60%] h-32 mx-4 my-2 rounded-lg border">
          <div className=" m-2 my-auto max-h-32 rounded-lg">
            <Link href={{
              pathname: '/product',
              query: {
                id: item.id,
                v: item.variant_id
              }}}>
              <Image 
                className="object-scale-down max-h-[7.5rem] sm:shadow"
                src={item.image.image}
                width={400}
                height={400}
                alt={item.name}
                unoptimized
                priority
                />
              </Link>
          </div>
          <div className="m-2 h-28 text-ellipsis flex flex-col">
            <Link href={{
              pathname: '/product',
              query: {
                id: item.id,
                v: item.variant_id
              }}}>
              <div className="h-20">
                <div className="flex justify-between">
                  <p className="font-semibold text-opacity">{item.name}</p>
                  <p className="font-semibold text-opacity">{item.on_sale ? item.sale_price: item.price}</p>
                </div>
                {item.attributes.map(attr => (
                  <p key={attr.id} className="text-opacity text-[0.65rem] sub-text-opacity font-semibold">{attr.value}&nbsp;{attr.name}</p>
                ))}
              </div>
            </Link>
            <div className="content-end h-8 grid grid-cols-[65%_35%]">
              <CartItemActions item={item} />
            </div>
          </div>
        </div>
          

      ))}
    </div>
  )
}

export default CartProducts
