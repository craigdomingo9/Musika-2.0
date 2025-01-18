import { useEffect, useState } from 'react'
import CommunicationEndpoints from '../communications';

function transformData(data: Message[]) {
  return data
}


function useFetchMessages(conversation_uuid: string, reRenderState?: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Message[]>([])
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true);
      try {
        const apiServices = new CommunicationEndpoints();
        apiServices.isOnClient(window);
        
        const rawData = await apiServices.getMessages({conversation: conversation_uuid});
        const transformedData = transformData(rawData);


        setData(transformedData);
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [reRenderState])

  return { data, isLoading, error };
}

export default useFetchMessages