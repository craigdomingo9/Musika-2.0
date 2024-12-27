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
}


