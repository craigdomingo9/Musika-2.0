import { useEffect, useState } from "react";
import { BusinessEndpoints } from "../../business";
import { useParams } from "next/navigation";
import { fixLogoImageUrl } from "@/services/marketplace/business";


function useFetchBusiness() {
  const { code } = useParams();
  const [data, setData] = useState<Business>({} as Business);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    
    const fetchBusiness = async() => {
      setIsLoading(true);
      try {
        if (!code) return;
  
        const apiServices = new BusinessEndpoints();
        apiServices.isOnClient(window);
  
        const data = await apiServices.getBusiness(code.toString());
  
        const businessData = fixLogoImageUrl(window.location.href, data);

        setData(businessData);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchBusiness();
  }, [])

  return { data, isLoading, error };

}

export default useFetchBusiness
