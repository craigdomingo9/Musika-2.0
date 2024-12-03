import { useQuery } from "react-query";
import { ApiService } from "./service";


export const useFeaturedProducts = () => {
  const apiService = new ApiService();
  return useQuery(['products'], () =>
    apiService.product.getFeaturedProducts()
  );
};


