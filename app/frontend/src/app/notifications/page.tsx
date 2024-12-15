"use client";
import NotificationList from "@/components/marketplace/Notification/NotificationList";
import PageContainer from "@/components/marketplace/PageContainer";
import NotificationsEndpoints from "@/services/api/endpoints/marketplace/notifications"
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async() => {
      const uuid = Cookies.get('uuid')

      const apiServices = new NotificationsEndpoints();
      apiServices.isOnClient(window);
      const data = await apiServices.getNotifications({
        "user_uuid": uuid,
      })

      setNotifications(data);

    }
    fetchNotifications();
  }, [])
  

  return (
    <PageContainer>
      <div className="font-semibold text-opacity">Notifications</div>
      <NotificationList notifications={notifications} />
    </PageContainer>
  )
}

export default Page
