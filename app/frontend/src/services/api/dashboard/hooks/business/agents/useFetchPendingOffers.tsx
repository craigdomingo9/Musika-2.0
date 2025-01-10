"use client";
import { useState, useEffect } from 'react';
import useFetchBusiness from '../useFetchBusiness';
import { correctImageUrl } from '@/services/utils';
import RelationshipEndpoints from '../../../relationships';


const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function transformAgentData(data: BusinessOffer[], baseUrl: string): BusinessOffer[] {
  return data.filter((offer) => offer.agent.profile)
  .map((offer) => ({
    ...offer,
    agent: {
      ...offer.agent,
      profile: {
        ...offer.agent.profile,
        profile_picture: correctImageUrl(
          offer.agent.profile.profile_picture,
          baseUrl
        ),
      },
    },
  }));
}

function useFetchPendingOffers(reRenderState: any) {
  const [data, setData] = useState<BusinessOffer[]>([]);
  const { data: business } = useFetchBusiness();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!business?.code) return;

        const rawData = await apiServices.getPendingOffers({
          business: business?.code,
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
  }, [business, reRenderState]);

  return { data, isLoading, error };
}

export default useFetchPendingOffers;