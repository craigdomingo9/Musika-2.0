import CartProducts from '@/components/marketplace/Cart/CartProducts'
import PageTitleSection from '@/components/marketplace/Cart/PageTitleSection'

function Page() {
  return (
    <div className='flex place-content-center sm:mt-2'>
      <div className="section-width">
        <PageTitleSection />
        <CartProducts />
      </div>
    </div>
  )
}

export default Page