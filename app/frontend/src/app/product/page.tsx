import PageContainer from "@/components/marketplace/PageContainer";
import ProductClient from "@/components/marketplace/Product/ProductClient";
import { ProductEndpoints } from "@/services/api/marketplace/product"

type Props = {
  searchParams: {
    id: number,
    v?: number,
    ag?: string
  }
}


async function Page({searchParams}: Props) {
  
  const {id, v, ag} = await searchParams;
  
  const apiServices = new ProductEndpoints();
  const product = await apiServices.getProduct(id);

  return (
    <PageContainer className="flex place-content-center sm:mt-4">
      <ProductClient 
        product={product} 
        defaultVariant={v} 
        ag={ag}
      />
    </PageContainer>
  )
}

export default Page