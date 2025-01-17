import SectionHeader from "../SectionHeader"
import AgentProfileForm from "./AgentProfileForm"


function AgentProfile() {
  return (
    <div>
      <SectionHeader 
        HeaderTitle="Profile"
        SubText="This is your public profile."
      />
      <AgentProfileForm />
    </div>
  )
}

export default AgentProfile