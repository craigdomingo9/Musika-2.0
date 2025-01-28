"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../../../communications';
import useFetchAgent from '../useFetchAgent';



function useFetchAgentConversations(reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: agent } = useFetchAgent();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
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
  }, [agent, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchAgentConversations;