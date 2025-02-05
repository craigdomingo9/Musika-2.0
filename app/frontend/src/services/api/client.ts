import { API_CONFIG } from './config';
import { getCookie, setCookie } from '../cookies';
import crypto from 'crypto';

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
    let response = {
      data: {},
      status: res.status,
      ok: res.ok,
    }
    
    if (this.options.method == "DELETE") {
      response.data = {} as any
      return response
    }
    response.data = res.json()
    return response
  }

  protected async fulfillRequest() {
    try {
      const response = await fetch(this.url, this.options);

      if (this.options.method === 'GET') {
        return await response.json(); 
      } else {
        return await this.handleResponse(response); 
      }

    } catch (error) {
      console.log('Error fetching data:', error);
      throw error; 
    }
  }

  public async getUUID() {
    let uuid = getCookie('uuid');

    if (!uuid) {
      try {
        this.constructUrl('/users/auth/expose-account/');
        const response = await fetch(this.url, this.options)
          .then(res => res.json())
          
        uuid = response.uuid;

        if (uuid) {
          setCookie("uuid", uuid);
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

  applyToken() {
    const token = getCookie("token");

    this.options.headers = {
      ...this.options.headers,
      'Authorization': 'Token ' + token
    }
  }

  protected applyCredentials() {
    let csrftoken = getCookie('csrftoken');

    if (!csrftoken) {
      csrftoken = crypto.randomBytes(32).toString('hex');
      setCookie('csrftoken', csrftoken);
    }

    this.options.credentials = 'include';
    this.options.headers = {
      ...this.options.headers,
      'X-CSRFToken': csrftoken,
    }

    this.applyToken()
  }

  public applyCache(t: number) {
    this.options.next = {
      revalidate: t,
    }
    this.options.cache = 'no-store'
    this.options.headers = {
      ...this.options.headers,
      'Cache-Control': `max-age=${t}`
    }
  }
}

