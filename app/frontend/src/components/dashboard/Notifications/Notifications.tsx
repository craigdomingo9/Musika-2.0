import useFetchNotifications from "@/services/api/marketplace/hooks/notifications/useFetchNotifications"
import SectionHeader from "../SectionHeader";
import Notification from "./Notification";
import Loading from "@/app/dashboard/loading";
import DrawerContainer from "@/components/universal/Drawer/DrawerContainer";
import NotificationDrawerContent from "./NotificationDrawerContent";
import createEntityStore from "@/store/dashboard/EntityStore";
import { createEntityAction } from "@/types/dashboard/factory";
import NotificationsToggler, { useNotificationTabsValue } from "./NotificationsToggler";


export const useNotificationDrawerState = createEntityStore(false);
export const useNotificationMutation = createEntityStore(createEntityAction<Notification>("read"))
export const useNotificationAction = createEntityStore(false);

function Notifications() {
  const { entities: open, setEntities: setOpen } = useNotificationDrawerState();
  const { entities: action } = useNotificationAction();
  const { entities: value } = useNotificationTabsValue();
  const { data: notifications, isLoading } = useFetchNotifications(
    {is_read: value == "read"}, 
    `${value}${action}`
  );


  
  return (
    <div className="page-width">
      <SectionHeader 
        className="items-center h-20"
        HeaderTitle="Notifications"
        Action={<NotificationsToggler />}
      />
      
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {notifications.map(notification => (
            <Notification 
              key={notification.id} 
              notification={notification}
            />
          ))}
            <DrawerContainer 
              Content={<NotificationDrawerContent />}
              open={open}
              setOpen={setOpen}
            />
        </>
      )}
    </div>
  )
}

export default Notifications