"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../../../communications';
import useFetchBusiness from '../useFetchBusiness';
import { testBusiness } from '@/lib/constants';


const apiServices = new CommunicationEndpoints();
apiServices.isOnClient(window);


function useFetchBusinessConversations(reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: business } = useFetchBusiness();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const data = await apiServices.getConversations({
          business_code: testBusiness,
          role: "business"
        });

        setData(data);
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

export default useFetchBusinessConversations;