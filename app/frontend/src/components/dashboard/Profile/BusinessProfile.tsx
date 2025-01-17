import SectionHeader from "../SectionHeader"
import BusinessProfileForm from "./BusinessProfileForm"


function BusinessProfile() {
  return (
    <div>
      <SectionHeader 
        HeaderTitle="Profile"
        SubText="This is your public profile."
      />
      <BusinessProfileForm />
    </div>
  )
}

export default BusinessProfile