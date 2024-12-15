import Section from "./Section"
import SectionLink from "./SectionLink"


export function SectionContent() {
  return (
    <div className="grid">
      <SectionLink title="Profile Settings" href={'/profile/settings'} />
      <SectionLink title="Security" href={'/profile/security'} />
    </div>
  )
}


function AccountSection() {
  return <Section Header="Account" SectionContent={SectionContent()} />
}

export default AccountSection
