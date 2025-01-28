import PageContainer from "@/components/marketplace/PageContainer"
import CustomerOrderHistory from "@/components/marketplace/Profile/Orders/CustomerOrderHistory"

function page() {
  return (
    <PageContainer className="mx-2">
      <CustomerOrderHistory />
    </PageContainer>
  )
}

export default page
