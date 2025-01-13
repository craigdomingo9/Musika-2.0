import useFetchAssignments from "@/services/api/dashboard/hooks/business/assignments/useFetchAssignments"
import AgentAssignment, { useAssignmentAction } from "./AgentAssignment";
import Loading from "@/app/dashboard/loading";




type Props = {
  agentCode: string
}

function AgentAssignments({agentCode}: Props) {
  const { entities: action } = useAssignmentAction();
  const { data: assignments, isLoading } = useFetchAssignments(agentCode, action);

  return (
    <div className="shadow grid rounded-md my-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {assignments.map(assignment => (
            <AgentAssignment
              key={assignment.id} 
              assignment={assignment}
            />
          ))}
          {!assignments.length && (
            <div className="text-xs text-opacity text-center my-2">You have not assigned any products yet.</div>
          )}
        </>
      )}
    </div>
  )
}

export default AgentAssignments