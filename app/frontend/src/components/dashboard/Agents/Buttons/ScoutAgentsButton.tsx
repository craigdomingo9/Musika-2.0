import { Button } from "@/components/ui/button"
import { useTabsValue } from "../Agents";



function ScoutAgentsButton() {

  const { setEntities: setTabValue } = useTabsValue();

  return (
    <Button 
      variant={"default"}
      className="underline underline-offset-2"
      onClick={() => setTabValue("scout")}
      >Go Scout</Button>
      
  )
}

export default ScoutAgentsButton