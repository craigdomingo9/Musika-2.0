"use client";
import { useState, useEffect } from 'react';
import { correctImageUrl } from '@/services/utils';
import RelationshipEndpoints from '../relationships';
import useDashboardConfigStore from '@/store/dashboard/DashboardConfig';
import useUserProfile from '../../marketplace/hooks/useUserProfile';
import { agentMode, businessMode } from '@/lib/dashboard/constants';

const apiServices = new RelationshipEndpoints();


function transformAgentData(data: Relationship[], baseUrl: string): Relationship[] {
  return data.filter((rel) => rel.agent.profile)
  .map((relationship) => ({
    ...relationship,
    agent: {
      ...relationship.agent,
      profile: {
        ...relationship.agent.profile,
        profile_picture: correctImageUrl(
          relationship.agent.profile.profile_picture,
          baseUrl
        ),
      },
    },
    business: {
      ...relationship.business,
      profile: {
        ...relationship.business.profile,
        logo: correctImageUrl(
          relationship.business.profile.logo, 
          baseUrl
        )
      }
    }
  }));
}



async function fetchActiveRelationships(user: any, isAgentMode: boolean, isBusinessMode: boolean) {
  if ((isBusinessMode && !user.business_profile) || (isAgentMode && !user.agent_profile)) {
    return;
  }
  apiServices.isOnClient(window);


  const rawData = await apiServices.getRelationships({
    business: isBusinessMode ? user.business_profile?.code : "",
    agent: isAgentMode ? user.agent_profile?.code : "",
    status: "active",
  });

  return transformAgentData(rawData, window.location.href);
}


function useFetchActiveRelationships(reRenderState?: any) {
  const [data, setData] = useState<Relationship[]>([]);
  const { data: user } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { config: {mode} } = useDashboardConfigStore();

  const isAgentMode = mode == agentMode();
  const isBusinessMode = mode == businessMode();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user) return;
        
        const transformedData = await fetchActiveRelationships(user, isAgentMode, isBusinessMode)
        if (transformedData) {
          setData(transformedData);
        }

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

export default useFetchActiveRelationships