"use client";
import { useState, useEffect } from 'react';
import { ProductEndpoints } from '../../product';



function useFetchCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  
  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const apiServices = new ProductEndpoints();
        apiServices.isOnClient(window);
  
        const data = await apiServices.getCategories();
        setData(
          data.filter(category => category.has_products)
        )
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();

  }, [])
  
  return { data, isLoading, error };
}

export default useFetchCategories
