import useFetchProducts from "@/services/api/dashboard/hooks/business/assignments/useFetchProducts"
import { useAssignmentAction } from "./AgentAssignment";
import ProductToAssign from "./ProductToAssign";
import { useAgentMutation } from "../Agents/Buttons/RecruitButton";
import { useEffect } from "react";
import Loading from "@/app/dashboard/loading";





function AddAssignmentDrawer() {
  const { entities: action } = useAssignmentAction();
  const { entities: {object: agent} } = useAgentMutation();
  
  if (!agent) return <Loading />
  const { data: products, isLoading } = useFetchProducts(agent.code, action);
  

  return (
    <div className="flex flex-col w-full overflow-y-scroll">
      <p className="text-center text-opacity font-semibold text-sm my-4">Assign Products to {agent?.full_name}</p>
      <div className="grid rounded-md my-1 mb-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {agent && products.map(product => (
              <ProductToAssign 
                key={product.id} 
                product={product} 
                agent={agent} 
              />
            ))}
            {!products.length && (
              <div className="text-center text-xs text-opacity my-4">
                No more products to assign.
              </div>
            )}
          </>
        )}
      </div>
      
    </div>
  )
}

export default AddAssignmentDrawer