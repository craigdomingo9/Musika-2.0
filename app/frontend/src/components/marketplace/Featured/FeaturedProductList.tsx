import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product";
import ProductServices from "@/services/marketplace/product";
import FeaturedProductCard from "./FeaturedProductCard";
import FeaturedProductListClient from "./FeaturedProductListClient";

async function FeaturedProductList() {
  const apiService = new ProductEndpoints();

  const data = await apiService.getProducts({
    is_featured: true,
    page_size: 10,
  })
  const productService = new ProductServices(data);
  const products = productService.splitVariants()
  
  return (
    <FeaturedProductListClient products={products} />
  )
}

export default FeaturedProductList
