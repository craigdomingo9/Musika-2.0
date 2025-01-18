import { useEffect, useState } from "react"
import RelationshipEndpoints from "../../../relationships";
import { correctImageUrl } from "@/services/utils";




function transformData(data: Assignment[], baseUrl: string) {
  return data.map((assignment) => ({
    ...assignment,
    agent: {
      ...assignment.agent,
      profile: {
        ...assignment.agent.profile,
        profile_picture: correctImageUrl(
          assignment.agent.profile.profile_picture,
          baseUrl
        )
      }
    }
  }))
}


function useFetchAssignments(agentCode: string, reRenderState?: any) {
  const [data, setData] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new RelationshipEndpoints();
        apiServices.isOnClient(window);
        
        const rawData = await apiServices.getAssignments({
          agent_code: agentCode,
          status: "active",
        });
        const transformedData = transformData(rawData, window.location.href)
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

export default useFetchAssignments