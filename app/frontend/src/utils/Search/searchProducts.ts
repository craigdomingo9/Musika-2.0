// lib/searchProducts.ts
export default async function searchProducts(query: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    const url = `${apiUrl}business/products/search/q=${encodeURIComponent(query)}/`;
    console.log(url)
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return the data for further processing
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  }