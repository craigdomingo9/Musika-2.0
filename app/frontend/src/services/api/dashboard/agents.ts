import { ApiClient } from "../client";



export default class AgentEndpoints extends ApiClient {
  constructor() {
    super()
  }

  getAgent(uuid: string, params?: Record<string, any>): Promise<Agent> {
    const urlPath = `/agents/agents/${uuid}`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getApplications(params?: Record<string, any>): Promise<AgentApplication[]> {
    const urlPath = `/relationships/agent-applications/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getAgents(params?: Record<string, any>): Promise<Agent[]> {
    const urlPath = `/agents/agents/`;
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }


}


