import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import NotificationsEndpoints from "../../notifications";



function useFetchNotifications(config: {}, reRenderState?: any) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchNotifications = async() => {
      setIsLoading(true);
      try {
        
        const uuid = Cookies.get('uuid')
  
        const apiServices = new NotificationsEndpoints();
        apiServices.isOnClient(window);
        const data = await apiServices.getNotifications({
          "user_uuid": uuid,
          ...config
        })
  
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchNotifications();
  }, [reRenderState])


  return { data, isLoading, error };
}

export default useFetchNotifications
