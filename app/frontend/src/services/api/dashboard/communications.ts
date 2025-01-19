import { ApiClient } from "../client";



export default class CommunicationEndpoints extends ApiClient {
  constructor() {
    super()
  }

  getConversations(params?: Record<string, any>): Promise<Conversation[]> {
    const urlPath = '/communications/conversations/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getConversation(uuid?: string): Promise<Conversation> {
    const urlPath = `/communications/conversations/${uuid}/`;
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

  getMessages(params?: Record<string, any>): Promise<Message[]> {
    const urlPath = '/communications/messages/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  createConversation(body: any): Promise<GenericApiResponse<Conversation>> {
    const urlPath = `/communications/conversations/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  addParticipants(body: any): Promise<GenericApiResponse<Participant>> {
    const urlPath = `/communications/participants/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  addAdminsToConversation(uuid: any): Promise<GenericApiResponse<Participant>> {
    const urlPath = `/communications/conversations/${uuid}/add-admins/`;
    this.setRequestType("POST");
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }

  sendMessage(body: any): Promise<GenericApiResponse<Message>> {
    const urlPath = `/communications/messages/`;
    this.setRequestType("POST", body);
    this.constructUrl(urlPath);
    this.applyCredentials()
    
    return this.fulfillRequest();
  }
}

