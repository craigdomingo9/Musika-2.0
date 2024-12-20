import { cn } from "@/lib/utils";
import Link from "next/link";
import ProductCardFace from "../ProductCardFace";

type Props = {
  product: StandardProduct
}



function SaleProductCard({product}: Props) {
  return (
    <>
      <Link 
      href={{
        pathname: '/product',
        query: {
          id: product.id,
          v: product.variant_id
        }
      }}
      className={cn("grid grid-cols-[40%_60%] place-content-center ml-2 px-4 shadow-lg rounded-lg",
        "h-36 sm:h-48 w-[280px] sm:w-[375px]"
      )}>
        <ProductCardFace product={product} isSale />

      </Link>
    </>
  )
}

export default SaleProductCard