"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import createEntityStore from "@/store/dashboard/EntityStore"
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedOrders";

const useTabsValue = createEntityStore("pending");


function Orders() {
  const { entities: value, setEntities: setTabValue } = useTabsValue();

  return (
    <div>
      <Tabs value={value} className="mb-8 grid mx-3">
      <TabsList className="tab-list">
        <TabsTrigger className="first" onClick={() => setTabValue("pending")} value="pending">Pending</TabsTrigger>
        <TabsTrigger className="last" onClick={() => setTabValue("completed")} value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <PendingOrders />
      </TabsContent>
      <TabsContent value="completed">
        <CompletedOrders />
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Orders