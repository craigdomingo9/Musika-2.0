"use client";
import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product";
import usePageConfigStore from "@/store/PageConfigStore"
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCardFace from "../ProductCardFace";
import { fixProductImageUrl, splitVariants } from "@/services/marketplace/product";



function ProductsList() {
  const {config} = usePageConfigStore();
  const [products, setProducts] = useState<StandardProduct[]>([]);

  useEffect(() => {

    const fetchProducts = async() => {
      const apiServices = new ProductEndpoints();
      apiServices.isOnClient(window);

      const data = await apiServices.getProducts({...config, page_size: 1000});

      let products = splitVariants(data.results, config)
      console.log(products)

      const url = window.location.href;
      products = fixProductImageUrl(url, products);

      setProducts(products)

    }
    fetchProducts();
  }, [config])

  if (products.length == 0) {
    return <div className="min-h-56 flex justify-center place-items-center text-sm">
      Products not found...
    </div>
  }

  return (
    <div className="min-w-full grid grid-cols-2 pb-2 md:grid-cols-3 items-center space-y-2 mt-4 overflow-x-hidden">
      {products.map(product => (
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

export default ProductsList
