"use client";
import { useState, useEffect } from 'react';
import useFetchAgent from '../agent/useFetchAgent';
import useFetchBusiness from '../business/useFetchBusiness';
import useDashboardConfigStore from '@/store/dashboard/DashboardConfig';
import { agentMode, businessMode } from '@/lib/dashboard/constants';
import OrderEndpoints from '../../orders';



function useFetchOrders(config: any, reRenderState?: any) {
  const { config: settings } = useDashboardConfigStore();
  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiServices = new OrderEndpoints();
        apiServices.isOnClient(window);

        const data = await apiServices.getOrders(config);

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

export default useFetchOrders;