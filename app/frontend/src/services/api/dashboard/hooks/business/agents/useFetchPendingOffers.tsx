"use client";
import { useState, useEffect } from 'react';
import { correctImageUrl } from '@/services/utils';
import RelationshipEndpoints from '../../../relationships';
import useUserProfile from '@/services/api/marketplace/hooks/useUserProfile';



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
  const { data: user } = useUserProfile();
  const business = user.business_profile;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new RelationshipEndpoints();
        apiServices.isOnClient(window);
        
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