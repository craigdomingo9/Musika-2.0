"use client";
import { useState, useEffect } from 'react';
import AgentEndpoints from '../../agent';
import Cookies from 'js-cookie';



function useFetchAgent(config?: {}) {
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
        
        const data = await apiServices.getAgent(uuid, config);

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

export default useFetchAgent;