"use client";
import Filters from '@/components/marketplace/Explore/Filters'
import ProductsList from '@/components/marketplace/Explore/ProductsList'
import PageContainer from '@/components/marketplace/PageContainer';


function page() {

  return (
    <PageContainer>
      <Filters />
      <ProductsList />
    </PageContainer>

  )
}

export default page