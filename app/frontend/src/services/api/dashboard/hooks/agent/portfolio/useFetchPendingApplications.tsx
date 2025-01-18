"use client";
import { useState, useEffect } from 'react';
import AgentEndpoints from '../../../agents';
import { correctImageUrl } from '@/services/utils';
import useFetchAgent from '../useFetchAgent';


function transformData(data: AgentApplication[], baseUrl: string): AgentApplication[] {
  return data.filter((application) => application.business.profile && application.agent.profile)
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

function useFetchPendingApplications(reRenderState?: any) {
  const [data, setData] = useState<AgentApplication[]>([]);
  const { data: agent } = useFetchAgent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new AgentEndpoints();
        apiServices.isOnClient(window);
        
        if (!agent) return;

        const rawData = await apiServices.getApplications({
          agent: agent.code,
          status: "pending",
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
  }, [agent, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchPendingApplications