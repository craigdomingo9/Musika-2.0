"use client";
import { fixProductImageUrl, splitVariants } from "@/services/marketplace/product";
import useSearchedProductsStore from "@/store/SearchedProducts"
import ProductCardFace from "../../ProductCardFace";
import Link from "next/link";

function SearchedProducts() {
  let {products} = useSearchedProductsStore();

  let _products = splitVariants(products);

  const url = window.location.href;
  _products = fixProductImageUrl(url, _products)
  
  return (
    <div className="min-w-full grid grid-cols-2 pb-2 md:grid-cols-3 items-center space-y-2 mt-4 overflow-x-hidden">
      {_products.map(product => (
        <Link href={{
          pathname: '/product',
          query: {
            id: product.id,
            v: product.variant_id,
          }
        }} key={product.uuid} className="shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1">
          <ProductCardFace product={product} />
        </Link>
      ))}
    </div>
  )
}

export default SearchedProducts
