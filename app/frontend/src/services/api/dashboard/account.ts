import { ApiClient } from "../client";



export default class AccountEndpoints extends ApiClient {
  constructor() {
    super()
  }

  getUser(uuid: string, params?: Record<string, any>): Promise<UserProfile> {
    const urlPath = `/users/accounts/${uuid}`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }




}
