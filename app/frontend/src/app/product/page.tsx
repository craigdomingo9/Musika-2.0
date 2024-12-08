import ProductClient from "@/components/marketplace/Product/ProductClient";
import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product"

type Props = {
  searchParams: {
    id: number,
    v?: number,
  }
}

async function Page({searchParams}: Props) {
  
  const {id, v} = await searchParams;
  
  const ApiServices = new ProductEndpoints();
  const product = await ApiServices.getProduct(id);
  

  return (
    <div className="flex place-content-center sm:mt-4">
      <ProductClient product={product} defaultVariant={v} />
    </div>
  )
}

export default Page