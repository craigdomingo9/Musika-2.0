import { ApiClient } from "../../client";


export class ProductEndpoints extends ApiClient {
  
  constructor() {
    super();
  }

  
  /**
   * Fetches a list of products based on the given parameters.
   *
   * Filters
   * @param is_featured: boolean - return featured products
   * @param on_sale: boolean - return products on sale
   * @param business: string - filter by business code
   * @param catalog: string - filter by catalog id
   * @param category: string - filter by category id
   * @param page: number - filter by page
   * @param page_size: number - size of page
   * @returns A Promise that resolves to an array of products.
   */
  getProducts(params: paramsProps<Record<string, any>>): Promise<PaginatedData<Product[]>> {
    const urlPath = '/business/products/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getProduct(id: number): Promise<Product> {
    const urlPath = `/business/products/${id}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  searchProducts({ query }: paramsProps<Record<string, any>>): Promise<ApiResponse<Product[]>> {
    const urlPath = `/business/products/search/q=${query}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  getCategories(): Promise<ApiResponse<Category[]>> {
    const urlPath = `/business/categories/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  getCatalogs(params: paramsProps<Record<string, any>>): Promise<Catalog[]> {
    const urlPath = `/business/catalogs/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getCatalog(id: number): Promise<ApiResponse<Category[]>> {
    const urlPath = `/business/catalogs/${id}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

}