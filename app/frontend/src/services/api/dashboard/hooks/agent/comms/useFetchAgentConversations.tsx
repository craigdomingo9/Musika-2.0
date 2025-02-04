"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../../../communications';
import useFetchAgent from '../useFetchAgent';
import useUserProfile from '@/services/api/marketplace/hooks/useUserProfile';



function useFetchAgentConversations(reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: user } = useUserProfile();
  const agent = user.agent_profile;
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!agent) return;

        const apiServices = new CommunicationEndpoints();
        apiServices.isOnClient(window);
        
        const data = await apiServices.getConversations({
          agent_code: agent.code,
          role: "agent",
          type: "business_agent",
        });

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [agent, user, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchAgentConversations;