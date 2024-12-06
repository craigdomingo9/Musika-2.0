import { API_CONFIG } from './config';

type paramsProps<T extends Record<string, any>> = T;

export class ApiClient {

  private baseURL: string | undefined = API_CONFIG.BASE_URL; 
  protected url: string = "";

  private options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'X-UUID': '4cc3793d-d522-4175-945c-b76a49f268eb',
    }
  };
  
  isOnClient(window: Window) {
    this.baseURL = window.location.href + "api";
  }
  
  protected constructUrl<T extends Record<string, any>>(urlPath: string,params?: paramsProps<T>) {
    if (!urlPath) return '';

    this.url = this.baseURL + urlPath;

    if (params) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value); 
      }
      this.url += `?${queryParams.toString()}`;
    }
  }
  
  protected async fulfillRequest() {
    try {
      // console.log(this.url)
      const response = await fetch(this.url, this.options);
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }



  
}
