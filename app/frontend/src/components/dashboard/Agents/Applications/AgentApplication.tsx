import { Button } from "@/components/ui/button"
import AgentCard from "../AgentCard"
import { roundNumber, trunc } from "@/lib/utils"
import RejectApplicationButton from "../Buttons/RejectApplicationButton"
import AcceptApplicationButton from "../Buttons/AcceptApplicationButton"
import { useIsMobile } from "@/hooks/use-mobile"


type Props = {
  application: AgentApplication
}

export function LeftHalfContent(agent: Agent) {
  const isMobile = useIsMobile()
  return (
    <div className="grid text-start">
      <p className="font-semibold text-opacity pb-1">{agent.first_name} {agent.last_name}</p>
      <p className="sub-text">
        {isMobile ? trunc(agent.profile.bio, 40) : agent.profile.bio}
      </p>
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
      defaultOpen
    />
  )
}

export default AgentApplication