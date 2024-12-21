import Section from "./Section"
import SectionLink from "./SectionLink"




export function SectionContent() {
  return (
    <div className="grid">
      <SectionLink title="Pending Orders" href={'/orders/pending'} />
      <SectionLink title="Order History" href={'/orders/history'} />
    </div>
  )
}


function OrdersSection() {
  return <Section className="mt-6" Header="Orders" SectionContent={SectionContent()} />
}

export default OrdersSection
