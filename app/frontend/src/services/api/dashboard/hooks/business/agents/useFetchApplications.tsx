"use client";
import { useState, useEffect } from 'react';
import useFetchBusiness from '../useFetchBusiness';
import AgentEndpoints from '../../../agents';
import { correctImageUrl } from '@/services/utils';


function transformAgentData(data: AgentApplication[], baseUrl: string): AgentApplication[] {
  return data.filter((application) => application.agent.profile)
  .map((application) => ({
    ...application,
    agent: {
      ...application.agent,
      profile: {
        ...application.agent.profile,
        profile_picture: correctImageUrl(
          application.agent.profile.profile_picture,
          baseUrl
        ),
      }
    }
  }));
}

function useFetchApplications(reRenderState: any) {
  const [data, setData] = useState<AgentApplication[]>([]);
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

        const rawData = await apiServices.getApplications({
          business: business?.code,
          status: "pending",
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
  }, [business, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchApplications