"use client";

import PageContainer from "@/components/marketplace/PageContainer";
import NotificationsEndpoints from "@/services/api/endpoints/marketplace/notifications";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



function page() {
  const apiServices = new NotificationsEndpoints();
  apiServices.isOnClient(window);

  const [notification, setNotification] = useState<Notification>()
  const params = useParams();

  
  const fetchNotification = async() => {
    const data = await apiServices.getNotification(params.id);
    
    setNotification(data);
  }
  const markAsRead = async() => {
    await apiServices.markNotificationAsRead(params.id);
  }

  useEffect(() => {
    fetchNotification()
    
    markAsRead()
  }, [])


  
  return (
    <PageContainer>
        <Link href={'/notifications'} className="text-opacity font-semibold underline">Notifications</Link>
        {notification && (
          <>
            <div className="mb-3 mt-5 font-semibold text-opacity">
              Sent at: {notification?.sent_at}
            </div>
            <div>
              <p className="text-opacity font-light text-sm">{notification?.message}</p>
            </div>
          </>
        )}
    </PageContainer>
  )
}

export default page