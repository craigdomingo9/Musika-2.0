
interface result {
    count: number,
    next: string | null,
    results: Product[]
}

async function getFeaturedProducts(page: number, isClient: boolean): Promise<result> {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (isClient) {apiUrl = process.env.NEXT_PUBLIC_API_CLIENT_URL};

    const url = `${apiUrl}business/products/?is_featured=true&page=${page}&page_size=10`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    
    return response.json();
}   

export default getFeaturedProducts