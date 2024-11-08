"use client";
import { ChangeEvent, useState } from "react"
import { Input } from "../ui/input"
import searchProducts from "@/utils/Search/searchProducts";
import SearchAutoComplete from "./SearchAutoComplete";

function SearchInput() {
    const [productData, setProductData] = useState<SearchResult[]>([])
    const [showAutoComplete, setshowAutoComplete] = useState<boolean>(false)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value

        if (searchTerm) {
            search(searchTerm);
            setshowAutoComplete(true);
        } else {
            setshowAutoComplete(false);
        }
    }

    const search = async (query: string) => {
        setProductData(await searchProducts(query))
    }

  return (
    <div className="grid">

        <Input type="text" className="text-sm rounded-2xl" onChange={onChange} id="search" placeholder="Search..." />
        
        {showAutoComplete && <SearchAutoComplete data={productData} />}
        
    </div>
  )
}

export default SearchInput
