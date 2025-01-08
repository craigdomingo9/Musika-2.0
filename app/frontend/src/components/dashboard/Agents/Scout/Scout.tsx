import useFetchScoutAgents from "@/services/api/dashboard/hooks/business/agents/useFetchScoutAgents"
import ScoutAgent from "./ScoutAgent";
import SectionHeader from "../SectionHeader";
import Loading from "@/app/dashboard/loading";

function Scout() {

  const { data: agents, isLoading } = useFetchScoutAgents();

  return (
    <div>
      <SectionHeader 
        HeaderTitle="Scout"
        SubText="Recruit agents to sell on your behalf."
      />
      <div>
      {isLoading ? (
        <Loading /> // Display loading indicator
      ) : (
        <>
          {agents.length > 0 && (
            agents.map((agent) => (
              <ScoutAgent key={agent.id} agent={agent} />
            ))
          )}
          {!agents.length && !isLoading && <p className="sub-text-opacity text-sm">No agents available.</p>}
        </>
      )}

      </div>
    </div>
  )
}

export default Scout