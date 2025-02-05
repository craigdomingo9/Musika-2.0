import { ApiClient } from "../client";

export default class CredentialsEndpoints extends ApiClient {
  
  constructor() {
    super()
  }

  updateCredentials(body: any) {
    const urlPath = '/users/auth/password/change/';
    this.setRequestType("POST", body)
    this.applyCredentials();
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  login(body: any): Promise<GenericApiResponse<{token: string, uuid: string}>> {
    const urlPath = '/users/auth/login/';
    this.setRequestType("POST", body)
    this.applyCredentials();
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

}