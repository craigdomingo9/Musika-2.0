import ProductSection from '@/components/marketplace/Business/ProductSection'
import Profile from '@/components/marketplace/Business/Profile'
import PageContainer from '@/components/marketplace/PageContainer'



async function Page() {
  
  return (
    <PageContainer>
      <Profile />
      <ProductSection />
    </PageContainer>
  )
}

export default Page