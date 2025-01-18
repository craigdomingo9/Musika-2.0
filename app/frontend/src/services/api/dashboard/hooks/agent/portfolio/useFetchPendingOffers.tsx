"use client";
import { useState, useEffect } from 'react';
import { correctImageUrl } from '@/services/utils';
import RelationshipEndpoints from '../../../relationships';
import useFetchAgent from '../useFetchAgent';



function transformAgentData(data: BusinessOffer[], baseUrl: string): BusinessOffer[] {
  return data.filter((offer) => offer.agent.profile && offer.business.profile)
  .map((offer) => ({
    ...offer,
    business: {
      ...offer.business,
      profile: {
        ...offer.business.profile,
        logo: correctImageUrl(
          offer.business.profile.logo,
          baseUrl
        ),
      },
    },
  }));
}

function useFetchPendingOffers(reRenderState?: any) {
  const [data, setData] = useState<BusinessOffer[]>([]);
  const { data: agent } = useFetchAgent();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new RelationshipEndpoints();
        apiServices.isOnClient(window);
        
        if (!agent.code) return;

        const rawData = await apiServices.getPendingOffers({
          agent: agent.code,
          status: "pending",
        });
        const transformedData = transformAgentData(rawData, window.location.href); 
        
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

export default useFetchPendingOffers;