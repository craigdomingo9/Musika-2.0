"use client";
import { cn } from "@/lib/utils";
import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product"
import usePageConfigStore from "@/store/PageConfigStore";
import { useEffect, useState } from "react";




function Categories() {
  const {config, setConfig} = usePageConfigStore();
  const [categories, setCategories] = useState<Category[]>([]);
  

  useEffect(() => {
    const fetchCategories = async() => {
      const apiServices = new ProductEndpoints();
      apiServices.isOnClient(window);

      const data = await apiServices.getCategories();
      setCategories(
        data.filter(category => category.has_products)
      )
    }
    fetchCategories();

    console.log(config)
  }, [])

  const setCategory = (category: string) => {
    setConfig({...config, "category": category})
  }


  return (
    <div className="flex overflow-x-scroll my-2">

      <div className={cn("category-chip", !config.category && "active")} onClick={() => setCategory("")}>All</div>

      {categories.map(category => (
        <div
        key={category.id} 
        onClick={() => setCategory(category.name)}
        className={cn("category-chip", config.category==category.name && "active")}>
          {category.name}
        </div>
      ))}

    </div>
  )
}

export default Categories
