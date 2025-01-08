import { useEffect, useState } from "react";

import useFetchBusiness from "../useFetchBusiness";
import { testBusiness } from "@/lib/constants";
import InventoryEndpoints from "../../../inventory";
import { fixCatalogVariantImageUrl } from "@/services/dashboard/product";

const apiServices = new InventoryEndpoints();
apiServices.isOnClient(window);


function useFetchInventory(reRenderState?: any) {
  const [data, setData] = useState<EditableCatalog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { data: business } = useFetchBusiness();

  let code = business?.code
  code = testBusiness


  useEffect(() => {
    const fetchBusinessProducts = async() => {
      setIsLoading(true);
      try {
        if (!code) return;

        const data = await apiServices.getCatalogs({business: code});
        
        let _data  = fixCatalogVariantImageUrl(window.location.href,data)
        
        setData(_data);
        
      } catch (error) {
        setError(error);

      } finally {
        setIsLoading(false);
      }
    }
    fetchBusinessProducts()
  }, [reRenderState])


  return { data, isLoading, error };
}

export default useFetchInventory
