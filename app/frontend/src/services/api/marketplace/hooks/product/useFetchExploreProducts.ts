import { ProductEndpoints } from "@/services/api/marketplace/product";
import usePageConfigStore from "@/store/PageConfigStore"
import { useEffect, useState } from "react";
import { splitVariants } from "@/services/marketplace/product";
import { correctImageUrl } from "@/services/utils";



function useFetchExploreProducts() {
  const [data, setData] = useState<StandardProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const {config} = usePageConfigStore();

  useEffect(() => {

    const fetchProducts = async() => {
      setIsLoading(true);
      try {
        const apiServices = new ProductEndpoints();
        apiServices.isOnClient(window);

        const data = await apiServices.getProducts({...config, page_size: 1000});

        let products = splitVariants(data.results, config)

        products = products.map(product => ({
          ...product,
          image: {
            ...product.image,
            image: correctImageUrl(
              product.image.image,
              window.location.href
            )
          }
        }));

        setData(products)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }

    }
    fetchProducts();
  }, [config])

  
  return { data, isLoading, error };
}

export default useFetchExploreProducts
