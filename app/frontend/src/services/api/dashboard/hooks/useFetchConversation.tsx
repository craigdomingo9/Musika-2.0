import React, { useEffect, useState } from 'react'
import CommunicationEndpoints from '../communications';

const apiServices = new CommunicationEndpoints();
apiServices.isOnClient(window);

function transformData(data: Conversation) {
  return data
}


function useFetchConversation(conversation_uuid: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Conversation>({} as Conversation)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      try {
        const rawData = await apiServices.getConversation(conversation_uuid);
        const transformedData = transformData(rawData);


        setData(transformedData);
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [])

  return { data, isLoading, error };
}

export default useFetchConversation