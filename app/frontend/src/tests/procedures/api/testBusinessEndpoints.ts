import { BusinessEndpoints } from "@/services/api/endpoints/marketplace/business";

export default async function testBusinessEndpoints() {
  const apiService = new BusinessEndpoints();
  apiService.isOnClient();

  console.log("testing...")

  const data = await apiService.getLocations({business: "MXPCDCCT"})

  console.log(data)
}
