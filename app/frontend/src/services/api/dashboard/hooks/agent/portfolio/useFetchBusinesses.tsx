"use client";
import { useState, useEffect } from 'react';
import { correctImageUrl } from '@/services/utils';
import { BusinessEndpoints } from '@/services/api/marketplace/business';
import useUserProfile from '@/services/api/marketplace/hooks/useUserProfile';


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
  const { data: user } = useUserProfile();
  const [data, setData] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new BusinessEndpoints();
        apiServices.isOnClient(window);
        
        if (!user?.agent_profile) return;

        const rawData = await apiServices.getBusinesses({
          exclude_agent_code: user.agent_profile.code,
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
  }, [user, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchBusinesses