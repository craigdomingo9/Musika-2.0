import { Button } from "@/components/ui/button"
import { useTabsValue } from "../Portfolio";



function GetMoreButton() {

  const { setEntities: setTabValue } = useTabsValue();

  return (
    <Button 
      variant={"default"}
      className="underline underline-offset-2"
      onClick={() => setTabValue("applications")}
      >Get More</Button>
      
  )
}

export default GetMoreButton