import SaleProductListClient from "./SaleProductListClient";
import useFetchProducts from "@/services/api/marketplace/hooks/product/useFetchProducts";

async function SaleProductList() {
  const data = await useFetchProducts({on_sale: true})


  return (
    <SaleProductListClient products={data} />
  )
}

export default SaleProductList
