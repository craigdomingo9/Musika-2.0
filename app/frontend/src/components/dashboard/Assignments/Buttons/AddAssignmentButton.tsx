import createEntityStore from "@/store/dashboard/EntityStore"
import DrawerContainer from "../../Agents/Scout/DrawerContainer"
import AddAssignmentDrawer from "../AddAssignmentDrawer";
import { useAgentMutation } from "../../Agents/Buttons/RecruitButton";
import { createEntityAction } from "@/types/dashboard/factory";


type Props = {
  agent: Agent,
}


export const useCreateAssignmentDrawerState = createEntityStore(false);


function AddAssignmentButton({agent}: Props) {
  const { entities: open, setEntities: setOpen } = useCreateAssignmentDrawerState();
  const { setEntities: setAgentMutation } = useAgentMutation();

  
  return (
    <>
      <div 
        onClick={() => {
          setAgentMutation(
            createEntityAction("", agent)
          );
          setOpen(!open);
        }}
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path className="text-[--baseColor]" strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <DrawerContainer 
        open={open}
        setOpen={setOpen}
        Content={<AddAssignmentDrawer />}
      />
    </>
  )
}

export default AddAssignmentButton