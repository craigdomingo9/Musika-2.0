import { Button } from "@/components/ui/button";
import DialogContainer from "@/components/universal/Dialog/DialogContainer";
import createEntityStore from "@/store/dashboard/EntityStore";
import CreateConversationDialog from "../Dialogs/CreateConversationDialog";


export const useCreateConversationDialogState = createEntityStore(false);


function CreateConversationButton() {
  const { entities: open, setEntities: setOpen } = useCreateConversationDialogState();

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      <>
        <Button onClick={handleOpenDialog}>
          Create
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Button>
        <DialogContainer
          state={open}
          onChange={handleOpenDialog}
          title='Create new conversation.'
          description='Select the participant of the new conversation.'
        >
          <CreateConversationDialog />
        </DialogContainer>
      </>
    </div>
  )
}

export default CreateConversationButton