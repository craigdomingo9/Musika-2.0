import { ApiClient } from "../client";
import Cookies from "js-cookie";


export default class ApiClientForms extends ApiClient {
  constructor() {
    super()
  }

  
  applyCredentials() {
    let csrftoken = Cookies.get('csrftoken');

    this.options.credentials = 'include';
    this.options.headers = {
      ...this.options.headers,
      'X-CSRFToken': csrftoken
    }
  }


}