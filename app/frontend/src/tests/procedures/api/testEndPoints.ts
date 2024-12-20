import { ProductEndpoints } from "@/services/api/marketplace/product";

export default async function testEndPoints() {
  const apiService = new ProductEndpoints();
  apiService.isOnClient(window);

  console.log("testing...")

  // const data = await apiService.getProducts({
    // is_featured: "",
    // on_sale: false,
    // business: "",
    // catalog: "",
    // category: "",
    // page: 1,
    // page_size: 10,
  // })

  const data = await apiService.getCatalog(16)

  // const data = await apiService.searchProducts({
  //   query: "pl"
  // })

  console.log(data)
}
