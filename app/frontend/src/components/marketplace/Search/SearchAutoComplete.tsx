"use client";
import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product";
import Link from "next/link";
import { useEffect, useState } from "react";


type Props = {
  searchQuery: string | undefined,
}



function SearchAutoComplete({searchQuery}: Props) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) return;

      const apiService = new ProductEndpoints();
      apiService.isOnClient();
      const data = await apiService.searchProducts({ query: searchQuery });
      setSearchResults(data);
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <>
    {searchQuery && (
      <div className="absolute flex flex-col bg-white w-[19rem] px-4 mt-3 min-h-96 shadow-lg">
        {searchResults.map((result) => (
          <Link href={{
            pathname: "/product",
            query: {
              id: result.id,
            }
          }} 
          key={result.uuid}
          className="h-10">
            {result.name}
          </Link>
        ))}
      </div>
    )}
    </>
    
  )
}

export default SearchAutoComplete