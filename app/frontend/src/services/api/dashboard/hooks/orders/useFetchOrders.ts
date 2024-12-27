"use client";
import { useState, useEffect } from 'react';
import OrderEndpoints from '../../orders';
import useFetchAgent from '../agent/useFetchAgent';
import useFetchBusiness from '../business/useFetchBusiness';
import useDashboardConfigStore from '@/store/dashboard/DashboardConfig';
import { agentMode, businessMode } from '@/lib/dashboard/constants';



function useFetchOrders(config: any) {
  const { config: settings } = useDashboardConfigStore();
  const { data: agent } = useFetchAgent();
  const { data: business} = useFetchBusiness();
  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new OrderEndpoints();
        apiServices.isOnClient(window);
        
        if (settings.mode == agentMode()) config.agent = agent.code
        if (settings.mode == businessMode()) config.business = business?.code
        
        const data = await apiServices.getOrders(config);

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [agent, business]);

  return { data, isLoading, error };
}

export default useFetchOrders;