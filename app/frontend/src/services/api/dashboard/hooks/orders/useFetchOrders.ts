"use client";
import { useState, useEffect } from 'react';
import OrderEndpoints from '../../orders';



function useFetchOrders(config: any, reRenderState?: any) {
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