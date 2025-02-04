"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../communications';
import useUserProfile from '../../marketplace/hooks/useUserProfile';



function useFetchConversations(config?: {}, reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: user } = useUserProfile();

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user.uuid) return;

        const apiServices = new CommunicationEndpoints();
        apiServices.isOnClient(window);
        const data = await apiServices.getConversations({
          ...config,
          user_uuid: user.uuid,
        });

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchConversations;