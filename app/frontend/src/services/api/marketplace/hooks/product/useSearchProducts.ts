import { useEffect, useState } from "react";
import { ProductEndpoints } from "../../product";
import useSearchedProductsStore from "@/store/SearchedProducts";



type Props = {
  searchQuery: string,
}



function useSearchProducts(searchQuery: string) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const {setProducts} = useSearchedProductsStore();


  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        if (!searchQuery) return;

        const apiService = new ProductEndpoints();
        apiService.isOnClient(window);
        const data = await apiService.searchProducts({ query: searchQuery });
        setData(data);
        setProducts(data);
        
      } catch (error) {
        setError(error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return { data, isLoading, error };
}

export default useSearchProducts
