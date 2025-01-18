import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import createEntityStore from "@/store/dashboard/EntityStore";


export const useNotificationTabsValue = createEntityStore<"unread" | "read">("unread");

function NotificationsToggler() {
  const { entities: value, setEntities: setTabValue } = useNotificationTabsValue();
  
  return (
    <Tabs value={value}>
      <TabsList className="m-auto p-0 [&>*]:h-9 [&>*]:py-0 [&>.first]:rounded-r-none [&>.mid]:rounded-none [&>.last]:rounded-l-none">
        <TabsTrigger 
          className="first" 
          onClick={() => setTabValue("unread")} 
          value="unread"
        >
          Unread
        </TabsTrigger>
        <TabsTrigger 
          className="last" 
          onClick={() => setTabValue("read")} 
          value="read"
        >
          Read
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default NotificationsToggler