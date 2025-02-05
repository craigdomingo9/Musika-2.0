import AccountSection from "@/components/marketplace/Profile/AccountSection"
import HelpSection from "@/components/marketplace/Profile/HelpSection"
import PageContainer from "@/components/marketplace/PageContainer"
import OrdersSection from "@/components/marketplace/Profile/OrdersSection"
import LoginLinkButton from "@/components/marketplace/Profile/LoginLinkButton"

function Page() {
  return (
    <PageContainer className="m-4">
        <AccountSection />
        <OrdersSection />
        <HelpSection />
        <LoginLinkButton />
    </PageContainer>
  )
}

export default Page
