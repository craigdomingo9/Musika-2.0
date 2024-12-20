"use client";
import NotificationList from "@/components/marketplace/Notification/NotificationList";
import PageContainer from "@/components/marketplace/PageContainer";
import useFetchNotifications from "@/services/api/marketplace/hooks/notifications/useFetchNotifications";



function Page() {
  const {data, isLoading, error} = useFetchNotifications()
  

  return (
    <PageContainer>
      <div className="font-semibold text-opacity">Notifications</div>
      <NotificationList notifications={data} />
    </PageContainer>
  )
}

export default Page
