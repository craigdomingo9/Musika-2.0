import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { BusinessEndpoints } from "@/services/api/marketplace/business";


function useFetchBusiness(reRenderState?: any) {
  const [data, setData] = useState<Business>({} as Business);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    
    const fetchBusiness = async() => {
      setIsLoading(true);
      try {
        const uuid = Cookies.get('uuid');
        const apiServices = new BusinessEndpoints();
        apiServices.isOnClient(window);
  

        const data = await apiServices.getBusinesses({
          uuid: "f8dea9bf-c16a-442d-8092-1d384947fc18"
        });
        // TODO: input uuid
  

        setData(data[0]);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchBusiness();
  }, [reRenderState])

  return { data, isLoading, error };

}

export default useFetchBusiness
