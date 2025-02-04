import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import FulfillButton from "./Buttons/FulfillButton"
import { cn } from "@/lib/utils"
import ListItem from "../ListItem"
import OrderCustomerInfo from "./OrderCustomerInfo"


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
        <ListItem className="px-2">
          <p className="text-opacity">
            {order.customer.full_name || "New customer"} ordered {order.quantity} {order.product.product?.name}
            &nbsp;{order?.agent?.code && `through ${order.agent.full_name}`}
          </p>
          <p className={cn("text-xs text-opacity", status == "Pending" && "text-orange-300", status == "Completed" && "text-green-500")}>{status}</p>
        </ListItem>
      </CollapsibleTrigger>
      
      {collapse && (
        <CollapsibleContent className="flex justify-end mt-0">
          <FulfillButton
            order={order} 
          />
        </CollapsibleContent>
      )}
      <hr className="my-1" />
    </Collapsible>
  )
}

export default Order