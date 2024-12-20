import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NotificationsEndpoints from "../../notifications";



function useFetchNotification() {
  const params = useParams();
  const [data, setData] = useState<Notification>({} as Notification);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);



  useEffect(() => {
    const fetchNotification = async() => {
      setIsLoading(true);
      try {
        const apiServices = new NotificationsEndpoints();
        apiServices.isOnClient(window);
        const data = await apiServices.getNotification(params.id);
  
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchNotification();
  }, [])

  const markAsRead = async() => {
    const apiServices = new NotificationsEndpoints();
    apiServices.isOnClient(window);
    await apiServices.markNotificationAsRead(params.id);
  }


  return { data, isLoading, error, markAsRead };
}

export default useFetchNotification
