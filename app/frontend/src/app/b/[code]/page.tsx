import ProductSection from '@/components/marketplace/Business/ProductSection'
import Profile from '@/components/marketplace/Business/Profile'



async function Page() {
  
  return (
    <div className='flex place-content-center m-2'>
      <div className="section-width">
        <Profile />
        <ProductSection />
      </div>
    </div>
  )
}

export default Page