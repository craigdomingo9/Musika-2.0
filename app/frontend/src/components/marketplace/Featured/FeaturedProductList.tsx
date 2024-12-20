import FeaturedProductListClient from "./FeaturedProductListClient";
import LoadMoreProducts from "./LoadMoreProducts";
import useFetchProducts from "@/services/api/marketplace/hooks/product/useFetchProducts";

async function FeaturedProductList() {
  const data = await useFetchProducts({is_featured: true})
  
  return (
    <>
      <FeaturedProductListClient products={data} />
      <LoadMoreProducts />
    </>

  )
}

export default FeaturedProductList
