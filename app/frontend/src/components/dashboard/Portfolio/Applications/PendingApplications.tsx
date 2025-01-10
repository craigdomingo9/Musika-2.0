import useFetchPendingApplications from "@/services/api/dashboard/hooks/agent/portfolio/useFetchPendingApplications"
import Ribbon from "../../Ribbon";
import DrawerContainer from "../../Agents/Scout/DrawerContainer";
import createEntityStore from "@/store/dashboard/EntityStore";
import PendingApplicationsDrawerContent from "./PendingApplicationsDrawerContent";
import { useApplicationAction } from "./Applications";


export const usePendingApplicationsDrawerState = createEntityStore(false);


function PendingApplications() {
  const { entities: action } = useApplicationAction();
  const { data: pending_applications } = useFetchPendingApplications(action);
  const { entities: open, setEntities: setOpen } = usePendingApplicationsDrawerState();


  return (
    <div>
      {pending_applications.length > 0 && (
        <>
          <Ribbon onClick={() => setOpen(!open)}>
            You have pending {pending_applications.length} application{pending_applications.length > 1 && "s"}.
            <span className="underline underline-offset-2">&nbsp;See More</span>
          </Ribbon>
          <DrawerContainer 
            open={open}
            setOpen={setOpen}
            Content={<PendingApplicationsDrawerContent applications={pending_applications} />}
          />
        </>
      )}
    </div>
  )
}

export default PendingApplications