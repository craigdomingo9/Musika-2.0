"use client";

import RecruitedAgent from "./RecruitedAgent";
import ScoutAgentsButton from "../Buttons/ScoutAgentsButton";
import SectionHeader from "../../SectionHeader";
import useFetchRelationships from "@/services/api/dashboard/hooks/business/agents/useFetchRelationships";
import PendingOffers from "./PendingOffers";
import createEntityStore from "@/store/dashboard/EntityStore";
import Loading from "@/app/dashboard/loading";


export const useRelationshipAction = createEntityStore(false);

function RecruitedAgents() {
  const { entities: action} = useRelationshipAction();
  const { data: relationships, isLoading, error } = useFetchRelationships(action);

  return (
    <div className="page-width">
      <SectionHeader 
        HeaderTitle="Recruited Agents"
        SubText="Manage your relationships"
        Action={<ScoutAgentsButton />}
      />
      <div>
        <PendingOffers />
      </div>

      <div className="mt-8 min-w-[350px] sm:w-[600px] md:w-[700px]">
        {isLoading ? (
          <Loading /> // Display loading indicator
        ) : (
          <div className="mt-8 grid sm:grid-cols-2">
            {relationships.length > 0 && (
              relationships.map((relationship, index) => (
                <RecruitedAgent 
                  key={relationship.id} 
                  relationship={relationship} 
                  defaultOpen={index == 0}
                />
              ))
            )}
            {!relationships.length && !isLoading && (
              <p className="mx-5 sub-text-opacity text-sm text-center col-span-2">You have <strong>0</strong> relationships. Scout for agents to form relationships.</p>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default RecruitedAgents