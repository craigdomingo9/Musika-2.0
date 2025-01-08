import { useEffect, useState } from "react";

import useFetchBusiness from "../useFetchBusiness";
import { testBusiness } from "@/lib/constants";
import InventoryEndpoints from "../../../inventory";



function useFetchVariants(config: Record<string, any>, reRenderState?: any) {
  const [data, setData] = useState<ProductVariant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { data: business } = useFetchBusiness();

  let code = business?.code
  code = testBusiness


  useEffect(() => {
    if (!config.product) return;
    const fetchProductVariants = async() => {
      setIsLoading(true);
      try {
        if (!code) return;

        const apiServices = new InventoryEndpoints();
        apiServices.isOnClient(window);

        const data = await apiServices.getVariants(config);

        setData(data);
        
      } catch (error) {
        setError(error);

      } finally {
        setIsLoading(false);
      }
    }
    fetchProductVariants()
  }, [reRenderState])


  return { data, isLoading, error };
}

export default useFetchVariants
