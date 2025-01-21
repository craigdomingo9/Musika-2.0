import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import FulfillButton from "./Buttons/FulfillButton"
import { cn } from "@/lib/utils"


type Props = {
  order: Order,
  open?: boolean,
  status: string,
  collapse?: boolean
}

function Order({order, open, collapse, status}: Props) {
  return (
    <Collapsible
      defaultOpen={open}
      key={order.id}
    >
      <CollapsibleTrigger asChild>
        <div className="h-14 flex justify-between items-center text-sm shadow px-2 mt-1 rounded-lg hover:scale-[1.01] duration-300 cursor-pointer">
          <p className="text-opacity">
            {order.customer.full_name || "New customer"} ordered {order.quantity} {order.product.product?.name}
            &nbsp;{order?.agent?.code && `through ${order.agent.full_name}`}
          </p>
          <p className={cn("text-xs text-opacity", status == "Pending" && "text-orange-300", status == "Completed" && "text-green-500")}>{status}</p>
        </div>
      </CollapsibleTrigger>
      
      {collapse && (
        <CollapsibleContent className="flex justify-end mt-0">
          <FulfillButton
            order={order} 
          />
        </CollapsibleContent>
      )}
      <hr className="my-2" />
    </Collapsible>
  )
}

export default Order