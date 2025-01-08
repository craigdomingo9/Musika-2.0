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
}


