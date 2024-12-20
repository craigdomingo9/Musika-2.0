"use client";
import { cn } from "@/lib/utils";
import useFetchCategories from "@/services/api/marketplace/hooks/categories/useFetchCategories";
import usePageConfigStore from "@/store/PageConfigStore";




function Categories() {
  const {config, setConfig} = usePageConfigStore();
  const {data, isLoading, error} = useFetchCategories();


  const setCategory = (category: string) => {
    setConfig({...config, "category": category})
  }


  return (
    <div className="flex overflow-x-scroll my-2">

      <div className={cn("category-chip", !config.category && "active")} onClick={() => setCategory("")}>All</div>

      {data.map(category => (
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
