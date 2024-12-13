import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product";
import FeaturedProductListClient from "./FeaturedProductListClient";
import LoadMoreProducts from "./LoadMoreProducts";
import { splitVariants } from "@/services/marketplace/product";

async function FeaturedProductList() {
  const apiService = new ProductEndpoints();

  const data = await apiService.getProducts({
    is_featured: true,
    page_size: 10,
  })
  const products = splitVariants(data.results)

  
  
  return (
    <>
      <FeaturedProductListClient products={products} />
      <LoadMoreProducts />
    </>

  )
}

export default FeaturedProductList
