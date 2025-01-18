import { Button } from "@/components/ui/button"
import createEntityStore from "@/store/dashboard/EntityStore";
import { createEntityAction } from "@/types/dashboard/factory";
import DrawerContainer from "../../../universal/Drawer/DrawerContainer";
import ApplyDrawerContent from "../Applications/ApplyDrawerContent";


type Props = {
  business: Business,
}

export const useApplyDrawerState = createEntityStore(false);
export const useApplicationMutation = createEntityStore(createEntityAction<Business>(""));

function ActionButton({business}: Props) {
  const { entities: open, setEntities: setOpen } = useApplyDrawerState();
  const { setEntities: setApplicationMutation } = useApplicationMutation();
  
  return (
    <Button 
      className="bg-[--baseColor]"
      onClick={() => {
        setOpen(!open);
        setApplicationMutation(createEntityAction("Apply", business))
      }}
    >Apply</Button>
  )
}


function ApplyButton({business}: Props) {
  const { entities: open, setEntities: setOpen } = useApplyDrawerState();

  return (
    <>
      <ActionButton business={business} />
      <DrawerContainer 
        open={open}
        setOpen={setOpen}
        Content={<ApplyDrawerContent />}
      />
    </>
  )
}

export default ApplyButton