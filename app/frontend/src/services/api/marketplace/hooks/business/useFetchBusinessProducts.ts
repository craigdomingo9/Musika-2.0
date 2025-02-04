import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductEndpoints } from "../../product";
import { splitVariants } from "@/services/marketplace/product";
import { correctImageUrl } from "@/services/utils";



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
        
        let catalogData: Catalog[] = data
        .filter(catalog => catalog.products.length > 0)
        .map(catalog => ({
            ...catalog,
            products: splitVariants(catalog.products)
            .map((product: StandardProduct) => ({
              ...product,
              image: {
                ...product.image,
                image: correctImageUrl(
                  product.image.image,
                  window.location.href
                )
              }
            })),
          })
        );

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
