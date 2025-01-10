import useFetchApplications from '@/services/api/dashboard/hooks/business/agents/useFetchApplications';
import AgentApplication from './AgentApplication';
import SectionHeader from '../../SectionHeader';
import createEntityStore from '@/store/dashboard/EntityStore';
import Loading from '@/app/dashboard/loading';



export const useApplicationAction = createEntityStore(false);

function Applications() {
  const { entities: action } = useApplicationAction();
  const { data: applications, isLoading, error } = useFetchApplications(action);



  return (
    <div>
      <SectionHeader 
        HeaderTitle="Applications"
        SubText="Recruit agents who requested."
      />

      <div className='mt-8 min-w-[350px] sm:w-[600px] md:w-[700px]'>
        {isLoading ? (
          <Loading /> // Display loading indicator
        ) : (
          <>
            {applications.length > 0 && (
              applications.map((app) => (
                <AgentApplication 
                  key={app.id} 
                  application={app} 
                />
              ))
            )}
            {!applications.length && !isLoading && (
              <div className="h-96 flex items-center justify-center">
                <p className="sub-text-opacity text-sm text-center mx-5">
                  No applications have been submitted yet. Scout to recruit agents.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Applications