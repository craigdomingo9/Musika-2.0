import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"



type Props = {
  agent: Agent,
  LeftHalf: JSX.Element,
  RightHalf: JSX.Element,
  Footer?: JSX.Element,
  defaultOpen?: boolean
}

function AgentCard({
  agent, 
  LeftHalf, 
  RightHalf, 
  Footer,
  defaultOpen
}: Props) {
  
  return (
    <Collapsible defaultOpen={defaultOpen} className="sm:mx-2 my-1">
      <CollapsibleTrigger className={cn("w-full cursor-pointer hover:scale-[1.01] duration-300 shadow h-24 rounded-tl-lg", !Footer && "rounded-bl-lg")}>
        <div className="flex items-start border-t rounded-l-lg">
          <div>
            <Image
              className={cn("size-24 rounded-tl-lg", !Footer && "rounded-bl-lg")}
              src={agent.profile.profile_picture}
              width={500}
              height={500}
              alt="Agent"
              unoptimized
              priority
            />
          </div>
          <div className="w-full flex items-start justify-between text-opacity mx-2">
            <div className="py-2 h-full">
              {LeftHalf}
            </div>
            {RightHalf}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {Footer && (
          <div className="h-12 flex w-full justify-between shadow-lg p-2 hover:scale-[1.01] duration-300">
            {Footer}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default AgentCard