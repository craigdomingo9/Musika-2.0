import { saleSectionTitle } from "@/lib/constants"
import SectionHeader from "../SectionHeader"
import SaleProductList from "./SaleProductList"

function Sale() {
  return (
    <div className="flex place-content-center">
      <div className="mt-6 page-width">
        <SectionHeader sectionTitle={saleSectionTitle} showExplore />
        <SaleProductList />
      </div>
    </div>
  )
}

export default Sale
