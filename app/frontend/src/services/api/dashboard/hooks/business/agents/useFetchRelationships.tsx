"use client";
import { useState, useEffect } from 'react';
import useFetchBusiness from '../useFetchBusiness';
import AgentEndpoints from '../../../agents';
import { correctImageUrl } from '@/services/utils';



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
  }));
}

function useFetchRelationships(reRenderState?: any) {
  const [data, setData] = useState<Relationship[]>([]);
  const { data: business } = useFetchBusiness();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new AgentEndpoints();
        apiServices.isOnClient(window);
        
        if (!business.code) return;

        const rawData = await apiServices.getRelationships({
          business: business.code,
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

export default useFetchRelationships;