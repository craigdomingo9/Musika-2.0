import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAgentMutation } from "../Buttons/RecruitButton";
import RecruitForm from "./RecruitForm";





function RecruitDrawerContent() {
  const { entities: {object: agent, state} } = useAgentMutation();


  const agentInitials = 
    (agent?.first_name?.charAt(0) || '') + 
    (agent?.last_name?.charAt(0) || '');

  
  return (
    <div>
      <div className="flex flex-col w-full justify-center items-center my-4">
        <Avatar className="size-24 md:size-48 border">
          {agent?.profile && (
            <AvatarImage 
              src={agent?.profile.profile_picture}
              alt={`Agent: ${agent?.first_name, agent?.last_name}`} 
            />
          )}
          <AvatarFallback>{agentInitials}</AvatarFallback>
        </Avatar>
        <p className="py-2 font-semibold text-opacity">{agent?.first_name+ " " + agent?.last_name}</p>
      </div>
      <div>
        <RecruitForm />
      </div>
    </div>
  )
}

export default RecruitDrawerContent