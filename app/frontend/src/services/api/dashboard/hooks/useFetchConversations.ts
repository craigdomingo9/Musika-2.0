"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../communications';
import useFetchAgent from './agent/useFetchAgent';
import useFetchBusiness from './business/useFetchBusiness';

const apiServices = new CommunicationEndpoints();
apiServices.isOnClient(window);


function useFetchConversations(mode: "agent" | "business") {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: agent } = useFetchAgent();
  const { data: business } = useFetchBusiness();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const data = await apiServices.getConversations({
          // user_uuid: mode == "agent" ? agent.user.uuid : business.user.uuid,
          role: "agent",
        });
        console.log(data)

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export default useFetchConversations;