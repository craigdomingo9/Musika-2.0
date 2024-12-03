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

  getProducts(params: paramsProps<Record<string, any>>): Promise<ApiResponse<Product[]>> {
    const urlPath = '/business/products/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  /**
   * Fetches a specific product by its ID.
   *
   * @param id - The ID of the product to fetch.
   * @returns A Promise that resolves to the fetched product.
   */
  getProduct(id: number): Promise<ApiResponse<Product[]>> {
    const urlPath = `/business/products/${id}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  /**
   * Searches for products based on a query string.
   *
   * @param query - The query string to search for.
   * @returns A Promise that resolves to an array of matching products.
   */
  searchProducts({ query }: paramsProps<Record<string, any>>): Promise<ApiResponse<Product[]>> {
    const urlPath = `/business/products/search/q=${query}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  /**
   * Fetches a list of product categories.
   *
   * @returns A Promise that resolves to an array of categories.
   */
  getCategories(): Promise<ApiResponse<Category[]>> {
    const urlPath = `/business/categories/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  /**
   * Fetches a list of product catalogs.
   *
   * @returns A Promise that resolves to an array of catalogs.
   */
  getCatalogs(): Promise<ApiResponse<Category[]>> {
    const urlPath = `/business/catalogs/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }
  /**
   * Fetches a specific catalog.
   *
   * @param id - The ID of the catalog to fetch.
   * @returns A Promise that resolves to the fetched catalog.
   */
  getCatalog(id: number): Promise<ApiResponse<Category[]>> {
    const urlPath = `/business/catalogs/${id}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

}