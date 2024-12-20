"use client";
import useSearchProducts from "@/services/api/marketplace/hooks/product/useSearchProducts";
import Link from "next/link";


type Props = {
  searchQuery: string,
}



function SearchAutoComplete({searchQuery}: Props) {
  
  const { data: searchResults } = useSearchProducts(searchQuery);

  return (
    <>
    {searchQuery && (
      <div className="absolute flex flex-col z-50 bg-white w-[16.5rem] sm:w-[19rem] px-4 mt-3 min-h-96 shadow-xl rounded-lg">
        {searchResults.length > 0 ? searchResults.map((result) => (
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
        )) : (
          <div className="min-h-full grid items-center">
            <p className="m-auto pt-4">Nothing found</p>
          </div>
        )}
      </div>
    )}
    </>
    
  )
}

export default SearchAutoComplete