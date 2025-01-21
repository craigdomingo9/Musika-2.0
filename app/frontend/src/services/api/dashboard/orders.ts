import { ApiClient } from "../client";



export default class OrderEndpoints extends ApiClient {
  constructor() {
    super()
  }

  getOrders(params?: Record<string, any>): Promise<Order[]> {
    const urlPath = '/orders/orders/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  
  fulfillOrder(body: any, id: number): Promise<GenericApiResponse<Order>> {
    const urlPath = `/orders/orders/${id}/fulfill-order/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
}


