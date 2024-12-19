import ApiClientForms from "../../client/forms";

export default class CredentialsEndpoints extends ApiClientForms {
  
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