"use client";
import { useState, useEffect } from 'react';
import { correctImageUrl } from '@/services/utils';
import AgentEndpoints from '../agents';
import RelationshipEndpoints from '../relationships';
import useFetchBusiness from './business/useFetchBusiness';
import useFetchAgent from './agent/useFetchAgent';
import useDashboardConfigStore from '@/store/dashboard/DashboardConfig';



function transformAgentData(data: Relationship[], baseUrl: string): Relationship[] {
  return data.filter((rel) => rel.agent.profile)
  .map((relationship) => ({
    ...relationship,
    agent: {
      ...relationship.agent,
      profile: {
        ...relationship.agent.profile,
        profile_picture: correctImageUrl(
          relationship.agent.profile.profile_picture,
          baseUrl
        ),
      },
    },
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
  }));
}


function useFetchActiveRelationships(mode: "agent" | "business", reRenderState?: any) {
  const [data, setData] = useState<Relationship[]>([]);
  const { data: business } = useFetchBusiness();
  const { data: agent } = useFetchAgent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new RelationshipEndpoints();
        apiServices.isOnClient(window);
        
        if (!business.code) return;

        const rawData = await apiServices.getRelationships({
          business: mode == "business" ? business.code : "",
          agent: mode == "agent" ? agent.code : "",
          status: "active",
        });
        const transformedData = transformAgentData(rawData, window.location.href); 
        
        setData(transformedData);

      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [business, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchActiveRelationships