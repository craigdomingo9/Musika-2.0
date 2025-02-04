"use client";
import { useState, useEffect } from 'react';
import AgentEndpoints from '../../../agents';
import { correctImageUrl } from '@/services/utils';
import useUserProfile from '@/services/api/marketplace/hooks/useUserProfile';


function transformAgentData(data: Agent[], baseUrl: string): Agent[] {
  return data.filter((agent) => agent.profile)
  .map((agent) => ({
    ...agent,
      profile: {
        ...agent.profile,
        profile_picture: correctImageUrl(
          agent.profile.profile_picture,
          baseUrl
        ),
      }
    }
  ))
}

function useFetchScoutAgents(config?: {}) {
  const [data, setData] = useState<Agent[]>([]);
  const { data: user } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user.business_profile) return;

        const apiServices = new AgentEndpoints();
        apiServices.isOnClient(window);
        
        const rawData = await apiServices.getAgents({
          exclude_related_agents: user.business_profile.code,
        });
        const transformedData = transformAgentData(rawData, window.location.href)
        setData(transformedData);
        
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, isLoading, error };
}

export default useFetchScoutAgents;