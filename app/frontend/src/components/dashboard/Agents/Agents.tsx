"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import RecruitedAgents from "./Recruited/RecruitedAgents"
import createEntityStore from "@/store/dashboard/EntityStore"
import Applications from "./Applications/Applications";
import Scout from "./Scout/Scout";


export const useTabsValue = createEntityStore("recruited");

function Agents() {

  const { entities: value, setEntities: setTabValue } = useTabsValue();

  return (
    <Tabs value={value} className="mb-8 grid mx-3 min-w-[350px] sm:min-w-[600px] md:min-w-[700px]">
      <TabsList className="tab-list">
        <TabsTrigger className="first" onClick={() => setTabValue("recruited")} value="recruited">Recruited</TabsTrigger>
        <TabsTrigger className="mid" onClick={() => setTabValue("applications")} value="applications">Applications</TabsTrigger>
        <TabsTrigger className="last" onClick={() => setTabValue("scout")} value="scout">Scout</TabsTrigger>
      </TabsList>
      <TabsContent value="recruited">
        <RecruitedAgents />
      </TabsContent>
      <TabsContent value="applications">
        <Applications />
      </TabsContent>
      <TabsContent value="scout">
        <Scout />
      </TabsContent>
    </Tabs>

  )
}

export default Agents