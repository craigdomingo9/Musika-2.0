import Image from "next/image"
import AgentCard from "../AgentCard"
import { Button } from "@/components/ui/button"
import TerminateButton from "../Buttons/TerminateButton"
import { roundNumber, trunc } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"



type Props = {
  relationship: Relationship,
  defaultOpen?: boolean,
}


function LeftHalfContent(agent: Agent) {
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
      <div className="flex">
        <Link href="/dashboard/assignments">
          <Button variant={"link"} className="underline underline-offset-2 text-[--baseColor]">Assign</Button>
        </Link>
        <Separator orientation="vertical" />
        <Link href="/dashboard/comms/business">
          <Button variant={"link"} className="underline underline-offset-2 text-[--baseColor]">Discuss</Button>
        </Link>
      </div>
      <TerminateButton relationship={relationship} />
    </>
  )
}


function RecruitedAgent({relationship, defaultOpen}: Props) {
  return (
    <AgentCard 
      agent={relationship.agent} 
      LeftHalf={LeftHalfContent(relationship.agent)} 
      RightHalf={RightHalfContent(relationship)} 
      Footer={FooterContent(relationship)}
      defaultOpen={defaultOpen}
    />
  )
}

export default RecruitedAgent 