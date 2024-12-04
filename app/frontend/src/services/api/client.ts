import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';

type paramsProps<T extends Record<string, any>> = T;

export class ApiClient {

  // set the default baseUrl to server-side API url
  private baseURL: string | undefined = API_CONFIG.BASE_URL; 
  
  protected url: string = "";
  // Request options
  private options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'X-UUID': '4cc3793d-d522-4175-945c-b76a49f268eb',
    }
  };
  
  isOnClient() {
    // if request is to be performed on the client, adjust the base url
    this.baseURL = API_CONFIG.CLIENT_URL;
  }
  
  protected constructUrl<T extends Record<string, any>>(urlPath: string,params?: paramsProps<T>) {
    if (!urlPath) return '';

    // combine the baseUrl with the urlPath
    this.url = this.baseURL + urlPath;

    // compile the url params and add them to the url
    if (params) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value); 
      }
      this.url += `?${queryParams.toString()}`;
    }
  }
  
  protected async fulfillRequest(): Promise<ApiResponse<Product[]>> {
    try {
      // Perform a fetch request and return the response
      // console.log(this.url)
      const response = await fetch(this.url, this.options);
      return await response.json();
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }



  
}
