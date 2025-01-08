import { Button } from "@/components/ui/button"
import AgentCard from "../AgentCard"
import { format } from "date-fns"
import { useIsMobile } from "@/hooks/use-mobile"
import RecruitButton from "../Buttons/RecruitButton"
import { roundNumber } from "@/lib/utils"

type Props = {
  agent: Agent,
}

export function LeftHalfContent(agent: Agent) {
  const joinedAt = format(new Date(agent.created_at), "PP")
  return (
    <div className="grid">
      <p className="font-semibold text-opacity place-self-start pb-1">{agent.first_name} {agent.last_name}</p>
      <p className="sub-text">{agent.profile.bio}</p>
      <p className="sub-text py-1">Joined at {joinedAt}</p>
    </div>
  )
}


export function RightHalfContent(agent: Agent) {
  const isMobile = useIsMobile()
  const commission = roundNumber(parseFloat(agent.profile.minimum_commission_rate)*100, 2);
  return (
    <div>
      <p className="text-[--baseColor] mt-1">
        {!isMobile && <span className="text-sm text-black text-opacity">Minimum: </span>}
        {`${commission}`}%
        </p>
    </div>
  )
}

export function FooterContent(agent: Agent) {
  return (
    <>
      <div></div>
      <RecruitButton agent={agent} /> 
    </>
  )
}




function ScoutAgent({agent}: Props) {
  return (
    <AgentCard 
      agent={agent} 
      LeftHalf={LeftHalfContent(agent)} 
      RightHalf={RightHalfContent(agent)} 
      Footer={FooterContent(agent)}
    />
  )
}

export default ScoutAgent