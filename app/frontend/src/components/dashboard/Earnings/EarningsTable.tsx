import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useDashboardConfigStore from "@/store/dashboard/DashboardConfig";
import { agentMode, businessMode } from "@/lib/dashboard/constants";
import { roundNumber } from "@/lib/utils";
import { useEffect } from "react";
import { useOrderStore } from "./Earnings";



function EarningsTable() {
  const { config } = useDashboardConfigStore();
  const { entities: orders } = useOrderStore()
  const isBusinessMode = () => config.mode == businessMode() 
  const isAgentMode = () => config.mode == agentMode() 



  const totalAmount = roundNumber(
    orders.reduce((acc, order) => acc + parseInt(isBusinessMode() ? order.business_earning || "0" : order.agent_earning || "0"), 0)
  ,2)

  useEffect(() => {
    // console.log(orders)
  }, [orders])


  return (
    <Table className="sm:w-[600px] min-w-[325px] border shadow-xl rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              {isAgentMode() && businessMode()}
              {isBusinessMode() && agentMode()}
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Earning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="[&>*]:max-w-24">
              <TableCell className="font-medium text-opacity">
                {isBusinessMode() && `${order.agent?.first_name || 'N/A'} ${order.agent?.last_name[0] || ''}`}
                {isAgentMode() && `${order.business.profile.name || 'N/A'}`}
              </TableCell>
              <TableCell className="text-opacity">{order.product.product?.name}</TableCell>
              <TableCell className="text-opacity">${order.product.price}</TableCell>
              <TableCell className="text-right text-[--baseColor] opacity font-semibold">
                +$
                {isAgentMode() && order.agent_earning}
                {isBusinessMode() && order.business_earning}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right text-[--baseColor] font-semibold">+${totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
  )
}

export default EarningsTable