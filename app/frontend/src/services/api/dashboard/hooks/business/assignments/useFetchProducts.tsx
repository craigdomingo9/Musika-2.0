import { useEffect, useState } from "react"
import { correctImageUrl } from "@/services/utils";
import InventoryEndpoints from "../../../inventory";
import useFetchBusiness from "../useFetchBusiness";
import { testBusiness, testUuid } from "@/lib/constants";




function transformData(data: Product[], baseUrl: string): Product[] {
  return data.map((product) => ({
    ...product,
    variants: product.variants.map((variant) => ({
      ...variant,
      image: {
        ...variant.image,
        image: correctImageUrl(variant.image.image, baseUrl)
      }
    }))
  }))
}


function useFetchProducts(agentCode: string, reRenderState?: any) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new InventoryEndpoints();
        apiServices.isOnClient(window);
        
        const rawData = await apiServices.getProducts({
          exclude_agent_assigned: agentCode,
          business: testBusiness,
          page_size: 50
        });
        const transformedData = transformData(rawData.results, window.location.href)
        setData(transformedData);
        
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reRenderState])


  return { data, isLoading, error }
  
}

export default useFetchProducts