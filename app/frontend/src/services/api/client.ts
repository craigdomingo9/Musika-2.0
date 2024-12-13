import { API_CONFIG } from './config';
import Cookies from "js-cookie";


type paramsProps<T extends Record<string, any>> = T;

export class ApiClient {

  private baseURL: string | undefined = API_CONFIG.BASE_URL; 
  protected url: string = "";

  private options: RequestInit = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      // 'X-UUID': 'f4303fc0-cb09-4f6f-848c-9c1a8a911cd1',
    }
  };

  setRequestType(type: string, body?: any) {
    this.options.method = type;
    this.options.body = body;
  }

  
  isOnClient(window: Window) {
    const url = new URL(window.location.href)
    this.baseURL = url.origin + '/api';
    Cookies.set('uuid', 'f4303fc0-cb09-4f6f-848c-9c1a8a911cd1')
    this.getUUID()
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
      // console.log(this.options)
      const response = await fetch(this.url, this.options)
        .then(res => {
          // console.log(res)
          return res.json()
        });
      return await response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  public async getUUID() {
    let uuid = Cookies.get('uuid');
    // console.log("from cookies: ",uuid)

    if (!uuid) {
      try {
        this.constructUrl('/users/auth/expose-uuid/');

        const response = await fetch(this.url, this.options)
          .then(res => res.json())
          
        uuid = response.uuid; 
  
        if (uuid) {
          Cookies.set("uuid", uuid);
        }
      } catch (error) {
        console.error('Error fetching UUID:', error);
        // Handle the error, e.g., log, retry, or notify the user
      }
    }
  
    this.options.headers = {
      ...this.options.headers,
      "X-UUID": uuid,
    };

    return uuid
  }
}

