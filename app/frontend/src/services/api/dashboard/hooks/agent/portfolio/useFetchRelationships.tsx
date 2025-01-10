import { useEffect, useState } from "react"
import useFetchAgent from "../useFetchAgent";
import AgentEndpoints from "../../../agents";
import { correctImageUrl } from "@/services/utils";

const apiServices = new AgentEndpoints();
apiServices.isOnClient(window);

function transformData(data: Relationship[], baseUrl: string): Relationship[] {
  return data.filter((rel) => rel.business.profile)
  .map((relationship) => ({
    ...relationship,
    business: {
      ...relationship.business,
      profile: {
        ...relationship.business.profile,
        logo: correctImageUrl(
          relationship.business.profile.logo, 
          baseUrl
        )
      }
    }
  }))
}

function useFetchRelationships(reRenderState?: any) {
  const [data, setData] = useState<Relationship[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: agent } = useFetchAgent();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!agent.code) return;

        const rawData = await apiServices.getRelationships({
          agent: agent.code,
          status: "active",
        });
        const transformedData = transformData(rawData, window.location.href);

        setData(transformedData)

      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [agent, reRenderState]);


  return { data, isLoading, error }
}

export default useFetchRelationships