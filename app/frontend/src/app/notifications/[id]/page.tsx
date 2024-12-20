"use client";
import PageContainer from "@/components/marketplace/PageContainer";
import useFetchNotification from "@/services/api/marketplace/hooks/notifications/useFetchNotification";
import Link from "next/link";
import { useEffect } from "react";



function page() {

  const {data, error, isLoading, markAsRead} = useFetchNotification();
  
  useEffect(() => {
    
    markAsRead()
  }, [])


  
  return (
    <PageContainer>
        <Link href={'/notifications'} className="text-opacity font-semibold underline">Notifications</Link>
        {data && (
          <>
            <div className="mb-3 mt-5 font-semibold text-opacity">
              Sent at: {data.sent_at}
            </div>
            <div>
              <p className="text-opacity font-light text-sm">{data.message}</p>
            </div>
          </>
        )}
    </PageContainer>
  )
}

export default page