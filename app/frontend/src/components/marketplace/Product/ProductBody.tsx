import { cn } from "@/lib/utils";
import { useProductVariantCarouselStore } from "@/store/ProductVariantCarousel";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  product: Product,
}

function ProductBody({product}: Props) {
  const {selectedVariant} = useProductVariantCarouselStore();
  const business = product.business.profile;

  useEffect(() => {}, [selectedVariant])

  if (selectedVariant)
  return (
    <div className="grid mt-2">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold text-opacity">{product.name}</p>
        </div>
        <div className="flex gap-1">
          <p className={cn("font-semibold text-opacity my-auto sm:my-1", selectedVariant.on_sale && "line-through text-xs text-[--baseColor]")}>{selectedVariant.price}</p>
          <p className={cn("font-semibold text-opacity", !selectedVariant.on_sale && "hidden")}>{selectedVariant.sale_price}</p>
        </div>
      </div>
      <div className="flex justify-between max-h-8">
        <div className="grid">
          {selectedVariant.attributes.map(attr => (
            <p key={attr.id} className="text-opacity text-xs sub-text-opacity font-semibold">{attr.value}&nbsp;{attr.name}</p>
          ))}
          </div>
        <div className="sub-text-opacity text-xs font-semibold my-auto">
          <p>In Stock: {selectedVariant.stock_quantity}</p>
        </div>
      </div>
      
      <Link href={`/b/${product.business.code}/`} className="flex w-full shadow rounded-lg mt-2 p-2 max-h-14 hover:scale-[1.01] duration-300">
          <>
            <Image
            className="w-10 h-10 rounded-full border text-opacity"
            src={business.logo}
            width={200}
            height={200}
            alt={business.name +"'s profile picture"}
            unoptimized
            priority
            />
          </>
          <div className="my-auto ml-2 text-opacity-mid font-semibold text-sm">
            <p>{business.name}</p>
          </div>
      </Link>
      <div className="mt-4 sub-text-opacity text-xs leading-none">
        <p>{product.description}</p>
      </div>
    </div>
  )
}

export default ProductBody
