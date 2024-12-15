import AccountSection from "@/components/marketplace/Profile/AccountSection"
import HelpSection from "@/components/marketplace/Profile/HelpSection"
import PageContainer from "@/components/marketplace/PageContainer"

function Page() {
  return (
    <PageContainer className="m-4">
        <AccountSection />
        <HelpSection />
    </PageContainer>
  )
}

export default Page
