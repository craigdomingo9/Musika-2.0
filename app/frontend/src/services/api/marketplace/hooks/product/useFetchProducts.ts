import { ProductEndpoints } from '../../product';
import { splitVariants } from '@/services/marketplace/product';

async function useFetchProducts(config?: {}) {
  // fetch the products
  const apiService = new ProductEndpoints();

  const data = await apiService.getProducts({
    ...config,
    page_size: 10,
  })

  // resolve the products
  const products = splitVariants(data.results, config);

  return products
}

export default useFetchProducts
