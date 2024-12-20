import { ApiClient } from "../client";

export default class CredentialsEndpoints extends ApiClient {
  
  constructor() {
    super()
  }

  updateCredentials(body: FormData) {
    const urlPath = '/users/auth/password/change/';
    this.setRequestType("POST", body)
    this.applyCredentials();
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

}