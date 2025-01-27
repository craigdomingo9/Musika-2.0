import { cn, trunc } from "@/lib/utils";
import { format } from "date-fns";
import { useNotificationAction, useNotificationDrawerState, useNotificationMutation } from "./Notifications";
import { createEntityAction } from "@/types/dashboard/factory";
import { useIsMobile } from "@/hooks/use-mobile";
import ListItem from "../ListItem";

type Props = {
  notification: Notification,
}


function Notification({notification}: Props) {
  const { entities: open, setEntities: setOpen } = useNotificationDrawerState();
  const { setEntities: setNotificationMutation } = useNotificationMutation();
  const { entities: action, setEntities: setAction } = useNotificationAction();
  const isMobile = useIsMobile();

  const date = new Date(notification.created_at);
  const isRead = notification.is_read;
  const sentAt = format(date, isRead ? "PP" : "p")
  const priority = notification.priority;
  
  return (
    <>
    <ListItem 
      className="h-14 my-2"
      onClick={() => {
        setNotificationMutation(
          createEntityAction("Read Notification", notification)
        )
        setOpen(!open);
        setAction(!action);
      }}
    >
      <div className={cn("h-14 w-3 rounded-l-lg", isRead && "opacity-30", priority == "low" && "bg-yellow-200", priority == "medium" && "bg-[--baseColor]", priority == "high" && "bg-red-500")}></div>
      <div className="mx-1 w-full">
        <p className="text-opacity flex items-center h-8 font-semibold">{notification.topic}</p>
        <p className="text-xs text-opacity-mid">
          {
          isMobile ? 
          trunc(notification.message, 40) : 
          notification.message
          }
        </p>
      </div>
      <div className={cn("w-10 flex items-center px-1", isRead && "w-fit px-0")}>
        <p className="text-sm sub-text">{sentAt}</p>
      </div>
    </ListItem>
    <hr />
    </>
  )
}

export default Notification