import { Button } from "@/components/ui/button"
import DrawerContainer from "@/components/universal/Drawer/DrawerContainer"
import createEntityStore from "@/store/dashboard/EntityStore"
import FulfillOrderDrawerContent from "../Drawers/FulfillOrderDrawerContent";
import { useMutationLog } from "@/app/dashboard/stores";
import { createEntityAction } from "@/types/dashboard/factory";


export const useOrderDrawerState = createEntityStore(false);


type Props = {
  order: Order
}

function FulfillButton({order}: Props) {
  const { entities: open, setEntities: setOpen } = useOrderDrawerState();
  const { setEntities: setMutationLog } = useMutationLog();

  return (
    <>
      <Button
        className="px-2 py-1 mr-1 bg-[--baseColor] text-white w-1/2 text-center shadow rounded-t-none"
        onClick={() => {
          setMutationLog(
            createEntityAction("Fulfill Order", order)
          )
          setOpen(!open);
        }}
      >
        Fulfill
      </Button>
      <DrawerContainer
        open={open}
        setOpen={setOpen}
        Content={<FulfillOrderDrawerContent />}
      />
    </>
  )
}

export default FulfillButton