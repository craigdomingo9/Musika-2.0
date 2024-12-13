"use client";
import { ApiClient } from "@/services/api/client";


function Middleware() {
  const apiClient = new ApiClient();
  apiClient.isOnClient(window);
  return null
}

export default Middleware
