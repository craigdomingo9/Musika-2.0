import createEntityStore from "@/store/dashboard/EntityStore";
import DrawerContainer from "../../universal/Drawer/DrawerContainer";
import AssignedProductDrawerContent from "./AssignedProductDrawerContent";
import { createEntityAction } from "@/types/dashboard/factory";


type Props = {
  assignment: Assignment,
}

export const useAssignedProductDrawerState = createEntityStore(false);
export const useAssignedProductMutation = createEntityStore(createEntityAction<Assignment>())



function AssignedProduct({assignment}: Props) {
  const { entities: open, setEntities: setOpen } = useAssignedProductDrawerState();
  const { setEntities: setAssignedProductMutation } = useAssignedProductMutation();
  
  return (
    <>
      <div key={assignment.id} className="mx-4 px-3 flex justify-between items-center border-b cursor-pointer hover:scale-[1.01] duration-300"
        onClick={() => {
          setAssignedProductMutation(
            createEntityAction("", assignment)
          );
          setOpen(!open);
        }}
        >
        <p className="py-3">{assignment.product.name}</p>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path className="text-[--baseColor]" strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </div>
      </div>
      <DrawerContainer 
        open={open}
        setOpen={setOpen}
        Content={<AssignedProductDrawerContent />}
      />
    </>
  )
}

export default AssignedProduct