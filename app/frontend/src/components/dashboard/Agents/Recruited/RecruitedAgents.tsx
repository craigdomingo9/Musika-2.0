"use client";

import RecruitedAgent from "./RecruitedAgent";
import ScoutAgentsButton from "../Buttons/ScoutAgentsButton";
import SectionHeader from "../SectionHeader";
import useFetchRelationships from "@/services/api/dashboard/hooks/business/agents/useFetchRelationships";
import PendingOffers from "./PendingOffers";
import createEntityStore from "@/store/dashboard/EntityStore";
import Loading from "@/app/dashboard/loading";


export const useRelationshipAction = createEntityStore(false);

function RecruitedAgents() {
  const { entities: action} = useRelationshipAction();
  const { data: relationships, isLoading, error } = useFetchRelationships(action);

  return (
    <div>
      <SectionHeader 
        HeaderTitle="Recruited Agents"
        SubText="Manage your relationships"
        Action={<ScoutAgentsButton />}
      />
      <div>
        <PendingOffers />
      </div>

      <div className="mt-8">
        {isLoading ? (
          <Loading /> // Display loading indicator
        ) : (
          <div className="mt-8">
            {relationships.length > 0 && (
              relationships.map((relationship) => (
                <RecruitedAgent key={relationship.id} relationship={relationship} />
              ))
            )}
            {!relationships.length && !isLoading && (
              <p className="mx-5 sub-text-opacity text-sm text-center">You have <strong>0</strong> relationships. Scout for agents to form relationships.</p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default RecruitedAgents