"use client";
import { useState, useEffect } from 'react';
import CommunicationEndpoints from '../communications';



function useFetchConversations(config?: {}, reRenderState?: any) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const apiServices = new CommunicationEndpoints();
        apiServices.isOnClient(window);
        const data = await apiServices.getConversations(config);
        console.log(data)

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reRenderState]);

  return { data, isLoading, error };
}

export default useFetchConversations;