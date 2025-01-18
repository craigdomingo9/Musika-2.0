"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AgentEndpoints from '../../agents';
import { testUuid } from '@/lib/constants';



function useFetchAgent(config?: {}, reRenderState?: any) {
  const [data, setData] = useState<Agent>({} as Agent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const uuid = Cookies.get('uuid');
        const apiServices = new AgentEndpoints();
        apiServices.isOnClient(window);
        
        const data = await apiServices.getAgent(testUuid, config);

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

export default useFetchAgent;