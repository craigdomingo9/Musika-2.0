"use client";
import Filters from '@/components/marketplace/Explore/Filters'
import ProductsList from '@/components/marketplace/Explore/ProductsList'


function page() {

  return (
    <div className="flex place-content-center sm:mt-2">
      <div className="section-width">
        <Filters />
        <ProductsList />
      </div>
    </div>
  )
}

export default page