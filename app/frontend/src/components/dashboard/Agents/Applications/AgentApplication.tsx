import { Button } from "@/components/ui/button"
import AgentCard from "../AgentCard"
import { roundNumber } from "@/lib/utils"
import RejectApplicationButton from "../Buttons/RejectApplicationButton"
import AcceptApplicationButton from "../Buttons/AcceptApplicationButton"


type Props = {
  application: AgentApplication
}

export function LeftHalfContent(agent: Agent) {
  return (
    <div className="grid">
      <p className="font-semibold text-opacity place-self-start pb-1">{agent.first_name} {agent.last_name}</p>
      <p className="sub-text">{agent.profile.bio}</p>
    </div>
  )
}


export function RightHalfContent(agent: AgentApplication) {
  const commission = roundNumber(parseFloat(agent.commission_rate)*100, 2)
  return (
    <div>
      <p className="text-[--baseColor] mt-1">{`${commission}`}%</p>
    </div>
  )
}

export function FooterContent(application: AgentApplication) {
  return (
    <>
      <div></div>
      <div>
        <RejectApplicationButton application={application} />
        <AcceptApplicationButton application={application} />
      </div>
    </>
  )
}


function AgentApplication({application}: Props) {
  // console.log(application)
  return (
    <AgentCard 
      agent={application.agent} 
      LeftHalf={LeftHalfContent(application.agent)} 
      RightHalf={RightHalfContent(application)} 
      Footer={FooterContent(application)}
    />
  )
}

export default AgentApplication