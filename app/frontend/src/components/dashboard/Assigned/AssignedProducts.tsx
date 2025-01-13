import useFetchAssignments from "@/services/api/dashboard/hooks/agent/assigned/useFetchAssignments";
import AssignedProduct from "./AssignedProduct";
import Loading from "@/app/dashboard/loading";


type Props = {
  businessCode: string
}


function AssignedProducts({businessCode}: Props) {
  const { data: assignments, isLoading } = useFetchAssignments(businessCode);

  return (
    <div className="shadow grid rounded-md my-1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {assignments.map(assignment => (
            <AssignedProduct
              key={assignment.id} 
              assignment={assignment}
            />
          ))}
          {!assignments.length && (
            <div className="text-xs text-opacity text-center my-2">You have not been assigned yet.</div>
          )}
        </>
      )}
    </div>
  )
}

export default AssignedProducts