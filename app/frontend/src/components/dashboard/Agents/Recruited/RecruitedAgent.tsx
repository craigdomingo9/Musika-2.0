import Image from "next/image"
import AgentCard from "../AgentCard"
import { Button } from "@/components/ui/button"
import TerminateButton from "../Buttons/TerminateButton"
import { roundNumber } from "@/lib/utils"



type Props = {
  relationship: Relationship,
}


function LeftHalfContent(agent: Agent) {
  return (
    <div className="grid">
      <p className="font-semibold text-opacity place-self-start pb-1">{agent.first_name} {agent.last_name}</p>
      <p className="sub-text">{agent.profile.bio}</p>
    </div>
  )
}

function RightHalfContent(agent: Relationship) {
  const commission = roundNumber(parseFloat(agent.commission_rate)*100, 2)
  return (
    <div>
      <p className="text-[--baseColor] mt-1">{`${commission}`}%</p>
    </div>
  )
}

export function FooterContent(relationship: Relationship){
  return (
    <>
      <Button variant={"link"} className="underline underline-offset-2 text-[--baseColor]">Discuss</Button>
      <TerminateButton relationship={relationship} />
    </>
  )
}


function RecruitedAgent({relationship}: Props) {
  return (
    <AgentCard 
      agent={relationship.agent} 
      LeftHalf={LeftHalfContent(relationship.agent)} 
      RightHalf={RightHalfContent(relationship)} 
      Footer={FooterContent(relationship)}
    />
  )
}

export default RecruitedAgent 