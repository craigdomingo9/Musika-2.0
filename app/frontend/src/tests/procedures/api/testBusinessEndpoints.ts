import { BusinessEndpoints } from "@/services/api/marketplace/business";

export default async function testBusinessEndpoints() {
  const apiService = new BusinessEndpoints();
  apiService.isOnClient(window);

  console.log("testing...")

  const data = await apiService.getLocations({business: "MXPCDCCT"})

  console.log(data)
}
