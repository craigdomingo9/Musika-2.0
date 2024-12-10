import Image from "next/image";
import Link from "next/link";
import ProductCardFace from "../ProductCardFace";

type Props = {
  product: StandardProduct
}

function FeaturedProductCard({product}: Props) {
  // console.log(product)
  return (
    <Link
      href={{
        pathname: '/product',
        query: {
          id: product.id,
          v: product.variant_id,
        }
      }}
      className="border shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1">
      <ProductCardFace product={product} />
    </Link>
  )
}

export default FeaturedProductCard