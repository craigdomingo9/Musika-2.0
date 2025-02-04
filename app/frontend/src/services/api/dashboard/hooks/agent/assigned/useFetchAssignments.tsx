import { useEffect, useState } from "react"
import RelationshipEndpoints from "../../../relationships";
import { correctImageUrl } from "@/services/utils";
import useFetchAgent from "../useFetchAgent";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";




function transformData(data: Assignment[], baseUrl: string) {
  return data.map((assignment) => ({
    ...assignment,
    product: {
      ...assignment.product,
      variants: assignment.product.variants.map(variant => ({
        ...variant,
        image: {
          ...variant.image,
          image: correctImageUrl(variant.image.image, baseUrl)
        }
      }))
    }
  }))
}


function useFetchAssignments(businessCode: string, reRenderState?: any) {
  const [data, setData] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { data: user } = useUserProfile();
  const agent = user.agent_profile;

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!agent) return;

        const apiServices = new RelationshipEndpoints();
        apiServices.isOnClient(window);
        
        const rawData = await apiServices.getAssignments({
          business_code: businessCode,
          agent_code: agent.code,
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
  }, [agent, user, reRenderState])


  return { data, isLoading, error }
  
}

export default useFetchAssignments