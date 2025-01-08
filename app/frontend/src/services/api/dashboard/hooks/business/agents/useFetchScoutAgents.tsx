"use client";
import { useState, useEffect } from 'react';
import useFetchBusiness from '../useFetchBusiness';
import AgentEndpoints from '../../../agents';
import { correctImageUrl } from '@/services/utils';


const apiServices = new AgentEndpoints();
apiServices.isOnClient(window);

function transformAgentData(data: Agent[], baseUrl: string): Agent[] {
  return data.map((agent) => ({
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
  const { data: business } = useFetchBusiness();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {

        const rawData = await apiServices.getAgents();
        const transformedData = transformAgentData(rawData, window.location.href)
        setData(transformedData);
        
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [business]);

  return { data, isLoading, error };
}

export default useFetchScoutAgents;