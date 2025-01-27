import Section from "./Section"
import SectionLink from "./SectionLink"




export function SectionContent() {
  return (
    <div className="grid">
      <SectionLink title="Contact Support" href={'/help/support'} />
      {/* <SectionLink title="Guides" href={'/help/guides'} />
      <SectionLink title="FAQs" href={'/help/faqs'} /> */}
    </div>
  )
}


function HelpSection() {
  return <Section className="mt-6" Header="Help" SectionContent={SectionContent()} />
}

export default HelpSection
