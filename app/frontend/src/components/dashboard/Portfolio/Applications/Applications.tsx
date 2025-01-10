import useFetchBusinesses from "@/services/api/dashboard/hooks/agent/portfolio/useFetchBusinesses";
import SectionHeader from "../../SectionHeader"
import Loading from "@/app/dashboard/loading";
import BusinessItem from "./BusinessItem";
import createEntityStore from "@/store/dashboard/EntityStore";
import PendingApplications from "./PendingApplications";



export const useApplicationAction = createEntityStore(false);


function Applications() {
  const { entities: action } = useApplicationAction();
  const { data: businesses, isLoading, error } = useFetchBusinesses(action);
  // console.log(businesses)

  return (
    <div>
      <SectionHeader 
        HeaderTitle="Applications"
        SubText="Make applications to form relationships."
      />

      <div>
        <PendingApplications />
      </div>

      <div className='mt-8 min-w-[350px] sm:w-[600px] md:w-[700px]'>
        {isLoading ? (
          <Loading /> // Display loading indicator
        ) : (
          <div className="grid sm:grid-cols-2">
            {businesses.length > 0 && (
              businesses.map((business, index) => (
                <BusinessItem 
                  key={business.id} 
                  business={business} 
                  defaultOpen={index == 0}
                />
              ))
            )}
            {!businesses.length && !isLoading && (
              <div className="h-96 flex items-center justify-center col-span-2">
                <p className="sub-text-opacity text-sm text-center mx-5">
                  No businesses are available
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Applications