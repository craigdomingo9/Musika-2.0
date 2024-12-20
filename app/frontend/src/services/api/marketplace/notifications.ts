import { ApiClient } from "../client";

export default class NotificationsEndpoints extends ApiClient {
  
  constructor() {
    super();
  }

  getNotifications(params: paramsProps<Record<string, any>>): Promise<Notification[]> {
    const urlPath = '/notifications/';
    this.constructUrl(urlPath, params);

    return this.fulfillRequest();
  }

  getNotification(id: any): Promise<Notification> {
    const urlPath = `/notifications/${id}/`;
    this.setRequestType("GET");
    this.constructUrl(urlPath);
    
    return this.fulfillRequest();
  }
  
  markNotificationAsRead(id: any) {
    const urlPath = `/notifications/${id}/mark-as-read/`;
    this.setRequestType("POST");
    this.applyCredentials()
    this.constructUrl(urlPath);

    return this.fulfillRequest();
  }

}