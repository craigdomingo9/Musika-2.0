import ApiClientForms from "../../client/forms";




export default class ProfileEndpoints extends ApiClientForms {
  
  constructor() {
    super()
  }


  getProfile(params: Record<string, any>): Promise<UserProfile[]> {
    const urlPath = '/users/accounts/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  updateProfile(body: FormData, id?: number) {
    const urlPath = `/users/accounts/${id}/`;
    this.applyCredentials();
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }


}

