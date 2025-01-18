import { Button } from '@/components/ui/button'
import DrawerContainer from '../../../universal/Drawer/DrawerContainer'
import createEntityStore from '@/store/dashboard/EntityStore'
import RecruitDrawerContent from '../Scout/RecruitDrawerContent'
import { createEntityAction } from '@/types/dashboard/factory'


type Props = {
  agent: Agent
}

export const useRecruitDrawerState = createEntityStore(false);
export const useAgentMutation = createEntityStore(createEntityAction<Agent>("Recruit"));


function ActionButton({agent}: Props) {
  const { entities: open, setEntities: setOpen } = useRecruitDrawerState();
  const { setEntities: setAgentMutation } = useAgentMutation();
  
  return (
    <Button 
      className="bg-[--baseColor]"
      onClick={() => {
        setOpen(!open);
        setAgentMutation(createEntityAction("Recruit", agent))
      }}
    >Recruit</Button>
  )
}



function RecruitButton({agent}: Props) {
  const { entities: open, setEntities: setOpen } = useRecruitDrawerState();
  
  return (
    <div>
      <ActionButton agent={agent} />
      <DrawerContainer 
        open={open}
        setOpen={setOpen}
        Content={<RecruitDrawerContent />}
      />
    </div>
  )
}

export default RecruitButton