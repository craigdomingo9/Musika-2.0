import { useEffect } from "react";
import { useNotificationAction, useNotificationMutation } from "./Notifications";
import NotificationsEndpoints from "@/services/api/marketplace/notifications";
import { completeEntityAction } from "@/types/dashboard/factory";


const apiServices = new NotificationsEndpoints();
apiServices.isOnClient(window);


function NotificationDrawerContent() {
  const { entities: { object: notification }, setEntities: setNotificationMutation } = useNotificationMutation();
  
  useEffect(() => {
    if (!notification || notification.is_read) return;

    const markAsRead = async() => {
      const response = await apiServices.markNotificationAsRead(notification.id);

      if (response.ok) {
        setNotificationMutation(
          completeEntityAction(notification)
        )
      }
    }
    markAsRead()
    
  }, [notification])


  return (
    <div className="grid [&>div>p]:text-center my-16">
      <div>
        <p className="font-semibold text-opacity text-lg mb-8">{notification?.topic}</p>
      </div>
      <div className="min-h-10 border text-sm">
        <p className="text-opacity py-4 px-1">{notification?.message}</p>
      </div>
    </div>
  )
}

export default NotificationDrawerContent