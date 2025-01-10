import useFetchRelationships from "@/services/api/dashboard/hooks/agent/portfolio/useFetchRelationships"
import SectionHeader from "../../SectionHeader"
import GetMoreButton from "../Buttons/GetMoreButton"
import Loading from "@/app/dashboard/loading";
import Relationship from "./Relationship";
import createEntityStore from "@/store/dashboard/EntityStore";
import { createEntityAction } from "@/types/dashboard/factory";
import BusinessOffers from "./BusinessOffers";



export const useRelationshipAction = createEntityStore(false);
export const useBusinessMutation = createEntityStore(createEntityAction<Business>(""));


function Relationships() {
  const { entities: action } = useRelationshipAction();
  const { data: relationships, isLoading, error } = useFetchRelationships(action);

  // console.log(relationships)

  return (
    <div>
      <SectionHeader 
        HeaderTitle="Relationships"
        SubText="Manage your relationships"
        Action={<GetMoreButton />}
      />

      <div>
        <BusinessOffers />
      </div>

      <div className="my-8">
        {isLoading ? (
          <Loading />
        ): (
          <div className="grid sm:grid-cols-2">
            {relationships.length > 0 && (
              relationships.map((relationship, index) => (
                <Relationship 
                  key={relationship.id} 
                  relationship={relationship} 
                  defaultOpen={index == 0}
                />
              ))
            )}
            {!relationships.length && !isLoading && (
              <p className="mx-5 sub-text-opacity text-sm text-center col-span-2">You have <strong>0</strong> relationships. Apply to businesses to form relationships.</p>
            )}
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Relationships