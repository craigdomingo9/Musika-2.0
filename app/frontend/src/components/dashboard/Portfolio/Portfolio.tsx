"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import createEntityStore from "@/store/dashboard/EntityStore";
import Relationships from "./Relationships/Relationships";
import Applications from "./Applications/Applications";


export const useTabsValue = createEntityStore("relationships");


function Portfolio() {
  const { entities: value, setEntities: setTabValue } = useTabsValue();

  return (
    <Tabs value={value} className="mb-8 grid page-width">
      <TabsList className="tab-list">
        <TabsTrigger className="first" onClick={() => setTabValue("relationships")} value="relationships">Relationships</TabsTrigger>
        <TabsTrigger className="last" onClick={() => setTabValue("applications")} value="applications">Applications</TabsTrigger>
      </TabsList>
      <TabsContent value="relationships">
        <Relationships />
      </TabsContent>
      <TabsContent value="applications">
        <Applications />
      </TabsContent>
    </Tabs>

  )
}

export default Portfolio