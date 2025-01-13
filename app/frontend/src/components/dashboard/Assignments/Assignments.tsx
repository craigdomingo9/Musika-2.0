"use client";
import SectionHeader from "../SectionHeader"
import AgentAssignments from "./AgentAssignments";
import useFetchRelationships from "@/services/api/dashboard/hooks/business/agents/useFetchRelationships";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import AddAssignmentButton from "./Buttons/AddAssignmentButton";
import Loading from "@/app/dashboard/loading";
 

function Assignments() {
  const { data: relationships, isLoading } = useFetchRelationships();

  return (
    <div className="page-width">
      <SectionHeader 
        HeaderTitle="Assignments"
        SubText="Manage your assignments to agents."
      />

      {isLoading ? (
        <Loading />
      ) : (
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {relationships.map((relationship, index) => (
            <AccordionItem key={relationship.id} value={`item-${index}`}>
              <AccordionTrigger className="shadow px-2 flex justify-between rounded-md my-1"
                actionElements={
                  [<AddAssignmentButton agent={relationship.agent} />]
                }
                >
                <div className="flex justify-start items-center space-x-2">
                  <Avatar>
                    <AvatarImage 
                      src={relationship.agent.profile.profile_picture} 
                      alt="relationship" 
                    />
                    <AvatarFallback>
                      {relationship.agent.full_name.split(" ").map(str => str.charAt(0))}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    {relationship.agent.full_name}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AgentAssignments 
                  agentCode={relationship.agent.code} 
                />
              </AccordionContent>
            </AccordionItem>
          ))}
          
        </Accordion>
      )}


    </div>
  )
}

export default Assignments