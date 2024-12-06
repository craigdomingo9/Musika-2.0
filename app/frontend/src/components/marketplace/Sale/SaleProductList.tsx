import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product"
import SaleProductService from "@/services/marketplace/sale";
import SaleProductListClient from "./SaleProductListClient";

async function SaleProductList() {
  // fetch the products
  const apiService = new ProductEndpoints();

  const data = await apiService.getProducts({
    on_sale: true,
    page_size: 10,
  })
  // resolve the products
  const productService = new SaleProductService(data);
  const products = productService.resolveOnSaleProducts();


  // console.log(products);
  return (
    <SaleProductListClient products={products} />
  )
}

export default SaleProductList
