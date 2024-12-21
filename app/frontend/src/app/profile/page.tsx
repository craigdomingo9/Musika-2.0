import AccountSection from "@/components/marketplace/Profile/AccountSection"
import HelpSection from "@/components/marketplace/Profile/HelpSection"
import PageContainer from "@/components/marketplace/PageContainer"
import OrdersSection from "@/components/marketplace/Profile/OrdersSection"

function Page() {
  return (
    <PageContainer className="m-4">
        <AccountSection />
        <OrdersSection />
        <HelpSection />
    </PageContainer>
  )
}

export default Page
