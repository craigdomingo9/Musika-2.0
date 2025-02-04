"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../../../communications';
import useUserProfile from '@/services/api/marketplace/hooks/useUserProfile';



function useFetchBusinessConversations(reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: user } = useUserProfile();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user.business_profile) return;

        const apiServices = new CommunicationEndpoints();
        apiServices.isOnClient(window);
        
        const data = await apiServices.getConversations({
          business_code: user.business_profile.code,
          type: 'business_agent'
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

export default useFetchBusinessConversations;