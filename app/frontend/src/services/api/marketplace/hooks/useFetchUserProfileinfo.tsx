import { useEffect, useState } from "react";
import ProfileEndpoints from "../profile";
import { correctImageUrl } from "@/services/utils";


function transformData(data: UserProfile): UserProfile {
  return ({
    ...data,
    profile_picture: correctImageUrl(
      data.profile_picture,
      window.location.href
    )
  })
}

function useFetchUserProfileInfo() {
  const [data, setData] = useState<UserProfile>({} as UserProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      try {
        
        const apiServices = new ProfileEndpoints();
        apiServices.isOnClient(window);
  
        const data = await apiServices.getUserProfile();
        const transformedData = transformData(data);

        setData(transformedData);
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])

  return { data, isLoading, error };

}

export default useFetchUserProfileInfo
