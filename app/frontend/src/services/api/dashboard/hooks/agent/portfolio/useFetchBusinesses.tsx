"use client";
import { useState, useEffect } from 'react';
import { correctImageUrl } from '@/services/utils';
import useFetchAgent from '../useFetchAgent';
import { BusinessEndpoints } from '@/services/api/marketplace/business';


const apiServices = new BusinessEndpoints();
apiServices.isOnClient(window);

function transformData(data: Business[], baseUrl: string): Business[] {
  return data
  .filter((business) => business.profile.logo)
  .map((business) => ({
    ...business,
    profile: {
      ...business.profile,
      logo: correctImageUrl(business.profile.logo, baseUrl)
    }
  }))
}


function useFetchBusinesses(reRenderState?: any) {
  const [data, setData] = useState<Business[]>([]);
  const { data: agent } = useFetchAgent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!agent) return;

        const rawData = await apiServices.getBusinesses({
          exclude_agent_code: agent.code,
        });
        const transformedData = transformData(rawData, window.location.href)
        setData(transformedData);
        
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

export default useFetchBusinesses