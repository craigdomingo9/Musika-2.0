import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product"
import SaleProductListClient from "./SaleProductListClient";
import { splitVariants } from "@/services/marketplace/product";

async function SaleProductList() {
  // fetch the products
  const apiService = new ProductEndpoints();

  const data = await apiService.getProducts({
    on_sale: true,
    page_size: 10,
  })
  // resolve the products
  const products = splitVariants(data.results);


  // console.log(products);
  return (
    <SaleProductListClient products={products} />
  )
}

export default SaleProductList
