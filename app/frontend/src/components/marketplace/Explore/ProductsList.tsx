"use client";
import Link from "next/link";
import ProductCardFace from "../ProductCardFace";
import useFetchExploreProducts from "@/services/api/marketplace/hooks/product/useFetchExploreProducts";
import Loading from "@/app/dashboard/loading";



function ProductsList() {
  const { data, isLoading, error } = useFetchExploreProducts();


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="min-w-full grid grid-cols-2 pb-2 md:grid-cols-3 items-center space-y-2 mt-4 overflow-x-hidden">
            {data.map(product => (
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
          {!data.length && (
            <div className="min-h-56 flex justify-center place-items-center text-sm ">
              Products not found...
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ProductsList
