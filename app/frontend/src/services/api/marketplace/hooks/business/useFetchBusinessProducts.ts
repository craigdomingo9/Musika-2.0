import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductEndpoints } from "../../product";
import { fixProductImageUrl, splitVariants } from "@/services/marketplace/product";



function useFetchBusinessProducts() {
  const [data, setData] = useState<Catalog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { code } = useParams();


  useEffect(() => {
    const fetchBusinessProducts = async() => {
      setIsLoading(true);
      try {
        if (!code) return;

        const apiServices = new ProductEndpoints();
        apiServices.isOnClient(window);

        const data = await apiServices.getCatalogs({business: code});
        
        let catalogData: Catalog[] = data.map(catalog => ({
          ...catalog,
            products: fixProductImageUrl(window.location.href, splitVariants(catalog.products)),
        }));

        setData(catalogData);
        
      } catch (error) {
        setError(error);

      } finally {
        setIsLoading(false);
      }
    }
    fetchBusinessProducts()
  }, [])


  return { data, isLoading, error };
}

export default useFetchBusinessProducts
