import SectionHeader from "@/components/dashboard/SectionHeader"
import CheckoutBody from "@/components/marketplace/Checkout/CheckoutBody";
import PageContainer from "@/components/marketplace/PageContainer"


function Page() {
  return (
    <PageContainer>
      <SectionHeader
        className="pl-2"
        HeaderTitle="Checkout"
      />
      <CheckoutBody />
    </PageContainer>
  )
}

export default Page