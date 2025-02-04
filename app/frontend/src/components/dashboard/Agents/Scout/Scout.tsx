import useFetchScoutAgents from "@/services/api/dashboard/hooks/business/agents/useFetchScoutAgents"
import ScoutAgent from "./ScoutAgent";
import Loading from "@/app/dashboard/loading";
import SectionHeader from "../../SectionHeader";

function Scout() {
  const { data: agents, isLoading } = useFetchScoutAgents();

  return (
    <div>
      <SectionHeader 
        HeaderTitle="Scout"
        SubText="Recruit agents to sell on your behalf."
      />

      <div className="min-w-[350px] sm:w-[600px] md:w-[700px]">
        {isLoading ? (
          <Loading /> // Display loading indicator
        ) : (
          <>
            {agents.length > 0 && (
              agents.map((agent) => (
                <ScoutAgent key={agent.id} agent={agent} />
              ))
            )}
            {!agents.length && !isLoading && <p className="sub-text-opacity text-sm text-center mt-48">No agents available.</p>}
          </>
        )}
      </div>
    </div>
  )
}

export default Scout