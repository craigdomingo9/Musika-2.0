"use client";
import SectionHeader from '@/components/dashboard/SectionHeader'
import CheckoutButton from '@/components/marketplace/Cart/Buttons/CheckoutButton'
import CartProducts from '@/components/marketplace/Cart/CartProducts'
import PageContainer from '@/components/marketplace/PageContainer'
import { cartPageTitle } from '@/lib/constants'

function Page() {
  return (
    <PageContainer>
      <SectionHeader 
        HeaderTitle={cartPageTitle}
        Action={<CheckoutButton />}
        className='pl-2'
      />
      <CartProducts />
    </PageContainer>
  )
}

export default Page