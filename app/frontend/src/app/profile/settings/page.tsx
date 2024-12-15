"use client";
import PageContainer from "@/components/marketplace/PageContainer";
import ProfileForm from "@/components/marketplace/Profile/Settings/ProfileForm";
import { useEffect } from "react";


function page() {

  useEffect(() => {
    const fetchProfile = async() => {
      
    }
    fetchProfile()
  }, [])

  return (
    <PageContainer className="grid">
      <ProfileForm />
    </PageContainer>
  )
}

export default page
