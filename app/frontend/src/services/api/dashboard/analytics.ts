import { ApiClient } from "../client";



export default class AnalyticsEndpoints extends ApiClient {
  constructor() {
    super()
  }

  getLeadSources(params?: Record<string, any>): Promise<LeadSource[]> {
    const urlPath = `/analytics/lead-sources/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  
}