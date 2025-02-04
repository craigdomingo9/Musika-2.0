import { useEffect, useState } from "react"
import { correctImageUrl } from "@/services/utils";
import InventoryEndpoints from "../../../inventory";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";




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
  const { data: user } = useUserProfile();
  const business = user.business_profile;

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!business) return;

        const apiServices = new InventoryEndpoints();
        apiServices.isOnClient(window);
        
        const rawData = await apiServices.getProducts({
          exclude_agent_assigned: agentCode,
          business: business.code,
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
  }, [business, reRenderState])


  return { data, isLoading, error }
  
}

export default useFetchProducts