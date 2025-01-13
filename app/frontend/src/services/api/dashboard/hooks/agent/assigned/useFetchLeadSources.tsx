import { useEffect, useState } from "react"
import useFetchAgent from "../useFetchAgent";
import AnalyticsEndpoints from "../../../analytics";


const apiServices = new AnalyticsEndpoints();
apiServices.isOnClient(window);




function useFetchLeadSources(reRenderState?: any) {
  const [data, setData] = useState<LeadSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const rawData = await apiServices.getLeadSources();
        setData(rawData);
        
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

export default useFetchLeadSources