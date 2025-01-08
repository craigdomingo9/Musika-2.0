import { ApiClient } from "../client";



export default class RelationshipEndpoints extends ApiClient {
  constructor() {
    super()
  }

  getPendingOffers(params?: Record<string, any>): Promise<BusinessOffer[]> {
    const urlPath = `/relationships/business-offers/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  cancelPendingOffer(id?: number) {
    const urlPath = `/relationships/business-offers/${id}/cancel-offer/`;
    this.setRequestType("POST");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  terminateRelationship(id?: number) {
    const urlPath = `/relationships/business-agent-relationships/${id}/revoke-relationship/`;
    this.setRequestType("POST");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  makeBusinessOffer(body: FormData): Promise<GenericApiResponse<BusinessOffer>> {
    const urlPath = `/relationships/business-offers/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  acceptApplication(id: number): Promise<GenericApiResponse<AgentApplication>> {
    const urlPath = `/relationships/agent-applications/${id}/approve-application/`;
    this.setRequestType("POST");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  rejectApplication(id: number): Promise<GenericApiResponse<AgentApplication>> {
    const urlPath = `/relationships/agent-applications/${id}/reject-application/`;
    this.setRequestType("POST");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
}


