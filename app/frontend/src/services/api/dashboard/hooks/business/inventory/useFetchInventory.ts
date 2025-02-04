import { useEffect, useState } from "react";
import InventoryEndpoints from "../../../inventory";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";
import { correctImageUrl } from "@/services/utils";


function transformData(data: EditableCatalog[]): EditableCatalog[] {
  return data.map(catalog => ({
    ...catalog,
    products: catalog.products
    .map(product => ({
      ...product,
      variants: product.variants
      .map(variant => ({
        ...variant,
        image: ({
          ...variant.image,
          image: correctImageUrl(
            variant.image.image, 
            window.location.href
          )
        })
      }))
    }))
  }))
}


function useFetchInventory(reRenderState?: any) {
  const [data, setData] = useState<EditableCatalog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const { data: user } = useUserProfile();
  const business = user.business_profile;

  let businessCode = business?.code

  
  useEffect(() => {
    const fetchBusinessProducts = async() => {
      setIsLoading(true);
      try {
        const apiServices = new InventoryEndpoints();
        apiServices.isOnClient(window);
        
        if (!businessCode) return;

        const data = await apiServices.getCatalogs({business: businessCode});
        let transformedData  = transformData(data);
        
        setData(transformedData);
        
      } catch (error) {
        setError(error);

      } finally {
        setIsLoading(false);
      }
    }
    fetchBusinessProducts()
  }, [user, reRenderState])


  return { data, isLoading, error };
}

export default useFetchInventory
