import { useEffect, useState } from "react";
import NotificationsEndpoints from "../../notifications";
import useUserProfile from "../useUserProfile";



function useFetchNotifications(config: {}, reRenderState?: any) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { data: user } = useUserProfile();

  useEffect(() => {
    const fetchNotifications = async() => {
      setIsLoading(true);
      try {
        if (!user.uuid) return;

        const apiServices = new NotificationsEndpoints();
        apiServices.isOnClient(window);
        
        const data = await apiServices.getNotifications({
          "user_uuid": user.uuid,
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
  }, [user, reRenderState])


  return { data, isLoading, error };
}

export default useFetchNotifications
