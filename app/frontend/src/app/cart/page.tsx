import CartProducts from '@/components/marketplace/Cart/CartProducts'
import PageTitleSection from '@/components/marketplace/Cart/PageTitleSection'
import PageContainer from '@/components/marketplace/PageContainer'

function Page() {
  return (
    <PageContainer>
      <PageTitleSection />
      <CartProducts />
    </PageContainer>
  )
}

export default Page