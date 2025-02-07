import SectionHeader from '../SectionHeader'
import { featuredSectionTitle } from '@/lib/constants'
import FeaturedProductList from './FeaturedProductList'

function Featured() {
  return (
    <div className="flex place-content-center mb-5">
      <div className='section-width'>
        <SectionHeader sectionTitle={featuredSectionTitle} />
        <FeaturedProductList />
      </div>
    </div>
  )
}

export default Featured
