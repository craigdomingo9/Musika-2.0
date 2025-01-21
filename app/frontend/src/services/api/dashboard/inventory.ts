import { ApiClient } from "../client";



export default class InventoryEndpoints extends ApiClient {
  constructor() {
    super()
  }


  getCatalogs(params: paramsProps<Record<string, any>>): Promise<EditableCatalog[]> {
    const urlPath = `/business/catalogs/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getProducts(params: paramsProps<Record<string, any>>): Promise<PaginatedData<Product[]>> {
    const urlPath = `/business/products/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getVariants(params: paramsProps<Record<string, any>>): Promise<ProductVariant[]> {
    const urlPath = `/business/variants/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  createCatalog(body: FormData): Promise<GenericApiResponse<Catalog>> {
    const urlPath = `/business/catalogs/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  updateCatalog(body: FormData, id?: number) {
    const urlPath = `/business/catalogs/${id}/`;
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  deleteCatalog(id?: number) {
    const urlPath = `/business/catalogs/${id}/`;
    this.setRequestType("DELETE");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
  
  
  createProduct(body: FormData): Promise<Product[]> {
    const urlPath = `/business/products/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
  
  updateProduct(body: FormData, id?: number) {
    const urlPath = `/business/products/${id}/`;
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  deleteProduct(id?: number) {
    const urlPath = `/business/products/${id}/`;
    this.setRequestType("DELETE");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
  
  createVariant(body: FormData) {
    const urlPath = `/business/variants/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
  
  updateVariant(body: FormData, id?: number) {
    const urlPath = `/business/variants/${id}/`;
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  deleteVariant(id?: number) {
    const urlPath = `/business/variants/${id}/`;
    this.setRequestType("DELETE");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  postVariantImage(body: FormData, mode: string) {
    const urlPath = `/business/product-images` + (mode == "update" ? `/${body.get("id")}/`: "/");
    this.setRequestType(mode == "create" ? "POST" : "PUT", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  createAttribute(body: FormData) {
    const urlPath = `/business/attributes/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
  
  updateAttribute(body: FormData, id?: number) {
    const urlPath = `/business/attributes/${id}/`;
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }


}
