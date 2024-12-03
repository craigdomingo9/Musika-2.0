import { ApiClient } from "../../client";



export class BusinessEndpoints extends ApiClient {

  constructor() {
    super();
  }
  /**
   * Fetches a list of businesses
   *
   * @returns A Promise that resolves to an array of businesses.
   */
  getBusinesses() {
    const urlPath = '/business/businesses/';
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  /**
   * Fetches a specific business by its business code.
   *
   * @param code - code of the business to fetch.
   * @returns A Promise that resolves to an array of categories.
   */
  getBusiness(code: string) {
    const urlPath = `/business/businesses/${code}/`;
    this.constructUrl(urlPath);
    
    return this.fulfillRequest();
  }

  /**
   * Fetches a specific business location.
   *
   * @param business - code of the business to fetch.
   * @returns A Promise that resolves to an array of categories.
   */
  getLocations(params: paramsProps<Record<string, any>>) {
    const urlPath = `/business/locations/`;
    this.constructUrl(urlPath, params);
    
    return this.fulfillRequest();
  }


}



