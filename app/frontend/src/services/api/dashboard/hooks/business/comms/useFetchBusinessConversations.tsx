"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../../../communications';
import useFetchBusiness from '../useFetchBusiness';
import { testBusiness } from '@/lib/constants';



function useFetchBusinessConversations(reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: business } = useFetchBusiness();
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new CommunicationEndpoints();
        apiServices.isOnClient(window);
        
        const data = await apiServices.getConversations({
          business_code: testBusiness,
          role: "business",
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
  }, [business, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchBusinessConversations;