import { testUuid } from '@/lib/constants';
import { API_CONFIG } from './config';
import Cookies from "js-cookie";


type paramsProps<T extends Record<string, any>> = T;

export class ApiClient {

  private baseURL: string | undefined = API_CONFIG.BASE_URL; 
  protected url: string = "";

  protected options: RequestInit = {
    method: "GET",
    headers: {
      'Accept': `*/*`,
    }
  }

  protected setRequestType(type: string, body?: any) {
    this.options.method = type;
    if (body) this.options.body = body;
  }


  isOnClient(window: Window, skipGetUUId?: boolean) {
    const url = new URL(window.location.href)
    this.baseURL = url.origin + '/api';

    if (skipGetUUId) return;
    Cookies.set('uuid', testUuid)
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

  protected async handleResponse(res: Response) {
    return { 
      data: res.json(), 
      status: res.status, 
      ok: res.ok 
    };
  }

  protected async fulfillRequest() {
    try {
      const response = await fetch(this.url, this.options);

      // Handle different response types based on HTTP method
      if (this.options.method === 'GET') {
        return await response.json(); 
      } else {
        return await this.handleResponse(response); 
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
}

  public async getUUID() {
    let uuid = Cookies.get('uuid');

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
      }
    }
  
    this.options.headers = {
      ...this.options.headers,
      "X-UUID": uuid,
    };

    return uuid
  }

  protected applyCredentials() {
    let csrftoken = Cookies.get('csrftoken');

    this.options.credentials = 'include';
    this.options.headers = {
      ...this.options.headers,
      'X-CSRFToken': csrftoken
    }
  }

  protected applyCache(t: number) {
    this.options.next = {
      revalidate: t,
    }
  }
}

