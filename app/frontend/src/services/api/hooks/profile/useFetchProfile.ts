"use client";
import { useState, useEffect } from 'react';
import ProfileEndpoints from '../../endpoints/marketplace/profile';
import Cookies from 'js-cookie';


function useFetchProfile() {
  const [data, setData] = useState<UserProfile>({} as UserProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const uuid = Cookies.get('uuid');
        const apiServices = new ProfileEndpoints();
        apiServices.isOnClient(window);
        
        const data = await apiServices.getProfile({
          user_uuid: uuid,
        });

        setData(data[0]);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

export default useFetchProfile;