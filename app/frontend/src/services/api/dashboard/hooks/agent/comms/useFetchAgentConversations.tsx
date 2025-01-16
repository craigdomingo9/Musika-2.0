"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../../../communications';
import useFetchAgent from '../useFetchAgent';


const apiServices = new CommunicationEndpoints();
apiServices.isOnClient(window);


function useFetchAgentConversations(reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: agent } = useFetchAgent();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const data = await apiServices.getConversations({
          agent_code: agent.code,
          role: "agent"
        });

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [agent]);

  return { data, isLoading, error };
}

export default useFetchAgentConversations;