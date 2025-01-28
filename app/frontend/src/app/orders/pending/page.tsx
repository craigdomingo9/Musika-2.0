import PageContainer from "@/components/marketplace/PageContainer"
import CustomerPendingOffers from "@/components/marketplace/Profile/Orders/CustomerPendingOffers"

function page() {
  return (
    <PageContainer className="mx-2">
      <CustomerPendingOffers />
    </PageContainer>
  )
}

export default page
