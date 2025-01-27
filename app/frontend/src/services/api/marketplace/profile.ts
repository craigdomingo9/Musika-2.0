import { ApiClient } from "../client";




export default class ProfileEndpoints extends ApiClient {
  
  constructor() {
    super()
  }


  getProfile(params: Record<string, any>): Promise<UserProfile[]> {
    const urlPath = '/users/accounts/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getUserProfile(): Promise<UserProfile> {
    const urlPath = '/users/auth/expose-account/';
    this.constructUrl(urlPath);
    this.applyCredentials();

    return this.fulfillRequest();
  }

  updateProfile(body: any, id?: number): Promise<GenericApiResponse<UserProfile>> {
    const urlPath = `/users/accounts/${id}/`;
    this.applyCredentials();
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  updateBusinessProfile(body: any, id?: number): Promise<GenericApiResponse<BusinessProfile>> {
    const urlPath = `/business/profiles/${id}/`;
    this.applyCredentials();
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  updateAgentProfile(body: any, userUUID?: any): Promise<GenericApiResponse<AgentProfile>> {
    const urlPath = `/agents/agents/${userUUID}/`;
    this.applyCredentials();
    this.setRequestType("PUT", body);
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

}

